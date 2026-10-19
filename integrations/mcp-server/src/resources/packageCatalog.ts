import type { PackageCategory } from "../types.js";
import { bundles } from "../registry/bundles.js";
import { packageCatalog } from "../registry/packages.js";

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

/**
 *
 */
export function getPackageCatalogResource(): string {
  const lines: string[] = [
    "# tsParticles Package Catalog",
    "",
    "Complete catalog of all tsParticles packages organized by category.",
    "",
  ];

  for (const [cat, label] of Object.entries(CATEGORY_LABELS)) {
    const category = cat as PackageCategory,
      packages = packageCatalog.byCategory[category];
    if (!packages || packages.length === 0) continue; // eslint-disable-line @typescript-eslint/no-magic-numbers, @typescript-eslint/no-unnecessary-condition

    lines.push(`## ${label}`, "");

    for (const pkg of packages) {
      const loadFunc = pkg.loadFunction ? `\n  - Load function: \`${pkg.loadFunction}\`` : "",
        b = pkg.includedInBundles.length > 0 ? `\n  - Included in: ${pkg.includedInBundles.join(", ")}` : "", // eslint-disable-line @typescript-eslint/no-magic-numbers
        opts = pkg.optionKeys.length > 0 ? `\n  - Options: \`${pkg.optionKeys.join("`, `")}\`` : "", // eslint-disable-line @typescript-eslint/no-magic-numbers
        check = pkg.needsPluginCheck ? `\n  - Activation: ${pkg.needsPluginCheck}` : "";

      lines.push(`- \`${pkg.name}\``, `  ${pkg.description}${loadFunc}${b}${opts}${check}`);
    }
    lines.push("");
  }

  lines.push("## Bundle Compositions", "");

  for (const bundle of bundles) {
    lines.push(`### ${bundle.name}`, "", bundle.description);
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
