import { EMITTER_SHAPE_PACKAGES, INTERACTION_MODE_PACKAGES } from "../registry/packageMaps.js";
import { asArray, getOptionValue } from "../utils/optionPath.js";
import { collectInteractivityModes, parseModeNames } from "../utils/interactivityModes.js";
import { packageCatalog } from "../registry/packages.js";
import { sanitizeReflection } from "../utils/sanitize.js";

export interface DiagnosticIssue {
  description: string;
  fix?: string;
  relatedPackages?: string[];
  severity: "error" | "warning" | "info";
  title: string;
}

// Shape names built into @tsparticles/engine itself, which never need an
// extra @tsparticles/shape-* package. Anything else is either a known
// shape package (checked against the catalog) or unrecognized.
const BUILT_IN_SHAPES = new Set(["circle", "square", "edge"]),
  HIGH_PARTICLE_COUNT = 1000,
  INVISIBLE_VALUE = 0,
  LOW_PARTICLE_COUNT = 30,
  // Keys that legitimately belong under `particles` in a valid tsParticles
  // config. This list intentionally errs on the side of completeness —
  // missing an entry here causes a false-positive "unusual structure"
  // warning on perfectly valid configs, which is worse than under-warning.
  KNOWN_PARTICLES_KEYS = new Set([
    "number",
    "color",
    "shape",
    "size",
    "opacity",
    "move",
    "links",
    "collisions",
    "stroke",
    "groups",
    "zIndex",
    "reduceDuplicates",
    "life",
    "rotate",
    "tilt",
    "roll",
    "wobble",
    "twinkle",
    "shadow",
    "destroy",
    "orbit",
    "effect",
    "bounce",
    "interactivity",
  ]);

/**
 * Renders a diagnostic value as text, keeping the same output a plain
 * template interpolation would have produced.
 *
 * @param value - the value to render
 * @returns the value rendered as text
 */
function toText(value: unknown): string {
  return String(value);
}

/**
 *
 * @param options
 */
