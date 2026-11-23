import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";

const [baselinePath, candidatePath, outputPath] = process.argv.slice(2);
assert.ok(baselinePath && candidatePath && outputPath, "Expected baseline, candidate and output JSON paths");
const [baseline, candidate] = await Promise.all(
  [baselinePath, candidatePath].map(async (file) => JSON.parse(await readFile(file, "utf8"))),
);
for (const key of ["browser", "seed", "repetitions", "warmupTicks", "measuredTicks", "samplingIntervalBytes"]) {
  assert.equal(candidate[key], baseline[key], `${key} must match`);
}
assert.deepEqual(baseline.errors, []);
assert.deepEqual(candidate.errors, []);
assert.equal(candidate.samples.length, baseline.samples.length);
const mismatches = [];
for (const sample of candidate.samples) {
  const previous = baseline.samples.find(
    (old) => old.scenario === sample.scenario && old.count === sample.count && old.repetition === sample.repetition,
  );
  assert.ok(previous, "Missing matching sample");
  for (const phase of ["initialScene", "warmScene", "measuredScene"]) {
    if (JSON.stringify(sample[phase]) !== JSON.stringify(previous[phase])) {
      mismatches.push({
        scenario: sample.scenario,
        count: sample.count,
        repetition: sample.repetition,
        phase,
        baseline: previous[phase],
        candidate: sample[phase],
      });
    }
  }
}
const metrics = [
  "initializationMs",
  "retainedBytesPerParticle",
  "updateMedianMs",
  "drawMedianMs",
  "frameP95Ms",
  "updateSampledBytesPerTick",
  "frameSampledBytesPerTick",
];
const scenarios = candidate.summary.map((sample) => {
  const previous = baseline.summary.find((old) => old.scenario === sample.scenario && old.count === sample.count);
  assert.ok(previous);
  return {
    scenario: sample.scenario,
    count: sample.count,
    metrics: Object.fromEntries(
      metrics.map((metric) => [
        metric,
        {
          baseline: previous[metric],
          candidate: sample[metric],
          delta: sample[metric] - previous[metric],
          ratio: previous[metric] ? sample[metric] / previous[metric] : null,
          ...(["updateMedianMs", "drawMedianMs", "frameP95Ms"].includes(metric)
            ? {
                allowanceMs: Math.max(previous[metric] * 1.1, previous[metric] + 0.1),
                withinAllowance: sample[metric] <= Math.max(previous[metric] * 1.1, previous[metric] + 0.1) + 1e-6,
              }
            : {}),
        },
      ]),
    ),
  };
});
const report = {
  baselinePath,
  candidatePath,
  browser: candidate.browser,
  baselineBundleSha256: baseline.bundleSha256,
  candidateBundleSha256: candidate.bundleSha256,
  sceneSnapshotsCompared: candidate.samples.length * 3,
  sceneMismatches: mismatches,
  comparable: mismatches.length === 0,
  timingPolicy: `Median across ${candidate.repetitions} repetitions; screening allowance is max(baseline * 1.10, baseline + 0.1 ms), with 1e-6 ms roundoff tolerance. This comparison does not waive E0 ceilings.`,
  scenarios,
};
await writeFile(outputPath, JSON.stringify(report, null, 2) + "\n");
assert.deepEqual(mismatches, [], "Scene geometry, link counts and RNG must match before timing attribution");
console.log(
  JSON.stringify(
    {
      sceneSnapshotsCompared: report.sceneSnapshotsCompared,
      overAllowance: scenarios.filter((row) =>
        Object.values(row.metrics).some((metric) => metric.withinAllowance === false),
      ),
    },
    null,
    2,
  ),
);
