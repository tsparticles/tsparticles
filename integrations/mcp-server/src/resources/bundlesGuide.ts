import { bundles } from "../registry/bundles.js";

/**
 * @returns A markdown-formatted string containing the tsParticles bundle guide.
 */
export function getBundlesGuideResource(): string {
  const lines: string[] = [];

  lines.push(
    "# tsParticles Bundle Guide",
    "",
    "Bundles are pre-composed feature sets that load multiple plugins at once. Choose the right bundle for your project.",
    "",
    "## Bundle Selection Guide",
    "",
    "- **@tsparticles/basic**: Minimal setup. Use for simple animations with circles only.",
    "- **@tsparticles/slim**: Standard setup. Use for most projects with interactivity, links, multiple shapes.",
    "- **tsparticles**: Full setup. Use when you need absorbers, emitters, drag, extra effects.",
    "- **@tsparticles/all**: Maximum setup. Use when you want everything available.",
    "- **@tsparticles/confetti**: Confetti effects. Use for celebration/party animations.",
    "- **@tsparticles/fireworks**: Fireworks effects. Use for pyrotechnic animations.",
    "- **@tsparticles/particles**: General particles. Lightweight with links and collisions.",
    "- **@tsparticles/ribbons**: Ribbon/trail effects. Use for flowing ribbon animations.",
    "- **@tsparticles/pjs**: particles.js compatibility layer. Migrate existing particles.js projects.",
    "",
    "## Bundle Hierarchy",
    "",
    "```",
    "@tsparticles/basic",
    "    │",
    "    ▼",
    "@tsparticles/slim     (basic + interactivity + more shapes/updaters)",
    "    │",
    "    ▼",
    "tsparticles           (slim + absorbers + emitters + more)",
    "    │",
    "    ├──────────────┐",
    "    ▼              ▼",
    "@tsparticles/all  @tsparticles/pjs",
    "    (everything)  (particles.js compat)",
    "",
    "Also available (standalone, each extends basic):",
    "- @tsparticles/confetti",
    "- @tsparticles/fireworks",
    "- @tsparticles/particles",
    "- @tsparticles/ribbons",
    "```",
    "",
    "## Bundle Details",
    "",
  );

  for (const bundle of bundles) {
    lines.push(`### ${bundle.name}`, "", `**Description:** ${bundle.description}`);

    if (bundle.extends) {
      lines.push(`**Extends:** \`${bundle.extends}\``);
    }

    if (bundle.loadFunction) {
      lines.push(`**Load function:** \`${bundle.loadFunction}(engine)\``);
    }

    const imp = bundle.loadFunction
      ? `import { ${bundle.loadFunction} } from "${bundle.name}";`
      : `import "${bundle.name}";`;

    lines.push("**Import:**", `  \`${imp}\``);

    lines.push("**Usage:**", "  ```typescript", `  import { tsParticles } from "@tsparticles/engine";`, `  ${imp}`, "");

    if (bundle.loadFunction) {
      lines.push(`  await ${bundle.loadFunction}(tsParticles);`);
    }

    lines.push("  ```", "");
  }

  return lines.join("\n");
}
