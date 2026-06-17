import { bundles } from "../registry/bundles.js";

export function getBundlesGuideResource(): string {
  const lines: string[] = [];

  lines.push("# tsParticles Bundle Guide");
  lines.push("");
  lines.push(
    "Bundles are pre-composed feature sets that load multiple plugins at once. Choose the right bundle for your project.",
  );
  lines.push("");

  lines.push("## Bundle Selection Guide");
  lines.push("");
  lines.push(
    "- **@tsparticles/basic**: Minimal setup. Use for simple animations with circles only.",
  );
  lines.push(
    "- **@tsparticles/slim**: Standard setup. Use for most projects with interactivity, links, multiple shapes.",
  );
  lines.push(
    "- **@tsparticles/full**: Advanced setup. Use when you need absorbers, emitters, drag, extra effects.",
  );
  lines.push(
    "- **@tsparticles/all**: Maximum setup. Use when you want everything available.",
  );
  lines.push(
    "- **@tsparticles/confetti**: Confetti effects. Use for celebration/party animations.",
  );
  lines.push(
    "- **@tsparticles/fireworks**: Fireworks effects. Use for pyrotechnic animations.",
  );
  lines.push(
    "- **@tsparticles/particles**: General particles. Lightweight with links and collisions.",
  );
  lines.push(
    "- **@tsparticles/ribbons**: Ribbon/trail effects. Use for flowing ribbon animations.",
  );
  lines.push("");

  lines.push("## Bundle Hierarchy");
  lines.push("");
  lines.push("```");
  lines.push("@tsparticles/basic");
  lines.push("    │");
  lines.push("    ▼");
  lines.push("@tsparticles/slim     (basic + interactivity + more shapes/updaters)");
  lines.push("    │");
  lines.push("    ▼");
  lines.push("@tsparticles/full     (slim + absorbers + emitters + more)");
  lines.push("    │");
  lines.push("    ▼");
  lines.push("@tsparticles/all      (full + everything else)");
  lines.push("");
  lines.push("Also available (standalone, each extends basic):");
  lines.push("- @tsparticles/confetti");
  lines.push("- @tsparticles/fireworks");
  lines.push("- @tsparticles/particles");
  lines.push("- @tsparticles/ribbons");
  lines.push("```");
  lines.push("");

  lines.push("## Bundle Details");
  lines.push("");

  for (const bundle of bundles) {
    lines.push(`### ${bundle.name}`);
    lines.push("");
    lines.push(`**Description:** ${bundle.description}`);
    if (bundle.extends) {
      lines.push(`**Extends:** \`${bundle.extends}\``);
    }
    if (bundle.loadFunction) {
      lines.push(`**Load function:** \`${bundle.loadFunction}(engine)\``);
    }

    const importLines: string[] = [];
    if (bundle.loadFunction) {
      importLines.push(
        `import { ${bundle.loadFunction} } from "${bundle.name}";`,
      );
    } else {
      importLines.push(`import "${bundle.name}";`);
    }

    lines.push("**Import:**");
    for (const imp of importLines) {
      lines.push(`  \`${imp}\``);
    }
    lines.push("**Usage:**");
    lines.push("  ```typescript");
    lines.push(`  import { tsParticles } from "@tsparticles/engine";`);
    for (const imp of importLines) {
      lines.push(`  ${imp}`);
    }
    lines.push("");
    if (bundle.loadFunction) {
      lines.push(`  await ${bundle.loadFunction}(tsParticles);`);
    }
    lines.push("  ```");
    lines.push("");
  }

  return lines.join("\n");
}
