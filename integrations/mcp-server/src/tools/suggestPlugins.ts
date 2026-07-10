import type { SuggestPluginsResult, PackageImport } from "../types.js";
import { packageCatalog } from "../registry/packages.js";
import { optionToPlugin } from "../registry/pluginOptions.js";
import { bundles } from "../registry/bundles.js";
import { getOptionValue, isOptionEnabled, asArray } from "../utils/optionPath.js";

const EMITTER_SHAPE_PACKAGES: Record<string, string> = {
  circle: "@tsparticles/plugin-emitters-shape-circle",
  square: "@tsparticles/plugin-emitters-shape-square",
  canvas: "@tsparticles/plugin-emitters-shape-canvas",
  path: "@tsparticles/plugin-emitters-shape-path",
  polygon: "@tsparticles/plugin-emitters-shape-polygon",
};

const INTERACTION_MODE_PACKAGES: Record<string, string> = {
  attract: "@tsparticles/interaction-external-attract",
  bounce: "@tsparticles/interaction-external-bounce",
  bubble: "@tsparticles/interaction-external-bubble",
  cannon: "@tsparticles/interaction-external-cannon",
  connect: "@tsparticles/interaction-external-connect",
  destroy: "@tsparticles/interaction-external-destroy",
  drag: "@tsparticles/interaction-external-drag",
  grab: "@tsparticles/interaction-external-grab",
  particle: "@tsparticles/interaction-external-particle",
  pause: "@tsparticles/interaction-external-pause",
  pop: "@tsparticles/interaction-external-pop",
  push: "@tsparticles/interaction-external-push",
  remove: "@tsparticles/interaction-external-remove",
  repulse: "@tsparticles/interaction-external-repulse",
  slow: "@tsparticles/interaction-external-slow",
  trail: "@tsparticles/interaction-external-trail",
  light: "@tsparticles/interaction-light",
};

function findBundle(packages: string[]): string | undefined {
  const allNames = new Set(packages);

  const bundlePriority: Array<{ name: string; pkgs: string[] }> = [
    {
      name: "@tsparticles/all",
      pkgs: ["@tsparticles/plugin-background-mask", "@tsparticles/plugin-canvas-mask", "@tsparticles/plugin-sounds"],
    },
    {
      name: "@tsparticles/full",
      pkgs: ["@tsparticles/plugin-absorbers", "@tsparticles/plugin-emitters", "@tsparticles/interaction-external-drag"],
    },
    {
      name: "@tsparticles/slim",
      pkgs: [
        "@tsparticles/plugin-interactivity",
        "@tsparticles/interaction-particles-links",
        "@tsparticles/shape-image",
      ],
    },
    {
      name: "@tsparticles/basic",
      pkgs: ["@tsparticles/plugin-move", "@tsparticles/updater-opacity", "@tsparticles/updater-size"],
    },
  ];

  // Return the first (most feature-complete) bundle whose signature
  // packages are all present in the matched set. Previously this branch
  // computed an "extra packages" count and compared it against a
  // threshold, but returned `bundle.name` unconditionally either way —
  // the check had no effect on the result and has been removed rather
  // than kept as dead code.
  for (const bundle of bundlePriority) {
    const allPresent = bundle.pkgs.every(p => allNames.has(p));
    if (allPresent) {
      return bundle.name;
    }
  }

  return undefined;
}

