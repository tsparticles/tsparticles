import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { performance } from "node:perf_hooks";

const file = path.resolve("engine/dist/esm/Core/Rendering/RenderManager.js"),
  original = await readFile(".planning/handovers/evidence/e7/baseline/RenderManager.js", "utf8"),
  numeric = original
    .replace(
      "const fColorIndex = 0,",
      'const drawLayers = Object.values(DrawLayer).filter(layer => typeof layer === "number"), fColorIndex = 0,',
    )
    .replaceAll("Object.values(DrawLayer)", "drawLayers")
    .replace("const drawLayers = drawLayers.filter", "const drawLayers = Object.values(DrawLayer).filter");
assert.notEqual(original, numeric);
const start = numeric.indexOf("    clear() {"),
  end = numeric.indexOf("\n    destroy()", start),
  method = numeric.slice(start, end),
  pooled =
    numeric.slice(0, start) +
    method
      .replace("const visited = new Set();", "const visited = this.e7Pool?.pop() ?? new Set(); try {")
      .replace(/\n    }\s*$/, "\n } finally { visited.clear(); (this.e7Pool ??= []).push(visited); }\n    }\n") +
    numeric.slice(end),
  variants = { original, numeric, pooled },
  classes = {};
for (const [name, source] of Object.entries(variants)) {
  const resolved = source.replace(
    /from "(\.[^"]+)"/g,
    (_match, specifier) => `from "${pathToFileURL(path.resolve(path.dirname(file), specifier)).href}"`,
  );
  classes[name] = (
    await import(`data:text/javascript;base64,${Buffer.from(resolved).toString("base64")}#${name}`)
  ).RenderManager;
}
const samples = [],
  count = 200000,
  repetitions = 9;
for (const scenario of ["empty", "dedicated-true", "multi-layer-false", "late-clear"]) {
  let expected;
  for (let repetition = 0; repetition < repetitions; repetition++) {
    const names = Object.keys(classes);
    if (repetition % 2) names.reverse();
    for (const name of names) {
      let hooks = 0,
        clears = 0;
      const plugin = {
          canvasPaint: () => false,
          drawSettingsSetup: () => undefined,
          draw: () => undefined,
          clearDraw: () => undefined,
        },
        clear = () => {
          hooks++;
          return scenario === "dedicated-true";
        },
        plugins = scenario === "empty" ? [] : [plugin];
      if (scenario !== "late-clear") plugin.canvasClear = clear;
      const render = new classes[name](
        {},
        { actualOptions: { clear: true }, plugins },
        { size: { width: 800, height: 600 } },
      );
      render.setContext({
        clearRect: () => {
          clears++;
        },
      });
      render.initPlugins();
      if (scenario === "late-clear") plugin.canvasClear = clear;
      for (let i = 0; i < 20000; i++) render.clear();
      hooks = clears = 0;
      const start = performance.now();
      for (let i = 0; i < count; i++) render.clear();
      const elapsedMs = performance.now() - start;
      expected ??= { hooks, clears };
      assert.deepEqual({ hooks, clears }, expected);
      if (render.e7Pool) assert.ok(render.e7Pool.every((set) => set.size === 0));
      samples.push({
        scenario,
        repetition,
        name,
        calls: count,
        elapsedMs,
        nsPerCall: (elapsedMs * 1e6) / count,
        hooks,
        clears,
      });
    }
  }
}
const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)],
  summary = [...new Set(samples.map((s) => s.scenario))].map((scenario) => ({
    scenario,
    variants: Object.fromEntries(
      Object.keys(classes).map((name) => [
        name,
        median(samples.filter((s) => s.scenario === scenario && s.name === name).map((s) => s.nsPerCall)),
      ]),
    ),
  })),
  report = {
    node: process.version,
    sourceSha256: createHash("sha256").update(original).digest("hex"),
    repetitions,
    count,
    warmupCalls: 20000,
    samples,
    summary,
    allocationModel: {
      original: "one Set plus enum values array per clear",
      numeric: "one Set per clear; layer array once per module",
      pooled: "one Set per concurrent depth plus pool array; released in finally",
    },
    limitations: [
      "Node microbenchmark of the actual compiled RenderManager; not browser frame timings or measured allocation bytes.",
      "Pooled variant is an experiment only; dynamic fields replace prospective private fields.",
    ],
  };
await writeFile(
  process.argv[2] ?? ".planning/handovers/evidence/e7/clear-candidates.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(JSON.stringify(summary, null, 2));
