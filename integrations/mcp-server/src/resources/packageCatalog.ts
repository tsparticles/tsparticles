import type { PackageCategory } from "../types.js";
import { packageCatalog } from "../registry/packages.js";
import { bundles } from "../registry/bundles.js";

const CATEGORY_LABELS: Record<string, string> = {
  bundle: "Bundles (pre-composed feature sets)",
  plugin: "Plugins (core feature add-ons)",
  "interaction-external": "External Interactions (mouse/touch)",
  "interaction-particles": "Particle Interactions (particle-to-particle)",
  "interaction-light": "Light Interaction",
  updater: "Updaters (particle property animations)",
  shape: "Shapes (particle visual styles)",
  effect: "Effects (canvas overlays)",
  path: "Paths (movement generators)",
  "emitter-shape": "Emitter Shapes (emission area types)",
  color: "Color Plugins (color notation support)",
  easing: "Easing Plugins (animation curves)",
  preset: "Presets (pre-configured effects)",
};

export function getPackageCatalogResource(): string {
  const lines: string[] = [];

  lines.push("# tsParticles Package Catalog");
  lines.push("");
  lines.push(
    "Complete catalog of all tsParticles packages organized by category.",
  );
  lines.push("");

  for (const [cat, label] of Object.entries(CATEGORY_LABELS)) {
    const category = cat as PackageCategory;
    const packages = packageCatalog.byCategory[category];
    if (!packages || packages.length === 0) continue;

    lines.push(`## ${label}`);
    lines.push("");

    for (const pkg of packages) {
      const loadFunc = pkg.loadFunction
        ? `\n  - Load function: \`${pkg.loadFunction}\``
        : "";
      const b = pkg.includedInBundles.length > 0
        ? `\n  - Included in: ${pkg.includedInBundles.join(", ")}`
        : "";
      const opts = pkg.optionKeys.length > 0
        ? `\n  - Options: \`${pkg.optionKeys.join("`, `")}\``
        : "";
      const check = pkg.needsPluginCheck
        ? `\n  - Activation: ${pkg.needsPluginCheck}`
        : "";

      lines.push(`- \`${pkg.name}\``);
      lines.push(
        `  ${pkg.description}${loadFunc}${b}${opts}${check}`,
      );
    }
    lines.push("");
  }

  lines.push("## Bundle Compositions");
  lines.push("");

  for (const bundle of bundles) {
    lines.push(`### ${bundle.name}`);
    lines.push("");
    lines.push(`${bundle.description}`);
    if (bundle.extends) {
      lines.push(`- Extends: \`${bundle.extends}\``);
    }
    if (bundle.loadFunction) {
      lines.push(`- Load function: \`${bundle.loadFunction}(engine)\``);
    }
    lines.push("- Contains:");
    for (const pkg of bundle.packages) {
      lines.push(`  - \`${pkg}\``);
    }
    lines.push("");
  }

  return lines.join("\n");
}
