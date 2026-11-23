import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { gzipSync, brotliCompressSync, gunzipSync, constants } from "node:zlib";
import { createHash } from "node:crypto";
const root = ".planning/handovers/evidence/e7/",
  read = async (path) => JSON.parse(await readFile(path, "utf8")),
  median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)],
  screen = (before, after) => ({
    baseline: before,
    candidate: after,
    delta: after - before,
    allowanceMs: Math.max(before * 1.1, before + 0.1),
    pass: after <= Math.max(before * 1.1, before + 0.1) + 1e-6,
  });
const contracts = await Promise.all(
    ["baseline", "candidate"].map((v) => read(root + "contracts-" + v + "/results.json")),
  ),
  rows = [];
assert.equal(contracts[0].browser, contracts[1].browser);
assert.equal(contracts[0].results.length, 12);
assert.equal(contracts[1].results.length, 12);
for (let i = 0; i < 12; i++) {
  const [b, c] = contracts.map((r) => r.results[i]);
  for (const key of [
    "mode",
    "repetition",
    "attributes",
    "hdr",
    "failedRequests",
    "backgrounds",
    "updater",
    "randomCalls",
    "pixelSha256",
    "mediaCount",
    "observers",
    "transfers",
    "imageBytes",
    "resize",
  ])
    assert.deepEqual(c[key], b[key], `${c.mode} ${key}`);
  rows.push({
    mode: c.mode,
    repetition: c.repetition,
    pixelSha256: c.pixelSha256,
    fullSurfacePixelsMatch: true,
    attributes: c.attributes,
  });
}
assert.deepEqual(contracts[1].worker, { count: 5, remaining: 0 });
const phases = ["factoryAndLoadersMs", "pairInitializationMs", "resizeMs", "redrawMs", "refreshMs", "teardownMs"],
  phaseSummary = ["natural", "forced-hdr", "fallback", "trail"].map((mode) => ({
    mode,
    phaseMs: Object.fromEntries(
      phases.map((metric) => [
        metric,
        Object.fromEntries(
          ["baseline", "candidate"].map((variant, index) => {
            const samples = contracts[index].results.filter((r) => r.mode === mode).map((r) => r.phaseMs[metric]);
            return [variant, { median: median(samples), min: Math.min(...samples), max: Math.max(...samples) }];
          }),
        ),
      ]),
    ),
  }));
await writeFile(
  root + "browser-contract-comparison.json",
  JSON.stringify(
    {
      browser: contracts[1].browser,
      rows,
      allParityChecksPass: true,
      baselineWorkerError: contracts[0].worker.error,
      candidateWorker: contracts[1].worker,
      phaseSummary,
    },
    null,
    2,
  ) + "\n",
);
const extended = [];
for (const hdr of [false, true]) {
  const name = hdr ? "runtime-extended-hdr.json" : "runtime-extended.json",
    [b, c] = await Promise.all(["baseline", "candidate"].map((v) => read(root + "extended-" + v + "/" + name)));
  assert.equal(c.browser, b.browser);
  assert.equal(c.samples.length, 18);
  assert.deepEqual(c.errors, []);
  for (let i = 0; i < 18; i++)
    for (const key of [
      "scenario",
      "count",
      "cycle",
      "resized",
      "contextAttributes",
      "countAfterTicks",
      "finalCount",
      "backgroundDraws",
      "randomCalls",
      "remainingContainers",
    ])
      assert.deepEqual(c.samples[i][key], b.samples[i][key], `extended ${hdr} ${i} ${key}`);
  for (const report of [b, c]) {
    for (const [key, value] of Object.entries(report.validations)) {
      if (key === "rngStable") assert.ok(Object.values(value).every(Boolean));
      else assert.equal(value, true, key);
    }
    for (const snapshot of [report.before, report.after, ...report.retention])
      assert.ok(
        Object.values(snapshot.mediaListeners).every((n) => n === 0),
        "media cleanup",
      );
  }
  const metrics = [];
  for (const scenario of ["M6-extensions", "M8-hdr-layers-resize"])
    for (const count of [100, 500, 1000]) {
      const groups = [b, c].map((r) => r.samples.filter((s) => s.scenario === scenario && s.count === count));
      metrics.push({
        scenario,
        count,
        update: screen(...groups.map((g) => median(g.map((s) => s.update.median)))),
        render: screen(...groups.map((g) => median(g.map((s) => s.render.median)))),
        frameP95: screen(...groups.map((g) => median(g.map((s) => s.frame.p95)))),
        phases: Object.fromEntries(
          ["initMs", "resizeMs", "teardownMs"].map((key) => [
            key,
            Object.fromEntries(
              ["baseline", "candidate"].map((name, i) => [
                name,
                { median: median(groups[i].map((s) => s[key])), samples: groups[i].map((s) => s[key]) },
              ]),
            ),
          ]),
        ),
      });
    }
  const drift = Math.max(0, c.retention.at(-1).heap.usedSize - c.after.heap.usedSize);
  assert.ok(drift <= 1048576, "post-peak heap drift");
  extended.push({
    hdr,
    matchingSamples: 18,
    metrics,
    postPeakHeapDriftBytes: drift,
    heapAfterWorkloads: c.after.heap.usedSize,
    retentionHeaps: c.retention.map((s) => s.heap.usedSize),
    validations: c.validations,
  });
}
await writeFile(root + "extended-comparison.json", JSON.stringify({ extended }, null, 2) + "\n");
const [basePayload, candidatePayload] = await Promise.all(
    ["baseline", "candidate"].map((v) => read(root + "payloads-" + v + "/bundle-sizes.json")),
  ),
  consumers = candidatePayload.consumers.map((c) => {
    const b = basePayload.consumers.find((b) => b.name === c.name && b.condition === c.condition);
    assert.ok(b);
    const delta = Object.fromEntries(["raw", "gzip", "brotli"].map((key) => [key, c.minTotal[key] - b.minTotal[key]]));
    if (c.name === "helper") assert.deepEqual(delta, { raw: 0, gzip: 0, brotli: 0 });
    return {
      name: c.name,
      condition: c.condition,
      baseline: b.minTotal,
      candidate: c.minTotal,
      delta,
      chunks: [b.minChunks.length, c.minChunks.length],
      modules: c.minChunks.flatMap((s) => s.modules),
    };
  });
