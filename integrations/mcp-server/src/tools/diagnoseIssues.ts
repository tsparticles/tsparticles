import { packageCatalog } from "../registry/packages.js";

export interface DiagnosticIssue {
  severity: "error" | "warning" | "info";
  title: string;
  description: string;
  fix?: string;
  relatedPackages?: string[];
}

function getOptionValue(options: Record<string, unknown>, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = options;
  for (const part of parts) {
    if (current === undefined || current === null || typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

export function diagnoseIssues(options: Record<string, unknown>): DiagnosticIssue[] {
  const issues: DiagnosticIssue[] = [];

  // ── No Plugins Loaded (most common issue) ───────────────────────
  const hasParticleOptions =
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
      fix:
        "Load at least @tsparticles/basic via loadBasic(engine), or load individual plugins like loadCircleShape, loadMovePlugin, loadOpacityUpdater, loadSizeUpdater, loadHexColorPlugin, loadRgbColorPlugin, loadHslColorPlugin.",
      relatedPackages: [
        "@tsparticles/basic",
        "@tsparticles/slim",
        "@tsparticles/full",
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
  if (opacityVal !== undefined && Number(opacityVal) === 0) {
    const opacityAnim = getOptionValue(options, "particles.opacity.animation.enable");
    if (!opacityAnim) {
      issues.push({
        severity: "error",
        title: "Particles invisible (opacity = 0)",
        description: "particles.opacity.value is set to 0 with no animation enabled. Particles will be fully transparent.",
        fix: "Set particles.opacity.value to a value between 0.1 and 1, or enable opacity animation.",
      });
    }
  }

  const sizeVal = getOptionValue(options, "particles.size.value");
  if (sizeVal !== undefined && Number(sizeVal) === 0) {
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
      description: "You have particles.move configured. Make sure @tsparticles/plugin-move is loaded before initializing tsParticles, otherwise particles won't move.",
      fix: "Install and load @tsparticles/plugin-move via loadMovePlugin(engine).",
      relatedPackages: ["@tsparticles/plugin-move"],
    });
  }

  // ── Missing Color Plugin ────────────────────────────────────────
  const colorValue = getOptionValue(options, "particles.color.value");
  if (colorValue !== undefined && colorValue !== null) {
    const colorStr = String(colorValue);
    if (colorStr.startsWith("#")) {
      issues.push({
        severity: "warning",
        title: "Hex color format needs hex-color plugin",
        description: "You're using a hex color (#RRGGBB). Load @tsparticles/plugin-hex-color or use a built-in color name.",
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
    const names = typeof shapeType === "string"
      ? shapeType.split(/[,\s]+/).filter(Boolean)
      : Array.isArray(shapeType) ? shapeType.filter(Boolean) : [];
    for (const name of names) {
      const cleanName = name.replace("@tsparticles/", "");
      const fullName = cleanName.startsWith("shape-")
        ? `@tsparticles/${cleanName}`
        : `@tsparticles/shape-${cleanName}`;
      if (packageCatalog.byName[fullName]) {
        issues.push({
          severity: "warning",
          title: `Shape '${cleanName}' needs its plugin`,
          description: `Shape type '${name}' requires ${fullName}. Without it, particles with this shape won't render.`,
          fix: `Install and load ${fullName}.`,
          relatedPackages: [fullName],
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
      description: "You have interactivity configured. Make sure @tsparticles/plugin-interactivity is loaded, otherwise mouse/touch interactions won't work.",
      fix: "Install and load @tsparticles/plugin-interactivity via loadInteractivityPlugin(engine).",
      relatedPackages: ["@tsparticles/plugin-interactivity"],
    });
  }

  // ── Missing Interaction Packages ────────────────────────────────
  const modes = getOptionValue(options, "interactivity.modes") as Record<string, unknown> | undefined;
  if (modes) {
    const modeToPackage: Record<string, string> = {
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

    for (const [mode, pkg] of Object.entries(modeToPackage)) {
      if (getOptionValue(options, `interactivity.modes.${mode}`) !== undefined) {
        issues.push({
          severity: "info",
          title: `Interaction mode '${mode}' needs package`,
          description: `Interactivity mode '${mode}' is configured. Make sure ${pkg} is loaded, otherwise the mode won't produce any effect.`,
          fix: `Install and load ${pkg}.`,
          relatedPackages: [pkg],
        });
      }
    }
  }

  // ── Links plugin needed ─────────────────────────────────────────
  if (getOptionValue(options, "particles.links") !== undefined) {
    issues.push({
      severity: "warning",
      title: "Links interaction plugin required",
      description: "particles.links is configured. Load @tsparticles/interaction-particles-links to draw connecting lines between particles.",
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
  if (particlesVal && typeof particlesVal === "object" && !("number" in particlesVal) && !("color" in particlesVal) && !("shape" in particlesVal) && !("size" in particlesVal) && !("opacity" in particlesVal) && !("move" in particlesVal)) {
    const childKeys = Object.keys(particlesVal).filter(k => typeof particlesVal[k] === "object");
    if (childKeys.length > 0) {
      issues.push({
        severity: "info",
        title: "Unusual particles structure",
        description: "The particles object doesn't contain expected keys (number, color, shape, size, opacity, move). Your options may be nested incorrectly.",
        fix: "Ensure your options follow the correct structure: { background, particles: { number, color, shape, size, opacity, move, links, ... }, interactivity: { ... } }",
      });
    }
  }

  // ── Low particle count ──────────────────────────────────────────
  const numParticles = getOptionValue(options, "particles.number.value");
  const densityArea = getOptionValue(options, "particles.number.density.area");
  if (numParticles !== undefined && Number(numParticles) < 30 && !densityArea) {
    issues.push({
      severity: "info",
      title: "Low particle count",
      description: `Only ${numParticles} particles configured. In a full-screen canvas this may look sparse.`,
      fix: "Increase particles.number.value to 50-100, or configure particles.number.density.area to auto-scale based on canvas size.",
    });
  }

  // ── Full-screen not set ─────────────────────────────────────────
  const fullScreen = getOptionValue(options, "fullScreen");
  if (fullScreen === undefined) {
    issues.push({
      severity: "info",
      title: "Full-screen not enabled by default in v2",
      description: "tsParticles v2 does NOT set fullScreen by default. If your container div has no explicit size, the canvas may have zero height.",
      fix: "Add fullScreen: { enable: true } to your options, or ensure your container div has explicit width and height (e.g., width: 100%; height: 100vh).",
    });
  }

  // ── Preset usage ────────────────────────────────────────────────
  const preset = getOptionValue(options, "preset");
  if (preset && typeof preset === "string") {
    issues.push({
      severity: "info",
      title: "Using a preset",
      description: `You're using the '${preset}' preset. Make sure the corresponding preset package is installed and loaded before initializing tsParticles.`,
    });
  }

  // ── Emitter shape ───────────────────────────────────────────────
  const emitterShapeType = getOptionValue(options, "emitters.shape.type");
  if (emitterShapeType) {
    const esShapeMap: Record<string, string> = {
      circle: "@tsparticles/plugin-emitters-shape-circle",
      square: "@tsparticles/plugin-emitters-shape-square",
      canvas: "@tsparticles/plugin-emitters-shape-canvas",
      path: "@tsparticles/plugin-emitters-shape-path",
      polygon: "@tsparticles/plugin-emitters-shape-polygon",
    };
    const name = String(emitterShapeType);
    const pkg = esShapeMap[name];
    if (pkg) {
      issues.push({
        severity: "info",
        title: `Emitter shape '${name}' needs package`,
        description: `Emitter shape type '${name}' requires ${pkg}. Without it, the default circle shape will be used.`,
        fix: `Install and load ${pkg}.`,
        relatedPackages: [pkg],
      });
    }
  }

  // ── Performance Warnings ────────────────────────────────────────
  if (numParticles !== undefined && Number(numParticles) > 1000) {
    issues.push({
      severity: "warning",
      title: "High particle count may affect performance",
      description: `${numParticles} particles is a lot. Consider reducing the count or enabling performance options.`,
      fix: "Set particles.number.value to a lower value (100-500), or enable particles.reduceDuplicates.",
    });
  }

  return issues;
}