export function suggestPlugins(options: Record<string, unknown>): SuggestPluginsResult {
  const matched: Set<string> = new Set();
  const imports: PackageImport[] = [];

  for (const mapping of optionToPlugin) {
    if (isOptionEnabled(options, mapping.optionPath)) {
      matched.add(mapping.packageName);
    }
  }

  const hasInteractivity = options.interactivity !== undefined;
  const hasEmitter = options.emitters !== undefined;
  const hasAbsorber = options.absorbers !== undefined;

  // -- Shape Detection --
  const shapeSection = (options.particles as Record<string, unknown> | undefined)?.shape as
    Record<string, unknown> | undefined;
  const shapeType = shapeSection?.type;
  const shapeOptions = shapeSection?.options as Record<string, unknown> | undefined;

  function addShapeByName(name: string) {
    const fullName = name.startsWith("@tsparticles/") ? name : `@tsparticles/shape-${name}`;
    if (packageCatalog.byName[fullName]) {
      matched.add(fullName);
    }
  }

  function getShapeNames(value: unknown): string[] {
    if (typeof value === "string") return value.split(/[,\s]+/).filter(Boolean);
    if (Array.isArray(value)) return (value as string[]).filter(Boolean);
    return [];
  }

  for (const name of getShapeNames(shapeType)) {
    addShapeByName(name);
  }

  // Infer shapes from shape options keys (e.g. shape.options.image → shape-image)
  if (shapeOptions) {
    const optionToShape: Record<string, string> = {
      image: "image",
      text: "text",
      emoji: "emoji",
      images: "image",
      character: "text",
      path: "path",
      polygon: "polygon",
      star: "star",
      heart: "heart",
      arrow: "arrow",
    };
    for (const key of Object.keys(shapeOptions)) {
      const shapeName = optionToShape[key];
      if (shapeName) addShapeByName(shapeName);
    }
  }

  // -- Effect Detection --
  const effectType = (options.particles as Record<string, unknown> | undefined)?.effect as
    Record<string, unknown> | undefined;
  if (effectType?.type) {
    const effectMap: Record<string, string> = {
      bubble: "@tsparticles/effect-bubble",
      filter: "@tsparticles/effect-filter",
      particles: "@tsparticles/effect-particles",
      shadow: "@tsparticles/effect-shadow",
      trail: "@tsparticles/effect-trail",
    };
    const typeStr = String(effectType.type);
    const pkg = effectMap[typeStr];
    if (pkg) matched.add(pkg);
  }

  // -- Emitter Shape Detection --
  // `emitters` may be a single config object or an array of them — walk
  // every entry so array-form configs aren't silently skipped.
  const emitterEntries = asArray<Record<string, unknown>>(options.emitters);
  const matchedEmitterShapePackages = new Set<string>();
  for (const emitter of emitterEntries) {
    const esTypeRaw = getOptionValue(emitter, "shape.type");
    for (const name of getShapeNames(esTypeRaw)) {
      const pkg = EMITTER_SHAPE_PACKAGES[name];
      if (pkg) {
        matched.add(pkg);
        matchedEmitterShapePackages.add(pkg);
      }
    }
  }

  // tsParticles requires @tsparticles/plugin-interactivity whenever
  // `interactivity` is configured at all — there's no partial substitute
  // for it, so this is unconditional rather than gated behind a stub
  // check that always evaluated to true anyway.
  if (hasInteractivity) {
    matched.add("@tsparticles/plugin-interactivity");
  }

  const pluginInteractions = [
    { key: "particles.links", pkg: "@tsparticles/interaction-particles-links" },
    { key: "particles.collisions", pkg: "@tsparticles/interaction-particles-collisions" },
    { key: "particles.move.attract", pkg: "@tsparticles/interaction-particles-attract" },
    { key: "particles.move.repulse", pkg: "@tsparticles/interaction-particles-repulse" },
  ];

  for (const { key, pkg } of pluginInteractions) {
    if (isOptionEnabled(options, key)) {
      matched.add(pkg);
    }
  }

  const interactivityModes = (options.interactivity as Record<string, unknown> | undefined)?.modes as
    Record<string, unknown> | undefined;
  if (interactivityModes) {
    for (const mode of Object.keys(interactivityModes)) {
      const pkg = INTERACTION_MODE_PACKAGES[mode];
      if (pkg) matched.add(pkg);
    }
  }

  if (hasEmitter) {
    matched.add("@tsparticles/plugin-emitters");
    // Only fall back to the default circle emitter shape if none of the
    // configured emitters resolved to ANY known emitter-shape package
    // (previously this only checked circle/square, so an emitter using
    // e.g. "polygon" would incorrectly also get "circle" added).
    if (matchedEmitterShapePackages.size === 0) {
      matched.add("@tsparticles/plugin-emitters-shape-circle");
    }
  }

  if (hasAbsorber) {
    matched.add("@tsparticles/plugin-absorbers");
  }

  const matchedArr = [...matched].filter(Boolean).sort();

  for (const pkgName of matchedArr) {
    const pkgInfo = packageCatalog.byName[pkgName];
    if (pkgInfo?.loadFunction) {
      imports.push({
        function: pkgInfo.loadFunction,
        from: pkgName,
      });
    }
  }

  const suggestedBundle = findBundle(matchedArr);

  let alreadyInBundle: string[] = [];
  if (suggestedBundle) {
    const bundleInfo = bundles.find(b => b.name === suggestedBundle);
    if (bundleInfo) {
      alreadyInBundle = matchedArr.filter(
        p => bundleInfo.packages.includes(p) || bundleInfo.packages.includes(p.replace("@tsparticles/", "")),
      );
    }
  }

  return {
    npmPackages: matchedArr,
    imports,
    suggestedBundle: suggestedBundle,
    alreadyInBundle,
  };
}