export function diagnoseIssues(options: Record<string, unknown>): DiagnosticIssue[] {
  const issues: DiagnosticIssue[] = [],
    // ── No Plugins Loaded (most common issue) ───────────────────────
    hasParticleOptions =
      getOptionValue(options, "particles.number") !== undefined ||
      getOptionValue(options, "particles.color") !== undefined ||
      getOptionValue(options, "particles.shape") !== undefined ||
      getOptionValue(options, "particles.size") !== undefined ||
      getOptionValue(options, "particles.opacity") !== undefined ||
      getOptionValue(options, "particles.move") !== undefined ||
      getOptionValue(options, "particles.links") !== undefined;

  if (hasParticleOptions) {
    issues.push({
      severity: "info",
      title: "Verify plugins are loaded",
      description:
        "The @tsparticles/engine alone has no shape drawers, movement system, or updaters. Make sure you have loaded the required plugins before initializing — either via a bundle (loadBasic, loadSlim, loadFull) or by loading individual plugins.",
      fix: "Load at least @tsparticles/basic via loadBasic(engine), or load individual plugins like loadCircleShape, loadMovePlugin, loadOpacityUpdater, loadSizeUpdater, loadHexColorPlugin, loadRgbColorPlugin, loadHslColorPlugin.",
      relatedPackages: [
        "@tsparticles/basic",
        "@tsparticles/slim",
        "tsparticles",
      ],
    });
  }

  // ── Canvas / Container ──────────────────────────────────────────
  if (options.id && typeof options.id !== "string" && typeof options.id !== "object") {
    issues.push({
      severity: "error",
      title: "Invalid container ID",
      description: `The 'id' option should be a string matching the container element ID, or an object/HTMLElement. Got: ${typeof options.id}`,
      fix: "Set id to a string like 'tsparticles' matching your <div id='tsparticles'> element.",
    });
  }

  // ── Particle Visibility ─────────────────────────────────────────
  const opacityVal = getOptionValue(options, "particles.opacity.value");
  if (opacityVal !== undefined && Number(opacityVal) === INVISIBLE_VALUE) {
    const opacityAnim = getOptionValue(options, "particles.opacity.animation.enable");
    if (!opacityAnim) {
      issues.push({
        severity: "error",
        title: "Particles invisible (opacity = 0)",
        description:
          "particles.opacity.value is set to 0 with no animation enabled. Particles will be fully transparent.",
        fix: "Set particles.opacity.value to a value between 0.1 and 1, or enable opacity animation.",
      });
    }
  }

  const sizeVal = getOptionValue(options, "particles.size.value");
  if (sizeVal !== undefined && Number(sizeVal) === INVISIBLE_VALUE) {
    const sizeAnim = getOptionValue(options, "particles.size.animation.enable");
    if (!sizeAnim) {
      issues.push({
        severity: "error",
        title: "Particles invisible (size = 0)",
        description: "particles.size.value is set to 0 with no animation enabled. Particles will have zero width.",
        fix: "Set particles.size.value to a value > 0, or enable size animation.",
      });
    }
  }

  // ── Missing Move Plugin ─────────────────────────────────────────
  const moveVal = getOptionValue(options, "particles.move");
  if (moveVal !== undefined) {
    issues.push({
      severity: "warning",
      title: "Move plugin required",
      description:
        "You have particles.move configured. Make sure @tsparticles/plugin-move is loaded before initializing tsParticles, otherwise particles won't move.",
      fix: "Install and load @tsparticles/plugin-move via loadMovePlugin(engine).",
      relatedPackages: ["@tsparticles/plugin-move"],
    });
  }

  // ── Missing Color Plugin ────────────────────────────────────────
  const colorValue = getOptionValue(options, "particles.color.value");
  if (colorValue !== undefined && colorValue !== null) {
    const colorStr = toText(colorValue);
    if (colorStr.startsWith("#")) {
      issues.push({
        severity: "warning",
        title: "Hex color format needs hex-color plugin",
        description:
          "You're using a hex color (#RRGGBB). Load @tsparticles/plugin-hex-color or use a built-in color name.",
        fix: "Install and load @tsparticles/plugin-hex-color via loadHexColorPlugin(engine).",
        relatedPackages: ["@tsparticles/plugin-hex-color"],
      });
    }
    if (colorStr.startsWith("hsl")) {
      issues.push({
        severity: "warning",
        title: "HSL color format needs hsl-color plugin",
        description: "You're using an HSL color. Load @tsparticles/plugin-hsl-color or use a built-in color name.",
        fix: "Install and load @tsparticles/plugin-hsl-color via loadHslColorPlugin(engine).",
        relatedPackages: ["@tsparticles/plugin-hsl-color"],
      });
    }
    if (colorStr.startsWith("rgb")) {
      issues.push({
        severity: "warning",
        title: "RGB color format needs rgb-color plugin",
        description: "You're using an RGB color. Load @tsparticles/plugin-rgb-color or use a built-in color name.",
        fix: "Install and load @tsparticles/plugin-rgb-color via loadRgbColorPlugin(engine).",
        relatedPackages: ["@tsparticles/plugin-rgb-color"],
      });
    }
  }

  // ── Missing Shape Plugin ────────────────────────────────────────
  const shapeType = getOptionValue(options, "particles.shape.type");
  if (shapeType) {
    let names: string[];
    if (typeof shapeType === "string") {
      names = shapeType.split(/[,\s]+/).filter(Boolean);
    } else if (Array.isArray(shapeType)) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      names = shapeType.filter((v): v is string => typeof v === "string" && v.length > 0);
    } else {
      names = [];
    }
    for (const name of names) {
      const cleanName = name.replace("@tsparticles/", ""),
        fullName = cleanName.startsWith("shape-") ? `@tsparticles/${cleanName}` : `@tsparticles/shape-${cleanName}`;

      if (fullName in packageCatalog.byName) {
        issues.push({
          severity: "warning",
          title: `Shape ${sanitizeReflection(cleanName)} needs its plugin`,
          description: `Shape type ${sanitizeReflection(name)} requires ${sanitizeReflection(fullName)}. Without it, particles with this shape won't render.`,
          fix: `Install and load ${sanitizeReflection(fullName)}.`,
          relatedPackages: [fullName],
        });
      } else if (!BUILT_IN_SHAPES.has(cleanName.toLowerCase())) {
        // Previously this case was silently ignored, which hides typos
        // like "squere" or genuinely unsupported shape names — flag it
        // instead of saying nothing.
        issues.push({
          severity: "warning",
          title: `Unrecognized shape ${sanitizeReflection(cleanName)}`,
          description: `Shape type ${sanitizeReflection(name)} doesn't match a built-in shape or a known @tsparticles/shape-* package. Check for typos, or confirm this is a custom shape registered manually.`,
          fix: "Use list_packages with category 'shape' to see all known shape packages.",
        });
      }
    }
  }

  // ── Missing Interactivity Plugin ────────────────────────────────
  const interactivity = getOptionValue(options, "interactivity");
  if (interactivity !== undefined) {
    issues.push({
      severity: "warning",
      title: "Interactivity plugin required",
      description:
        "You have interactivity configured. Make sure @tsparticles/plugin-interactivity is loaded, otherwise mouse/touch interactions won't work.",
      fix: "Install and load @tsparticles/plugin-interactivity via loadInteractivityPlugin(engine).",
      relatedPackages: ["@tsparticles/plugin-interactivity"],
    });
  }

  // ── Missing Interaction Packages ────────────────────────────────
  const interactionModes = collectInteractivityModes(interactivity as Record<string, unknown> | undefined);
  for (const mode of interactionModes) {
    const pkg = INTERACTION_MODE_PACKAGES[mode];
    if (pkg) {
      issues.push({
        severity: "info",
        title: `Interaction mode ${sanitizeReflection(mode)} needs package`,
        description: `Interactivity mode ${sanitizeReflection(mode)} is configured. Make sure ${pkg} is loaded, otherwise the mode won't produce any effect.`,
        fix: `Install and load ${pkg}.`,
        relatedPackages: [pkg],
      });
    }
  }

  // ── Links plugin needed ─────────────────────────────────────────
  if (getOptionValue(options, "particles.links") !== undefined) {
    issues.push({
      severity: "warning",
      title: "Links interaction plugin required",
      description:
        "particles.links is configured. Load @tsparticles/interaction-particles-links to draw connecting lines between particles.",
      fix: "Install and load @tsparticles/interaction-particles-links via loadParticlesLinksInteraction(engine).",
      relatedPackages: ["@tsparticles/interaction-particles-links"],
    });
  }

  // ── Missing Emitters Plugin ─────────────────────────────────────
  if (getOptionValue(options, "emitters") !== undefined) {
    issues.push({
      severity: "warning",
      title: "Emitters plugin required",
      description: "emitters is configured. Load @tsparticles/plugin-emitters to spawn particles from emitter points.",
      fix: "Install and load @tsparticles/plugin-emitters via loadEmittersPlugin(engine).",
      relatedPackages: ["@tsparticles/plugin-emitters"],
    });
  }

  // ── Missing Absorbers Plugin ────────────────────────────────────
  if (getOptionValue(options, "absorbers") !== undefined) {
    issues.push({
      severity: "warning",
      title: "Absorbers plugin required",
      description: "absorbers is configured. Load @tsparticles/plugin-absorbers for particle absorption behavior.",
      fix: "Install and load @tsparticles/plugin-absorbers via loadAbsorbersPlugin(engine).",
      relatedPackages: ["@tsparticles/plugin-absorbers"],
    });
  }

  // ── Background Mask ─────────────────────────────────────────────
  if (getOptionValue(options, "backgroundMask") !== undefined) {
    issues.push({
      severity: "warning",
      title: "Background mask plugin required",
      description: "backgroundMask is configured. Load @tsparticles/plugin-background-mask.",
      fix: "Install and load @tsparticles/plugin-background-mask via loadBackgroundMaskPlugin(engine).",
      relatedPackages: ["@tsparticles/plugin-background-mask"],
    });
  }

  // ── Options Structure Issues ────────────────────────────────────
  const particlesVal = getOptionValue(options, "particles") as Record<string, unknown> | undefined;
  if (particlesVal && typeof particlesVal === "object") {
    const keys = Object.keys(particlesVal),
      hasAnyKnownKey = keys.some(k => KNOWN_PARTICLES_KEYS.has(k)),
      childObjectKeys = keys.filter(k => typeof particlesVal[k] === "object");

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (!hasAnyKnownKey && childObjectKeys.length > 0) {
      issues.push({
        severity: "info",
        title: "Unusual particles structure",
        description: `The particles object doesn't contain any recognized keys (found: ${keys.map(k => sanitizeReflection(k)).join(", ") || "none"}). Your options may be nested incorrectly.`,
        fix: "Ensure your options follow the correct structure: { background, particles: { number, color, shape, size, opacity, move, links, ... }, interactivity: { ... } }",
      });
    }
  }

  // ── Low particle count ──────────────────────────────────────────
  const numParticles = getOptionValue(options, "particles.number.value"),
    densityArea = getOptionValue(options, "particles.number.density.area");
  if (numParticles !== undefined && Number(numParticles) < LOW_PARTICLE_COUNT && !densityArea) {
    issues.push({
      severity: "info",
      title: "Low particle count",
      description: `Only ${toText(numParticles)} particles configured. In a full-screen canvas this may look sparse.`,
      fix: "Increase particles.number.value to 50-100, or configure particles.number.density.area to auto-scale based on canvas size.",
    });
  }

  // ── Full-screen not set ─────────────────────────────────────────
  const fullScreen = getOptionValue(options, "fullScreen");
  if (fullScreen === undefined) {
    issues.push({
      severity: "info",
      title: "Full-screen not enabled by default in v2",
      description:
        "tsParticles v2 does NOT set fullScreen by default. If your container div has no explicit size, the canvas may have zero height.",
      fix: "Add fullScreen: { enable: true } to your options, or ensure your container div has explicit width and height (e.g., width: 100%; height: 100vh).",
    });
  }

  // ── Preset usage ────────────────────────────────────────────────
  const preset = getOptionValue(options, "preset");
  if (preset && typeof preset === "string") {
    issues.push({
      severity: "info",
      title: "Using a preset",
      description: `You're using the ${sanitizeReflection(preset)} preset. Make sure the corresponding preset package is installed and loaded before initializing tsParticles.`,
    });
  }

  // ── Emitter shape ───────────────────────────────────────────────
  // `emitters` may be a single object or an array of emitter configs —
  // normalize before reading `.shape.type` so array configs aren't
  // silently skipped.
  const emitterEntries = asArray<Record<string, unknown>>(options.emitters),
    reportedEmitterShapes = new Set<string>();
  for (const emitter of emitterEntries) {
    const shapeType = getOptionValue(emitter, "shape.type");
    if (!shapeType) continue;

    for (const name of parseModeNames(shapeType)) {
      if (reportedEmitterShapes.has(name)) continue;
      reportedEmitterShapes.add(name);

      const pkg = EMITTER_SHAPE_PACKAGES[name];
      if (pkg) {
        issues.push({
          severity: "info",
          title: `Emitter shape ${sanitizeReflection(name)} needs package`,
          description: `Emitter shape type ${sanitizeReflection(name)} requires ${pkg}. Without it, the default circle shape will be used.`,
          fix: `Install and load ${pkg}.`,
          relatedPackages: [pkg],
        });
      }
    }
  }

  // ── Performance Warnings ────────────────────────────────────────
  if (numParticles !== undefined && Number(numParticles) > HIGH_PARTICLE_COUNT) {
    issues.push({
      severity: "warning",
      title: "High particle count may affect performance",
      description: `${toText(numParticles)} particles is a lot. Consider reducing the count or enabling performance options.`,
      fix: "Set particles.number.value to a lower value (100-500), or enable particles.reduceDuplicates.",
    });
  }

  return issues;
}
