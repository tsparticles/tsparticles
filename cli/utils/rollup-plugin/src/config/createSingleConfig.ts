import type { ConfigParams, IifeBuildKind, IifePolicyData } from "../types";
import type { GlobalsOption, Plugin, RenderedChunk, RollupOptions } from "rollup";
import { getExternal, getGlobals } from "./externals";
import fs from "node:fs";
import { getEntry } from "./entry";
import { getIifeGlobalsBootstrap } from "./iifePolicy";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import path from "node:path";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";

type ReplaceOptions = NonNullable<Parameters<typeof replace>[number]>;

const EMPTY_SIZE = 0,
  FIRST_INDEX = 0,
  EXPECTED_COUNT = 1,
  FIRST_CAPTURE_GROUP = 1,
  toJsBanner = (text: string): string => {
    return `/* ${text} */`;
  },
  lazyWrapperVirtualPrefix = "\0tsparticles-lazy-wrapper:",
  // Public export predicate per kind
  getPublicExports = (exports: string[], kind: IifeBuildKind): string[] => {
    const fixedPublicMap: Record<Exclude<IifeBuildKind, "bundle" | "package">, string> = {
      confetti: "confetti",
      engine: "tsParticles",
      fireworks: "fireworks",
      pjs: "initPjs",
    };

    if (kind === "bundle") {
      // Bundles expose load* functions AND the tsParticles instance (needed for bundle users)
      return exports.filter(t => /^load[A-Z]/.test(t) || t === "tsParticles");
    }

    if (kind === "package") {
      return exports.filter(t => /^load[A-Z]/.test(t));
    }

    const requiredExport = fixedPublicMap[kind];

    if (!exports.includes(requiredExport)) {
      throw new Error(`UMD public export policy violated: missing ${requiredExport}`);
    }

    return [requiredExport];
  },
  validatePublicExports = (publicExports: string[], allExports: string[], kind: IifeBuildKind): void => {
    const fixedPublicMap: Record<Exclude<IifeBuildKind, "bundle" | "package">, string> = {
      confetti: "confetti",
      engine: "tsParticles",
      fireworks: "fireworks",
      pjs: "initPjs",
    };

    if (kind !== "bundle" && kind !== "package") {
      const required = fixedPublicMap[kind];

      if (!allExports.includes(required)) {
        throw new Error(`UMD public export policy violated: missing ${required}`);
      }

      if (publicExports.length !== EXPECTED_COUNT || publicExports[FIRST_INDEX] !== required) {
        throw new Error(`UMD public export policy violated: ${kind} can expose only ${required}`);
      }

      return;
    }

    // For bundle/package: only load* (and tsParticles for bundle) are allowed on window
    const invalid = publicExports.filter(t => !/^load[A-Z]/.test(t) && t !== "tsParticles");

    if (invalid.length > EMPTY_SIZE) {
      throw new Error(
        `UMD public export policy violated: only load* exports (and tsParticles for bundles) are allowed on window, found ${invalid.join(", ")}`,
      );
    }
  },
  globalScopeExpression = `typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : self`,
  /**
   * Retarget the Rollup IIFE wrapper from the `this` keyword to the global scope.
   *
   * Rollup roots namespaced IIFE output on `this` (e.g. `this.__tsParticlesInternals = ...`) and reads
   * dotted external globals as implicit globals (see `getGlobals`, externals are prefixed with `this.`).
   * Both break when the bundle is loaded through a `<script type="module">` tag, where `this` is
   * `undefined`. To keep the previous UMD-era behaviour (bundles usable from classic and module scripts
   * alike) the chunk is wrapped in a function whose `g` argument resolves to globalThis/window/self and
   * every `this.__tsParticlesInternals` reference (namespace setup, exports target and external deps)
   * is retargeted to `g.__tsParticlesInternals`.
   * @param code - The code
   * @returns The string value
   */
  redirectIifeToGlobalScope = (code: string): string => {
    const body = code.replaceAll("this.__tsParticlesInternals", "g.__tsParticlesInternals");

    return `(function (g) {\n${body}\n})(${globalScopeExpression});\n`;
  },
  /**
   * Build the code that copies public exports from the namespace to window.
   * Reads from globalThis.__tsParticlesInternals.<scope>.<export> after the factory has run.
   * @param scope - The scope
   * @param publicExports - The publicExports
   * @returns The string value
   */
  buildWindowExposureCode = (scope: string, publicExports: string[]): string => {
    if (publicExports.length === EMPTY_SIZE) {
      return "";
    }

    const assignments = publicExports.map(exp => `${exp}: (globalThis.${scope} || {}).${exp}`).join(", ");

    return `Object.assign(globalThis.window || globalThis, { ${assignments} });\n`;
  },
  buildBundleEngineAliasCode = (iifePolicy: IifePolicyData): string => {
    if (iifePolicy.kind !== "bundle") {
      return "";
    }

    // Keep backward compatibility for packages that still resolve engine externals from internals.engine.
    return (
      `globalThis.__tsParticlesInternals = globalThis.__tsParticlesInternals || {};\n` +
      `if (!globalThis.__tsParticlesInternals.engine || !globalThis.__tsParticlesInternals.engine.tsParticles) {\n` +
      `  globalThis.__tsParticlesInternals.engine = globalThis.${iifePolicy.scope} || {};\n` +
      `}\n`
    );
  },
  buildLazyRuntimePath = (name: string): string => {
    return `chunks/${name}.js`;
  },
  getLazyRuntimeInputPath = (dir: string): string => {
    return path.resolve(dir, "dist/browser/index.lazy.js");
  },
  parseNamedExports = (content: string): string[] => {
    const exports = new Set<string>();

    for (const match of content.matchAll(
      /export\s+(?:async\s+)?(?:function|class|const|let|var)\s+([A-Za-z_$][\w$]*)/g,
    )) {
      exports.add(match[FIRST_CAPTURE_GROUP]);
    }

    for (const match of content.matchAll(/export\s*{([^}]+)}(?!\s*from)/g)) {
      const values = match[FIRST_CAPTURE_GROUP].split(",")
        .map(value => value.trim())
        .filter(Boolean)
        .map(value =>
          value
            .split(/\s+as\s+/)
            .pop()
            ?.trim(),
        )
        .filter((value): value is string => Boolean(value));

      for (const value of values) {
        exports.add(value);
      }
    }

    return [...exports];
  },
  resolveLazyEntryExports = (filePath: string, visited = new Set<string>()): string[] => {
    if (visited.has(filePath) || !fs.existsSync(filePath)) {
      return [];
    }

    visited.add(filePath);

    const content = fs.readFileSync(filePath, "utf8"),
      exports = new Set(parseNamedExports(content));

    for (const match of content.matchAll(/export\s+(?:\*|{[^}]+})\s+from\s+["'](.+?)["']/g)) {
      const specifier = match[FIRST_CAPTURE_GROUP];

      if (!specifier.startsWith(".")) {
        continue;
      }

      const resolvedPath = path.resolve(path.dirname(filePath), specifier),
        normalizedPath = path.extname(resolvedPath) ? resolvedPath : `${resolvedPath}.js`;

      for (const value of resolveLazyEntryExports(normalizedPath, visited)) {
        exports.add(value);
      }
    }

    return [...exports];
  },
  createLazyWrapperEntryPlugin = (params: ConfigParams, min: boolean): Plugin => {
    const { dir, iifePolicy } = params,
      { name } = getEntry({ ...params.entry, dir, min, lazy: true }),
      runtimePath = buildLazyRuntimePath(name),
      runtimeInputPath = getLazyRuntimeInputPath(dir),
      lazyExports = resolveLazyEntryExports(runtimeInputPath),
      publicExports = getPublicExports(
        [...new Set(iifePolicy.kind === "bundle" ? [...lazyExports, "tsParticles"] : lazyExports)],
        iifePolicy.kind,
      ),
      needsEngineExports = publicExports.includes("tsParticles") || iifePolicy.kind === "bundle",
      exportedDeclarations = publicExports
        .filter(exp => exp !== "tsParticles")
        .map(
          exp =>
            `const ${exp} = async (...args) => { const module = await getLazyModule(); return module.${exp}(...args); };`,
        )
        .join("\n"),
      tsParticlesExport = publicExports.includes("tsParticles") ? "const tsParticles = engineExports.tsParticles;" : "",
      namedExports = publicExports.join(", "),
      engineBootstrap = needsEngineExports
        ? [
            "globalThis.__tsParticlesInternals = globalThis.__tsParticlesInternals || {};",
            "globalThis.__tsParticlesInternals.engine = globalThis.__tsParticlesInternals.engine || engineExports;",
          ].join("\n")
        : "",
      imports = needsEngineExports ? 'import * as engineExports from "@tsparticles/engine";\n' : "",
      source = `${imports}
const currentScript = typeof document !== "undefined" ? document.currentScript : undefined;
const runtimeUrl = new URL("${runtimePath}", currentScript?.src ?? globalThis.location?.href ?? "/").href;
let lazyModulePromise;
const dynamicImport = new Function("path", "return import(path);");
const getLazyModule = () => {
  lazyModulePromise ??= dynamicImport(runtimeUrl);

  return lazyModulePromise;
};
${engineBootstrap}
${tsParticlesExport}
${exportedDeclarations}
export { ${namedExports} };
`;

    return {
      name: "tsparticles-lazy-wrapper-entry",
      resolveId(id: string): string | null {
        return id === `${lazyWrapperVirtualPrefix}${name}` ? id : null;
      },
      load(id: string): string | null {
        return id === `${lazyWrapperVirtualPrefix}${name}` ? source : null;
      },
    };
  },
  exposeEntryExports = (enabled: boolean, iifePolicy?: IifePolicyData): Plugin => {
    return {
      name: "expose-entry-exports",
      renderChunk(code: string, chunk: RenderedChunk): { code: string; map: null } | null {
        if (!enabled || !chunk.isEntry) {
          return null;
        }

        const exports = chunk.exports.filter(t => t !== "default");

        // No exports at all - keep the (possibly side-effecting) IIFE body but only bootstrap namespaces
        if (exports.length === EMPTY_SIZE) {
          if (!iifePolicy) {
            return null;
          }

          return {
            code: `${getIifeGlobalsBootstrap()}${redirectIifeToGlobalScope(code)}`,
            map: null,
          };
        }

        // No namespace policy (e.g. ESM lazy split bundles) - expose all to window (old behavior)
        if (!iifePolicy) {
          const assignments = exports.map(t => `${t}: ${t}`).join(", ");

          return {
            code: `${code}\nObject.assign(globalThis.window || globalThis, { ${assignments} });\n`,
            map: null,
          };
        }

        // With namespace policy (IIFE):
        // 1) Rollup writes the exports directly into __tsParticlesInternals.<scope> thanks to
        //    output.name (the scope) + output.extend.
        // 2) The wrapper root is retargeted from `this` to globalThis so the bundle keeps working
        //    from classic and module `<script>` tags alike.
        // 3) After the IIFE runs, copy the public exports from the namespace to window.
        const publicExports = getPublicExports(exports, iifePolicy.kind);

        validatePublicExports(publicExports, exports, iifePolicy.kind);

        const windowCode = buildWindowExposureCode(iifePolicy.scope, publicExports),
          engineAliasCode = buildBundleEngineAliasCode(iifePolicy);

        return {
          code: `${getIifeGlobalsBootstrap()}${redirectIifeToGlobalScope(code)}\n${windowCode}${engineAliasCode}`,
          map: null,
        };
      },
    };
  },
  /**
   * Builds the replacement map for the `replace` rollup plugin.
   *
   * In min builds the dev-only error catalog is a dead branch after `process.env.NODE_ENV` and the
   * `typeof process` guard are folded to constants, so Terser strips it along with the readable
   * messages (see `ErrorUtils`). The guard is folded too so bundler-less browsers never throw on the
   * missing `process` global in non-min outputs.
   * @param min - whether this is a minified/production build
   * @param version - the package version
   * @returns the replacement map
   */
  getReplacements = (min: boolean, version: string): ReplaceOptions => ({
    preventAssignment: true,
    __VERSION__: JSON.stringify(version),
    ...(min
      ? {
          "process.env.NODE_ENV": JSON.stringify("production"),
          'typeof process !== "undefined"': JSON.stringify(true),
        }
      : {}),
  });

export const createSingleConfig = (params: ConfigParams, min: boolean, lazy: boolean): RollupOptions => {
  const { additionalExternals, banner, bundle, dir, entry, minBanner, version } = params,
    { name, input } = getEntry({ ...entry, dir, min, lazy }),
    wrapperEntryPlugin = lazy ? createLazyWrapperEntryPlugin(params, min) : undefined;

  if (lazy) {
    return {
      input: `${lazyWrapperVirtualPrefix}${name}`,
      external: getExternal({ bundle, additionalExternals }),
      plugins: [
        wrapperEntryPlugin,
        nodeResolve({
          browser: true,
        }),
        replace(getReplacements(min, version)),
        exposeEntryExports(true, params.iifePolicy),
        min && terser(),
      ].filter(Boolean),
      output: {
        file: path.resolve(dir, "dist", `${name}.js`),
        format: "iife",
        name: params.iifePolicy.scope,
        extend: true,
        globals: getGlobals(additionalExternals, bundle) as GlobalsOption,
        banner: toJsBanner(min ? minBanner : banner),
        // inlineDynamicImports must be true for IIFE (Rollup doesn't support code-splitting in IIFE format).
        // The actual lazy loading is handled at runtime via `new Function("path", "return import(path)")`
        // which Rollup cannot see/inline — so setting this to true has no effect on lazy behaviour.
        inlineDynamicImports: true,
      },
    };
  }

  return {
    input,
    external: getExternal({ bundle, additionalExternals }),
    plugins: [
      nodeResolve({
        browser: true,
      }),
      replace(getReplacements(min, version)),
      exposeEntryExports(true, params.iifePolicy),
      !min &&
        visualizer({
          filename: path.resolve(dir, "dist/report.html"),
        }),
      min && terser(),
    ].filter(Boolean),
    output: {
      file: path.resolve(dir, "dist", `${name}.js`),
      format: "iife",
      name: params.iifePolicy.scope,
      extend: true,
      globals: getGlobals(additionalExternals, bundle) as GlobalsOption,
      banner: toJsBanner(min ? minBanner : banner),
      inlineDynamicImports: true,
    },
  };
};

export const createLazyRuntimeConfig = (params: ConfigParams, min: boolean): RollupOptions => {
  const { additionalExternals, banner, bundle, dir, entry, minBanner, version } = params,
    { name } = getEntry({ ...entry, dir, min, lazy: true });

  return {
    input: getLazyRuntimeInputPath(dir),
    external: getExternal({ bundle, additionalExternals }),
    plugins: [
      nodeResolve({
        browser: true,
      }),
      replace(getReplacements(min, version)),
      min && terser(),
    ].filter(Boolean),
    output: {
      dir: path.resolve(dir, "dist"),
      format: "es",
      entryFileNames: buildLazyRuntimePath(name),
      chunkFileNames: min ? "chunks/[name]-[hash].min.js" : "chunks/[name]-[hash].js",
      banner: toJsBanner(min ? minBanner : banner),
    },
  };
};
