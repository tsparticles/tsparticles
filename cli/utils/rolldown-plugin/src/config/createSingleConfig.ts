import type { ConfigParams, UmdBuildKind, UmdPolicyData } from "../types";
import type { Plugin, RenderedChunk, RolldownOptions } from "rolldown";
import { getExternal, getGlobals } from "./externals";
import fs from "node:fs";
import { getEntry } from "./entry";
import { getUmdGlobalsBootstrap } from "./umdPolicy";
import path from "node:path";
import { replacePlugin } from "rolldown/plugins";

const EMPTY_SIZE = 0,
  FIRST_INDEX = 0,
  EXPECTED_COUNT = 1,
  FIRST_CAPTURE_GROUP = 1,
  toJsBanner = (text: string): string => {
    return `/* ${text} */`;
  },
  temporaryUmdGlobal = "tsparticlesInternalExports",
  lazyWrapperVirtualPrefix = "\0tsparticles-lazy-wrapper:",
  getPublicExports = (exports: string[], kind: UmdBuildKind): string[] => {
    const fixedPublicMap: Record<Exclude<UmdBuildKind, "bundle" | "package">, string> = {
      confetti: "confetti",
      engine: "tsParticles",
      fireworks: "fireworks",
      pjs: "initPjs",
    };

    if (kind === "bundle") {
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
  validatePublicExports = (publicExports: string[], allExports: string[], kind: UmdBuildKind): void => {
    const fixedPublicMap: Record<Exclude<UmdBuildKind, "bundle" | "package">, string> = {
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

    const invalid = publicExports.filter(t => !/^load[A-Z]/.test(t) && t !== "tsParticles");

    if (invalid.length > EMPTY_SIZE) {
      throw new Error(
        `UMD public export policy violated: only load* exports (and tsParticles for bundles) are allowed on window, found ${invalid.join(", ")}`,
      );
    }
  },
  buildGlobalNamespaceInit = (scope: string): string => {
    const segments = scope.split("."),
      inits: string[] = [];
    let currentPath = "global";

    for (const segment of segments) {
      currentPath += `.${segment}`;
      inits.push(`${currentPath} = ${currentPath} || {}`);
    }

    return `(${inits.join(", ")})`;
  },
  redirectUmdExportsToNamespace = (code: string, scope: string): string => {
    const namespaceInit = buildGlobalNamespaceInit(scope);

    return code
      .replaceAll(`factory(global.window = global.${temporaryUmdGlobal} || {}, `, `factory(${namespaceInit}, `)
      .replaceAll(`factory(global.window = {}, `, `factory(${namespaceInit}, `)
      .replaceAll(`factory(global.window = global.${temporaryUmdGlobal} || {})`, `factory(${namespaceInit})`)
      .replaceAll(`factory(global.window = {})`, `factory(${namespaceInit})`);
  },
  buildWindowExposureCode = (scope: string, publicExports: string[]): string => {
    if (publicExports.length === EMPTY_SIZE) {
      return "";
    }

    const assignments = publicExports.map(exp => `${exp}: (globalThis.${scope} || {}).${exp}`).join(", ");

    return `Object.assign(globalThis.window || globalThis, { ${assignments} });\n`;
  },
  buildBundleEngineAliasCode = (umdPolicy: UmdPolicyData): string => {
    if (umdPolicy.kind !== "bundle") {
      return "";
    }

    return (
      `globalThis.__tsParticlesInternals = globalThis.__tsParticlesInternals || {};\n` +
      `if (!globalThis.__tsParticlesInternals.engine || !globalThis.__tsParticlesInternals.engine.tsParticles) {\n` +
      `  globalThis.__tsParticlesInternals.engine = globalThis.${umdPolicy.scope} || {};\n` +
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
    const { dir, umdPolicy } = params,
      { name } = getEntry({ ...params.entry, dir, min, lazy: true }),
      runtimePath = buildLazyRuntimePath(name),
      runtimeInputPath = getLazyRuntimeInputPath(dir),
      lazyExports = resolveLazyEntryExports(runtimeInputPath),
      publicExports = getPublicExports(
        [...new Set(umdPolicy.kind === "bundle" ? [...lazyExports, "tsParticles"] : lazyExports)],
        umdPolicy.kind,
      ),
      needsEngineExports = publicExports.includes("tsParticles") || umdPolicy.kind === "bundle",
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
  exposeEntryExports = (enabled: boolean, umdPolicy?: UmdPolicyData): Plugin => {
    return {
      name: "expose-entry-exports",
      renderChunk(code: string, chunk: RenderedChunk): { code: string; map: null } | null {
        if (!enabled || !chunk.isEntry) {
          return null;
        }

        const exports = chunk.exports.filter(t => t !== "default");

        if (exports.length === EMPTY_SIZE) {
          if (!umdPolicy) {
            return null;
          }

          const umdCode = redirectUmdExportsToNamespace(code, umdPolicy.scope);

          return {
            code: `${getUmdGlobalsBootstrap(temporaryUmdGlobal)}${umdCode}\ndelete (globalThis.window || globalThis).${temporaryUmdGlobal};\n`,
            map: null,
          };
        }

        if (!umdPolicy) {
          const assignments = exports.map(t => `${t}: ${t}`).join(", ");

          return {
            code: `${code}\nObject.assign(globalThis.window || globalThis, { ${assignments} });\n`,
            map: null,
          };
        }

        const publicExports = getPublicExports(exports, umdPolicy.kind);

        validatePublicExports(publicExports, exports, umdPolicy.kind);

        const umdCode = redirectUmdExportsToNamespace(code, umdPolicy.scope),
          windowCode = buildWindowExposureCode(umdPolicy.scope, publicExports),
          engineAliasCode = buildBundleEngineAliasCode(umdPolicy);

        return {
          code:
            `${getUmdGlobalsBootstrap(temporaryUmdGlobal)}${umdCode}\n${windowCode}${engineAliasCode}` +
            `delete (globalThis.window || globalThis).${temporaryUmdGlobal};\n`,
          map: null,
        };
      },
    };
  };

export const createSingleConfig = (params: ConfigParams, min: boolean, lazy: boolean): RolldownOptions => {
  const { additionalExternals, banner, bundle, dir, entry, minBanner, version } = params,
    { name, input } = getEntry({ ...entry, dir, min, lazy }),
    wrapperEntryPlugin = lazy ? createLazyWrapperEntryPlugin(params, min) : undefined;

  if (lazy) {
    return {
      input: `${lazyWrapperVirtualPrefix}${name}`,
      external: getExternal({ bundle, additionalExternals }),
      plugins: [
        wrapperEntryPlugin,
        replacePlugin(
          {
            __VERSION__: JSON.stringify(version),
          },
          { preventAssignment: true },
        ),
        exposeEntryExports(true, params.umdPolicy),
      ],
      output: {
        file: path.resolve(dir, "dist", `${name}.js`),
        format: "umd",
        name: temporaryUmdGlobal,
        globals: getGlobals(additionalExternals, bundle),
        banner: toJsBanner(min ? minBanner : banner),
        codeSplitting: false,
        minify: min,
      },
    };
  }

  return {
    input,
    external: getExternal({ bundle, additionalExternals }),
    plugins: [
      replacePlugin(
        {
          __VERSION__: JSON.stringify(version),
        },
        { preventAssignment: true },
      ),
      exposeEntryExports(true, params.umdPolicy),
    ],
    output: {
      file: path.resolve(dir, "dist", `${name}.js`),
      format: "umd",
      name: temporaryUmdGlobal,
      globals: getGlobals(additionalExternals, bundle),
      banner: toJsBanner(min ? minBanner : banner),
      codeSplitting: false,
      minify: min,
    },
  };
};

export const createLazyRuntimeConfig = (params: ConfigParams, min: boolean): RolldownOptions => {
  const { additionalExternals, banner, bundle, dir, entry, minBanner } = params,
    { name } = getEntry({ ...entry, dir, min, lazy: true });

  return {
    input: getLazyRuntimeInputPath(dir),
    external: getExternal({ bundle, additionalExternals }),
    plugins: [
      replacePlugin(
        {
          __VERSION__: JSON.stringify(params.version),
        },
        { preventAssignment: true },
      ),
    ],
    output: {
      dir: path.resolve(dir, "dist"),
      format: "es",
      entryFileNames: buildLazyRuntimePath(name),
      chunkFileNames: min ? "chunks/[name]-[hash].min.js" : "chunks/[name]-[hash].js",
      banner: toJsBanner(min ? minBanner : banner),
      minify: min,
    },
  };
};
