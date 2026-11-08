import { EMITTER_SHAPE_PACKAGES, INTERACTION_MODE_PACKAGES } from "../registry/packageMaps.js";
import type { PackageImport, SuggestPluginsResult } from "../types.js";
import { asArray, getOptionValue, isOptionEnabled } from "../utils/optionPath.js";
import { collectInteractivityModes, parseModeNames } from "../utils/interactivityModes.js";
import { bundles } from "../registry/bundles.js";
import { optionToPlugin } from "../registry/pluginOptions.js";
import { packageCatalog } from "../registry/packages.js";

/**
 *
 * @param packages
 */
function findBundle(packages: string[]): string | undefined {
  const allNames = new Set(packages),
    bundlePriority: { name: string; pkgs: string[] }[] = [
      {
        name: "@tsparticles/all",
        pkgs: ["@tsparticles/plugin-background-mask", "@tsparticles/plugin-canvas-mask", "@tsparticles/plugin-sounds"],
      },
      {
        name: "tsparticles",
        pkgs: [
          "@tsparticles/plugin-absorbers",
          "@tsparticles/plugin-emitters",
          "@tsparticles/interaction-external-drag",
        ],
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

/**
 *
 * @param options
 */
export function suggestPlugins(options: Record<string, unknown>): SuggestPluginsResult {
  const matched = new Set<string>(),
    imports: PackageImport[] = [],
    particleOptionMappings = optionToPlugin.filter(mapping => mapping.optionPath.startsWith("particles."));

  for (const mapping of optionToPlugin) {
    if (!mapping.optionPath.startsWith("particles.") && isOptionEnabled(options, mapping.optionPath)) {
      matched.add(mapping.packageName);
    }
  }

  /**
   *
   * @param value - A color value or array of color values.
   */
  function addColorPlugins(value: unknown): void {
    const colorValues = Array.isArray(value) ? value : [value];

    for (const color of colorValues) {
      if (typeof color !== "string") {
        continue;
      }

      const normalizedColor = color.trim().toLowerCase();

      if (normalizedColor.startsWith("#")) {
        matched.add("@tsparticles/plugin-hex-color");
      } else if (normalizedColor.startsWith("hsl")) {
        matched.add("@tsparticles/plugin-hsl-color");
      } else if (normalizedColor.startsWith("rgb")) {
        matched.add("@tsparticles/plugin-rgb-color");
      }
    }
  }

  const hasInteractivity = options.interactivity !== undefined,
    hasEmitter = options.emitters !== undefined,
    hasAbsorber = options.absorbers !== undefined,
    shapeAliases: Record<string, string> = {
      char: "text",
      character: "text",
      edge: "square",
      gifs: "gif",
      images: "image",
      "multiline-text": "text",
      triangle: "polygon",
    };

  /**
   *
   * @param name
   */
  function addShapeByName(name: string): void {
    const shapeName = Object.prototype.hasOwnProperty.call(shapeAliases, name) ? shapeAliases[name] : name,
      fullName = shapeName.startsWith("@tsparticles/") ? shapeName : `@tsparticles/shape-${shapeName}`;

    if (fullName in packageCatalog.byName) {
      matched.add(fullName);
    }
  }

  /**
   *
   * @param value
   */
  function getShapeNames(value: unknown): string[] {
    return parseModeNames(value);
  }

  const effectMap: Record<string, string> = {
      bubble: "@tsparticles/effect-bubble",
      filter: "@tsparticles/effect-filter",
      particles: "@tsparticles/effect-particles",
      shadow: "@tsparticles/effect-shadow",
      trail: "@tsparticles/effect-trail",
    },
    colorPaths = [
      "particles.color.value",
      "particles.paint.color.value",
      "particles.paint.fill.color.value",
      "particles.paint.stroke.color.value",
    ],
    optionToShape: Record<string, string> = {
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

  /**
   *
   * @param particleOptions - Particle options to inspect for required loaders.
   */
  function addParticleOptionPlugins(particleOptions: Record<string, unknown>): void {
    const particleRoot = { particles: particleOptions },
      shapeSection = particleOptions.shape as Record<string, unknown> | undefined,
      shapeOptions = shapeSection?.options as Record<string, unknown> | undefined,
      effectSection = particleOptions.effect as Record<string, unknown> | undefined;

    for (const mapping of particleOptionMappings) {
      if (isOptionEnabled(particleRoot, mapping.optionPath)) {
        matched.add(mapping.packageName);

        if (mapping.packageName.startsWith("@tsparticles/interaction-particles-")) {
          matched.add("@tsparticles/plugin-interactivity");
        }
      }
    }

    if (isOptionEnabled(particleRoot, "particles.move")) {
      matched.add("@tsparticles/plugin-move");
    }

    if (isOptionEnabled(particleRoot, "particles.paint")) {
      matched.add("@tsparticles/updater-paint");
    }

    for (const colorPath of colorPaths) {
      addColorPlugins(getOptionValue(particleRoot, colorPath));
    }

    for (const name of getShapeNames(shapeSection?.type)) {
      addShapeByName(name);
    }

    if (shapeOptions) {
      for (const key of Object.keys(shapeOptions)) {
        const shapeName = optionToShape[key];

        if (shapeName) {
          addShapeByName(shapeName);
        }
      }
    }

    for (const typeName of parseModeNames(effectSection?.type)) {
      const pkg = effectMap[typeName];

      if (pkg) {
        matched.add(pkg);
      }
    }
  }

  const topLevelParticles = options.particles;

  if (topLevelParticles && typeof topLevelParticles === "object" && !Array.isArray(topLevelParticles)) {
    addParticleOptionPlugins(topLevelParticles as Record<string, unknown>);
  }

  // -- Emitter Shape Detection --
  // `emitters` may be a single config object or an array of them — walk
  // every entry so array-form configs aren't silently skipped.
  const emitterEntries = asArray<Record<string, unknown>>(options.emitters),
    matchedEmitterShapePackages = new Set<string>();
  for (const emitter of emitterEntries) {
    const esTypeRaw = getOptionValue(emitter, "shape.type");
    for (const name of getShapeNames(esTypeRaw)) {
      const pkg = EMITTER_SHAPE_PACKAGES[name];
      if (pkg) {
        matched.add(pkg);
        matchedEmitterShapePackages.add(pkg);
      }
    }

    const particleOverrides = asArray<unknown>(getOptionValue(emitter, "particles"));

    for (const particleOptions of particleOverrides) {
      if (particleOptions === null || typeof particleOptions !== "object" || Array.isArray(particleOptions)) {
        continue;
      }

      addParticleOptionPlugins(particleOptions as Record<string, unknown>);
    }
  }

  // Emitters and absorbers register interaction loaders that require the
  // interactivity plugin, so load it before those package loaders too.
  if (hasInteractivity || hasEmitter || hasAbsorber) {
    matched.add("@tsparticles/plugin-interactivity");
  }

  const interactivityModes = collectInteractivityModes(options.interactivity as Record<string, unknown> | undefined);
  for (const mode of interactivityModes) {
    const pkg = INTERACTION_MODE_PACKAGES[mode];
    if (pkg) matched.add(pkg);
  }

  if (hasEmitter) {
    matched.add("@tsparticles/plugin-emitters");
    // Only fall back to the default circle emitter shape if none of the
    // configured emitters resolved to ANY known emitter-shape package
    // (previously this only checked circle/square, so an emitter using
    // e.g. "polygon" would incorrectly also get "circle" added).
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (matchedEmitterShapePackages.size === 0) {
      matched.add("@tsparticles/plugin-emitters-shape-circle");
    }
  }

  if (hasAbsorber) {
    matched.add("@tsparticles/plugin-absorbers");
  }

  const interactivityPackage = "@tsparticles/plugin-interactivity",
    matchedArr = [...matched].filter(Boolean).sort(),
    importOrder = [
      ...(matchedArr.includes(interactivityPackage) ? [interactivityPackage] : []),
      ...matchedArr.filter(pkgName => pkgName !== interactivityPackage),
    ];

  for (const pkgName of importOrder) {
    const pkgInfo = packageCatalog.byName[pkgName];
    if (pkgInfo.loadFunction) {
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
