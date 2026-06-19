import type { SuggestPluginsResult, PackageImport } from "../types.js";
import { packageCatalog } from "../registry/packages.js";
import { optionToPlugin } from "../registry/pluginOptions.js";
import { bundles } from "../registry/bundles.js";

function getOptionValue(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;

  for (const part of parts) {
    if (current === undefined || current === null || typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }

  return current;
}

function isOptionEnabled(obj: Record<string, unknown>, path: string): boolean {
  const value = getOptionValue(obj, path);

  if (value === undefined) return false;

  if (typeof value === "boolean") return value;

  if (Array.isArray(value)) return value.length > 0;

  if (typeof value === "object" && value !== null) {
    const enableVal = (value as Record<string, unknown>)["enable"];
    if (typeof enableVal === "boolean") return enableVal;
    return true;
  }

  return true;
}

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
      pkgs: ["@tsparticles/plugin-interactivity", "@tsparticles/interaction-particles-links", "@tsparticles/shape-image"],
    },
    {
      name: "@tsparticles/basic",
      pkgs: ["@tsparticles/plugin-move", "@tsparticles/updater-opacity", "@tsparticles/updater-size"],
    },
  ];

  for (const bundle of bundlePriority) {
    const allPresent = bundle.pkgs.every(p => allNames.has(p));
    if (allPresent) {
      const extra = packages.filter(p => !bundle.pkgs.includes(p) && !p.startsWith("@tsparticles/plugin-easing-") && !p.startsWith("@tsparticles/plugin-export-") && p !== "@tsparticles/plugin-blend");
      if (extra.length <= 3) {
        return bundle.name;
      }
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
  const shapeSection = (options.particles as Record<string, unknown> | undefined)?.shape as Record<string, unknown> | undefined;
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
  const effectType = (options.particles as Record<string, unknown> | undefined)?.effect as Record<string, unknown> | undefined;
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
  const emitterShape = options.emitters as Record<string, unknown> | undefined;
  if (emitterShape) {
    const esTypeRaw = (emitterShape.shape as Record<string, unknown> | undefined)?.type;
    const esNames = getShapeNames(esTypeRaw);
    const esShapeMap: Record<string, string> = {
      circle: "@tsparticles/plugin-emitters-shape-circle",
      square: "@tsparticles/plugin-emitters-shape-square",
      canvas: "@tsparticles/plugin-emitters-shape-canvas",
      path: "@tsparticles/plugin-emitters-shape-path",
      polygon: "@tsparticles/plugin-emitters-shape-polygon",
    };
    for (const name of esNames) {
      const pkg = esShapeMap[name];
      if (pkg) matched.add(pkg);
    }
  }

  if (hasInteractivity && !hasInteractivityTools()) {
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

  const interactivityModes = (options.interactivity as Record<string, unknown> | undefined)?.modes as Record<string, unknown> | undefined;
  if (interactivityModes) {
    for (const mode of Object.keys(interactivityModes)) {
      const pkg = findInteractionPackageForMode(mode);
      if (pkg) matched.add(pkg);
    }
  }

  if (hasEmitter) {
    matched.add("@tsparticles/plugin-emitters");
    if (!matched.has("@tsparticles/plugin-emitters-shape-circle") && !matched.has("@tsparticles/plugin-emitters-shape-square")) {
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
      alreadyInBundle = matchedArr.filter(p => bundleInfo.packages.includes(p) || bundleInfo.packages.includes(p.replace("@tsparticles/", "")));
    }
  }

  return {
    npmPackages: matchedArr,
    imports,
    suggestedBundle: suggestedBundle,
    alreadyInBundle,
  };
}

function findInteractionPackageForMode(mode: string): string | undefined {
  const modeMap: Record<string, string> = {
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

  return modeMap[mode];
}

function hasInteractivityTools(): boolean {
  return false;
}