const sizes = (bytes) => ({
    raw: bytes.length,
    gzip: gzipSync(bytes, { level: 9 }).length,
    brotli: brotliCompressSync(bytes, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }).length,
    sha256: createHash("sha256").update(bytes).digest("hex"),
  }),
  bundle = [];
for (const file of [".planning/handovers/evidence/e6/draw-all.bundle.min.js.gz", root + "final-all.bundle.min.js.gz"])
  bundle.push(sizes(gunzipSync(await readFile(file))));
await writeFile(
  root + "payload-comparison.json",
  JSON.stringify(
    {
      compression: { gzipLevel: 9, brotliQuality: 11 },
      consumers,
      allStandalone: {
        baseline: bundle[0],
        candidate: bundle[1],
        delta: Object.fromEntries(["raw", "gzip", "brotli"].map((key) => [key, bundle[1][key] - bundle[0][key]])),
      },
      limitations: [
        "Consumer E6 baseline uses archived source overrides for every changed runtime module on the same final graph/toolchain.",
        "Standalone E6 comparison uses the accepted archived artifact.",
        "Existing E5 bundle exception remains E10; these deltas do not waive original release budgets.",
      ],
    },
    null,
    2,
  ) + "\n",
);
const profile = await read(root + "browser-candidate.json"),
  budgets = await read(".planning/handovers/evidence/e0/runtime-budgets.json"),
  checks = [];
for (const row of profile.summary) {
  const budget = budgets.scenarios.find((s) => s.scenario === row.scenario && s.count === row.count);
  for (const [metric, budgetKey] of [
    ["updateMedianMs", "updateMedianCeilingMs"],
    ["drawMedianMs", "renderMedianCeilingMs"],
  ]) {
    assert.ok(budget);
    checks.push({
      scenario: row.scenario,
      count: row.count,
      metric,
      value: row[metric],
      ceiling: budget[budgetKey],
      pass: row[metric] <= budget[budgetKey] + 1e-6,
    });
  }
}
await writeFile(
  root + "budget-screen.json",
  JSON.stringify(
    {
      browser: profile.browser,
      originalBaselineBrowser: "Chrome/157.0.8103.52",
      checks,
      policy:
        "Frozen E0 ceilings; browser changed to Chrome 158, so retain the matched fresh E6 control. No new waiver.",
    },
    null,
    2,
  ) + "\n",
);
console.log(
  JSON.stringify(
    {
      contractSnapshots: rows.length,
      extendedFlags: extended.map((r) => ({
        hdr: r.hdr,
        flags: r.metrics.filter((s) => !s.update.pass || !s.render.pass || !s.frameP95.pass),
        heapDrift: r.postPeakHeapDriftBytes,
      })),
      absoluteFlags: checks.filter((r) => !r.pass),
      allDelta: bundle[1].gzip - bundle[0].gzip,
    },
    null,
    2,
  ),
);
