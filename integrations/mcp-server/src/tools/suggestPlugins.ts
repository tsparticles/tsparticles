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
  const optionSources: Record<string, unknown>[] = [options];

  for (const override of [...asArray<unknown>(options.themes), ...asArray<unknown>(options.responsive)]) {
    if (!override || typeof override !== "object" || Array.isArray(override)) {
      continue;
    }

    const sourceOptions = (override as Record<string, unknown>).options;

    if (sourceOptions && typeof sourceOptions === "object" && !Array.isArray(sourceOptions)) {
      optionSources.push(sourceOptions as Record<string, unknown>);
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

  /**
   * Adds packages for enabled plugin options outside the particle options tree.
   */
  function addMappedPlugins(): void {
    for (const sourceOptions of optionSources) {
      for (const mapping of optionToPlugin) {
        if (!mapping.optionPath.startsWith("particles.") && isOptionEnabled(sourceOptions, mapping.optionPath)) {
          matched.add(mapping.packageName);
        }
      }
    }
  }

  const shapeAliases: Record<string, string> = {
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
    const shapeName = Object.hasOwn(shapeAliases, name) ? shapeAliases[name] : name,
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
   * @param rawOptions - Particle options to inspect for required loaders.
   */
  function addParticleOptionPlugins(rawOptions: unknown): void {
    if (!rawOptions || typeof rawOptions !== "object" || Array.isArray(rawOptions)) {
      return;
    }

    const particleOptions = rawOptions as Record<string, unknown>,
      particleRoot = { particles: particleOptions },
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
        const shapeName = Object.hasOwn(optionToShape, key) ? optionToShape[key] : undefined;

        if (shapeName) {
          addShapeByName(shapeName);
        }
      }
    }

    for (const typeName of parseModeNames(effectSection?.type)) {
      const pkg = Object.hasOwn(effectMap, typeName) ? effectMap[typeName] : undefined;

      if (pkg) {
        matched.add(pkg);
      }
    }
  }

  /**
   *
   * @param rawOptions - Source options containing particles and optional groups.
   */
  function addParticleOptions(rawOptions: unknown): void {
    if (!rawOptions || typeof rawOptions !== "object" || Array.isArray(rawOptions)) {
      return;
    }

    const sourceOptions = rawOptions as Record<string, unknown>;

    addParticleOptionPlugins(sourceOptions.particles);

    const particleGroups = getOptionValue(sourceOptions, "particles.groups");

    if (particleGroups && typeof particleGroups === "object" && !Array.isArray(particleGroups)) {
      for (const groupOptions of Object.values(particleGroups)) {
        addParticleOptionPlugins(groupOptions);
      }
    }
  }

  /**
   * Adds packages required by root, theme, and responsive particle options.
   */
  function addSourceParticlePlugins(): void {
    for (const sourceOptions of optionSources) {
      addParticleOptions(sourceOptions);
    }
  }

  // -- Emitter Shape Detection --

  /**
   * Adds emitter and shape packages required by every emitter entry.
   */
  function addEmitterPlugins(): void {
    for (const sourceOptions of optionSources) {
      const emitterEntries = asArray<Record<string, unknown>>(sourceOptions.emitters);

      for (const emitter of emitterEntries) {
        const shapeType = getOptionValue(emitter, "shape.type");

        for (const name of getShapeNames(shapeType === undefined ? "square" : shapeType)) {
          if (Object.hasOwn(EMITTER_SHAPE_PACKAGES, name)) {
            const pkg = EMITTER_SHAPE_PACKAGES[name];

            if (pkg) {
              matched.add(pkg);
            }
          }
        }

        const particleOverrides = [
          ...asArray<unknown>(getOptionValue(emitter, "particles")),
          ...asArray<unknown>(getOptionValue(emitter, "destroy.split.particles")),
        ];

        for (const particleOptions of particleOverrides) {
          addParticleOptionPlugins(particleOptions);
        }
      }
    }
  }

  // Emitters and absorbers register interaction loaders that require the
  // interactivity plugin, so load it before those package loaders too.
  /**
   * Adds interactivity, emitter, and absorber packages required by the options.
   */
  function addInteractivityPlugins(): void {
    for (const sourceOptions of optionSources) {
      const hasInteractivity = sourceOptions.interactivity !== undefined,
        hasEmitter = sourceOptions.emitters !== undefined,
        hasAbsorber = sourceOptions.absorbers !== undefined;

      if (hasInteractivity || hasEmitter || hasAbsorber) {
        matched.add("@tsparticles/plugin-interactivity");
      }

      const interactivityModes = collectInteractivityModes(
        sourceOptions.interactivity as Record<string, unknown> | undefined,
      );

      for (const mode of interactivityModes) {
        if (Object.hasOwn(INTERACTION_MODE_PACKAGES, mode)) {
          const pkg = INTERACTION_MODE_PACKAGES[mode];

          if (pkg) {
            matched.add(pkg);
          }
        }
      }

      if (hasEmitter) {
        matched.add("@tsparticles/plugin-emitters");
      }

      if (hasAbsorber) {
        matched.add("@tsparticles/plugin-absorbers");
      }
    }
  }

  addMappedPlugins();
  addSourceParticlePlugins();
  addEmitterPlugins();
  addInteractivityPlugins();

  const interactivityPackage = "@tsparticles/plugin-interactivity",
    matchedArr = [...matched].filter(Boolean).sort((first, second) => first.localeCompare(second)),
    importOrder = [
      ...(matchedArr.includes(interactivityPackage) ? [interactivityPackage] : []),
      ...matchedArr.filter(pkgName => pkgName !== interactivityPackage),
    ];

  /**
   * Builds loader imports for the matched packages in dependency order.
   */
  function buildImports(): void {
    for (const pkgName of importOrder) {
      const pkgInfo = packageCatalog.byName[pkgName];

      if (pkgInfo.loadFunction) {
        imports.push({
          function: pkgInfo.loadFunction,
          from: pkgName,
        });
      }
    }
  }

  /**
   * Finds the most suitable bundle and identifies matched packages it already includes.
   */
  function getBundleSuggestion(): { alreadyInBundle: string[]; suggestedBundle: string | undefined } {
    const suggestedBundle = findBundle(matchedArr);

    if (!suggestedBundle) {
      return { alreadyInBundle: [], suggestedBundle };
    }

    const bundleInfo = bundles.find(b => b.name === suggestedBundle);

    if (!bundleInfo) {
      return { alreadyInBundle: [], suggestedBundle };
    }

    const alreadyInBundle = matchedArr.filter(
      pkgName =>
        bundleInfo.packages.includes(pkgName) || bundleInfo.packages.includes(pkgName.replace("@tsparticles/", "")),
    );

    return { alreadyInBundle, suggestedBundle };
  }

  buildImports();

  const { suggestedBundle, alreadyInBundle } = getBundleSuggestion();

  return {
    npmPackages: matchedArr,
    imports,
    suggestedBundle: suggestedBundle,
    alreadyInBundle,
  };
}
