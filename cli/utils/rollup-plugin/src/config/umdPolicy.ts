import type { UmdBuildKind, UmdPolicyData } from "../types";
import type { ParticlesBuildType } from "../buildMap";

const FIRST_INDEX = 0,
  INDEX_AFTER_FIRST = 1,
  internalRoot = "__tsParticlesInternals",
  toScopeSegment = (value: string): string => {
    const normalized = value
      .replaceAll(/([a-z\d])([A-Z])/g, "$1-$2")
      .replaceAll(/[._\s]+/g, "-")
      .toLowerCase();

    return normalized
      .split("-")
      .filter(Boolean)
      .map((segment, index) =>
        index === FIRST_INDEX ? segment : `${segment[FIRST_INDEX].toUpperCase()}${segment.slice(INDEX_AFTER_FIRST)}`,
      )
      .join("");
  },
  resolveBundleScope = (moduleName?: string): string => {
    if (!moduleName) {
      return "full";
    }

    return toScopeSegment(moduleName);
  },
  resolveKind = (scope: string): UmdBuildKind => {
    if (scope === "pjs") {
      return "pjs";
    }

    if (scope === "confetti") {
      return "confetti";
    }

    if (scope === "fireworks") {
      return "fireworks";
    }

    return "bundle";
  },
  buildTypePrefix: Record<Exclude<ParticlesBuildType, "bundle" | "engine" | "util">, string> = {
    effect: "effects",
    interaction: "interactions",
    interactionExternal: "interactions",
    interactionParticles: "interactions",
    palette: "palettes",
    path: "paths",
    plugin: "plugins",
    pluginEasing: "plugins",
    pluginEmittersShape: "plugins.emittersShapes",
    pluginExport: "plugins",
    preset: "presets",
    shape: "shapes",
    template: "utils",
    updater: "updaters",
  },
  /**
   * Qualifies a raw module-name leaf with a type-specific prefix so that
   * `getUmdPolicyData` produces the same namespace as `getUmdGlobalForExternal`.
   * Without this, `interactionExternal "parallax"` would land on
   * `interactions.parallax` while the non-bundled consumer expects
   * `interactions.externalParallax`, causing a UMD global mismatch.
   */
  leafPrefixes: Partial<Record<ParticlesBuildType, string>> = {
    interactionExternal: "external-",
    interactionParticles: "particles-",
    pluginEasing: "easing-",
  },
  qualifyLeaf = (type: ParticlesBuildType, rawLeaf: string): string => {
    const prefix = leafPrefixes[type];

    return prefix ? `${prefix}${rawLeaf}` : rawLeaf;
  };

export const getUmdPolicyData = (type: ParticlesBuildType, moduleName?: string): UmdPolicyData => {
  if (type === "engine") {
    return {
      kind: "engine",
      scope: `${internalRoot}.engine`,
    };
  }

  if (type === "bundle") {
    const scope = resolveBundleScope(moduleName);

    return {
      kind: resolveKind(scope),
      scope: `${internalRoot}.bundles.${scope}`,
    };
  }

  if (type === "util") {
    // Util packages use the moduleName as-is (dots as separators), e.g. "canvas.utils" -> "__tsParticlesInternals.canvas.utils"
    // This must match the getUmdGlobalForExternal fallback for deps that reference these packages.
    return {
      kind: "package",
      scope: `${internalRoot}.${moduleName ?? "util"}`,
    };
  }

  const prefix = buildTypePrefix[type],
    rawLeaf = moduleName ?? "default",
    leaf = toScopeSegment(qualifyLeaf(type, rawLeaf));

  return {
    kind: "package",
    scope: `${internalRoot}.${prefix}.${leaf}`,
  };
};

