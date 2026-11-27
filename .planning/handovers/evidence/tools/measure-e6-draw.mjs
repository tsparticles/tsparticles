import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { pathToFileURL } from "node:url";

const sourcePath = "engine/src/Core/Particles/ParticlesManager.ts",
  sources = {
    live: await readFile(".planning/handovers/evidence/e6/draw-baseline/ParticlesManager.ts", "utf8"),
    snapshot: await readFile(sourcePath, "utf8"),
  },
  variants = {},
  delta = { value: 1000 / 60, factor: 1 };

for (const [name, source] of Object.entries(sources)) {
  const instrumented = source.replace(
      "export class ParticlesManager {",
      `export class ParticlesManager {
    e6Seed(particles: Particle[]): void { this.#array = particles; for (const p of particles) this.#insertParticleIntoBucket(p); }
    e6RetainedReferences(): number { ${name === "snapshot" ? "return this.#drawSnapshots.reduce((n, s) => n + s.particles.filter(p => p !== undefined).length, 0);" : "return 0;"} }
  `,
    ),
    js = stripTypeScriptTypes(instrumented).replace(
      /from "(\.[^"]+)"/g,
      (_, specifier) =>
        `from ${JSON.stringify(pathToFileURL(path.resolve(path.dirname(sourcePath), specifier).replace("/engine/src/", "/engine/dist/esm/")).href)}`,
    ),
    module = await import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
  variants[name] = module.ParticlesManager;
}

const results = [],
  median = (values) => values.toSorted((a, b) => a - b)[Math.floor(values.length / 2)];
for (const count of [100, 500, 1000, 5000]) {
  const calls = { live: 0, snapshot: 0 },
    managers = Object.fromEntries(
      Object.entries(variants).map(([name, Manager]) => {
        const manager = new Manager({}, { zLayers: 100 }),
          particles = Array.from({ length: count }, (_, id) => ({
            id,
            position: { z: id % 100 },
            draw: () => {
              calls[name]++;
            },
          }));
        manager.e6Seed(particles);
        return [name, manager];
      }),
    ),
    samples = { live: [], snapshot: [] },
    cycles = Math.max(200, Math.floor(1_000_000 / count));
  for (let round = -3; round < 15; round++) {
    const names = Object.keys(managers);
    if (round % 2) names.reverse();
    for (const name of names) {
      const start = performance.now();
      for (let frame = 0; frame < cycles; frame++) managers[name].drawParticles(delta);
      if (round >= 0) samples[name].push((performance.now() - start) / cycles);
    }
  }
  assert.equal(calls.live, calls.snapshot);
  assert.equal(managers.snapshot.e6RetainedReferences(), 0);
  results.push({
    count,
    cycles,
    samples,
    medianMs: Object.fromEntries(Object.entries(samples).map(([k, v]) => [k, median(v)])),
    retainedParticleReferencesAfterDraw: managers.snapshot.e6RetainedReferences(),
  });
}
const report = {
  node: process.version,
  sourceHashes: Object.fromEntries(
    Object.entries(sources).map(([name, source]) => [name, createHash("sha256").update(source).digest("hex")]),
  ),
  results,
  limitations: [
    "Synthetic real-manager traversal with no-op drawers; not browser frame acceptance.",
    "Three warmups, fifteen alternating samples; owner-local snapshot buffers are reused.",
    "Reference inspection is diagnostic-only instrumentation, absent from production.",
  ],
};
await writeFile(
  process.argv[2] ?? ".planning/handovers/evidence/e6/draw-traversal.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(
  JSON.stringify(
    results.map(({ count, medianMs, retainedParticleReferencesAfterDraw }) => ({
      count,
      medianMs,
      retainedParticleReferencesAfterDraw,
    })),
    null,
    2,
  ),
);