const buildScopedPath = (prefix: string, rawLeaf: string): string => {
    const leaf = toScopeSegment(rawLeaf);

    return `${internalRoot}.${prefix}.${leaf}`;
  },
  bundleLeafGlobals = new Map(
    ["all", "basic", "confetti", "fireworks", "pjs", "slim"].map(leaf => [leaf, `${internalRoot}.bundles.${leaf}`]),
  ),
  scopedPrefixRules: {
    prefix: string;
    scope: string;
    transform?: (segment: string) => string;
  }[] = [
    {
      // @tsparticles/plugin-export-image -> __tsParticlesInternals.plugins.image
      prefix: "plugin-export-",
      scope: "plugins",
    },
    {
      prefix: "plugin-emitters-shape-",
      scope: "plugins.emittersShapes",
    },
    {
      prefix: "plugin-",
      scope: "plugins",
    },
    {
      prefix: "interaction-external-",
      scope: "interactions",
      transform: segment => `external-${segment}`,
    },
    {
      prefix: "interaction-particles-",
      scope: "interactions",
      transform: segment => `particles-${segment}`,
    },
    {
      prefix: "interaction-",
      scope: "interactions",
    },
    {
      prefix: "effect-",
      scope: "effects",
    },
    {
      prefix: "path-",
      scope: "paths",
    },
    {
      prefix: "shape-",
      scope: "shapes",
    },
    {
      prefix: "updater-",
      scope: "updaters",
    },
    {
      prefix: "palette-",
      scope: "palettes",
    },
    {
      prefix: "preset-",
      scope: "presets",
    },
  ],
  getScopedGlobalFromPrefix = (leaf: string): string | undefined => {
    for (const rule of scopedPrefixRules) {
      if (!leaf.startsWith(rule.prefix)) {
        continue;
      }

      const segment = leaf.slice(rule.prefix.length);

      return buildScopedPath(rule.scope, rule.transform ? rule.transform(segment) : segment);
    }

    return undefined;
  },
  getScopedGlobalForLeaf = (leaf: string): string => {
    const directLeafMap = new Map([
        ["engine", `${internalRoot}.engine`],
        // Util packages: not "path plugins" but helper utilities; map to their actual scope
        ["path-utils", `${internalRoot}.path.utils`],
        ["animation-utils", `${internalRoot}.animation.utils`],
        ["canvas-utils", `${internalRoot}.canvas.utils`],
        // Historical package name mismatch: @tsparticles/path-zig-zag exposes paths.zigzag.
        ["path-zig-zag", `${internalRoot}.paths.zigzag`],
        // Historical package name mismatch: @tsparticles/plugin-poisson-disc exposes plugins.poisson.
        ["plugin-poisson-disc", `${internalRoot}.plugins.poisson`],
        ...bundleLeafGlobals,
      ]),
      bundleLeaf = directLeafMap.get(leaf);

    if (bundleLeaf) {
      return bundleLeaf;
    }

    const scopedLeaf = getScopedGlobalFromPrefix(leaf);

    if (scopedLeaf) {
      return scopedLeaf;
    }

    return `${internalRoot}.${leaf.split("-").map(toScopeSegment).join(".")}`;
  };

export const getUmdGlobalForExternal = (id: string): string | undefined => {
  if (id === "tsparticles") {
    return `${internalRoot}.bundles.full`;
  }

  if (id.startsWith("tsparticles-")) {
    return buildScopedPath("bundles", id.slice("tsparticles-".length));
  }

  if (!id.startsWith("@tsparticles/")) {
    return undefined;
  }

  return getScopedGlobalForLeaf(id.slice("@tsparticles/".length));
};

export const getUmdGlobalsBootstrap = (temporaryGlobalName?: string): string => {
  const temporaryBootstrap = temporaryGlobalName ? `g.${temporaryGlobalName}=g.${temporaryGlobalName}||{};` : "",
    // Pre-create namespaces (including nested ones) to avoid eager UMD external lookups
    // crashing on missing branches like plugins.emittersShapes.circle.
    namespaces = [
      "bundles",
      "effects",
      "engine",
      "interactions",
      "palettes",
      "paths",
      "plugins",
      "plugins.emittersShapes",
      "presets",
      "shapes",
      "updaters",
      "utils",
      "canvas",
      "canvas.utils",
      "path",
      "path.utils",
    ],
    namespacesBootstrap = namespaces
      .map(namespace => {
        const segments = namespace.split(".");
        let currentPath = "g.__tsParticlesInternals";

        return segments
          .map(segment => {
            currentPath += `.${segment}`;

            return `${currentPath}=${currentPath}||{};`;
          })
          .join("");
      })
      .join("");

  return (
    `(function(g){g.__tsParticlesInternals=g.__tsParticlesInternals||{};${namespacesBootstrap}` +
    `var __tsProxyFactory=typeof Proxy!=="undefined"?function(obj){return new Proxy(obj,{get:function(target,key){if(!(key in target)){target[key]={};}return target[key];}});}:function(obj){return obj;};` +
    `g.__tsParticlesInternals.bundles=__tsProxyFactory(g.__tsParticlesInternals.bundles);` +
    `g.__tsParticlesInternals.effects=__tsProxyFactory(g.__tsParticlesInternals.effects);` +
    `g.__tsParticlesInternals.interactions=__tsProxyFactory(g.__tsParticlesInternals.interactions);` +
    `g.__tsParticlesInternals.palettes=__tsProxyFactory(g.__tsParticlesInternals.palettes);` +
    `g.__tsParticlesInternals.paths=__tsProxyFactory(g.__tsParticlesInternals.paths);` +
    `g.__tsParticlesInternals.plugins=__tsProxyFactory(g.__tsParticlesInternals.plugins);` +
    `g.__tsParticlesInternals.plugins.emittersShapes=__tsProxyFactory(g.__tsParticlesInternals.plugins.emittersShapes);` +
    `g.__tsParticlesInternals.presets=__tsProxyFactory(g.__tsParticlesInternals.presets);` +
    `g.__tsParticlesInternals.shapes=__tsProxyFactory(g.__tsParticlesInternals.shapes);` +
    `g.__tsParticlesInternals.updaters=__tsProxyFactory(g.__tsParticlesInternals.updaters);` +
    `g.__tsParticlesInternals.utils=__tsProxyFactory(g.__tsParticlesInternals.utils);` +
    `g.__tsParticlesInternals.canvas=__tsProxyFactory(g.__tsParticlesInternals.canvas);` +
    `g.__tsParticlesInternals.path=__tsProxyFactory(g.__tsParticlesInternals.path);` +
    `${temporaryBootstrap}})(typeof globalThis!=="undefined"?globalThis:typeof window!=="undefined"?window:this);\n`
  );
};
