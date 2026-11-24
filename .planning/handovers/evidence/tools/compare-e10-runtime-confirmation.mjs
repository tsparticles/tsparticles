import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd(),
  evidence = path.join(root, ".planning/handovers/evidence/e10"),
  read = async (file) => JSON.parse(await readFile(file, "utf8")),
  control = await read(path.join(evidence, "runtime-e6-confirmation.json")),
  candidate = await read(path.join(evidence, "runtime-e10-confirmation.json")),
  budgets = await read(path.join(root, ".planning/handovers/evidence/e0/runtime-budgets.json")),
  scenarios = [],
  median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];

for (const candidateRow of candidate.samples) {
  if (scenarios.some((row) => row.scenario === candidateRow.scenario && row.count === candidateRow.count)) continue;

  const controlSamples = control.samples.filter(
      (row) => row.scenario === candidateRow.scenario && row.count === candidateRow.count,
    ),
    candidateSamples = candidate.samples.filter(
      (row) => row.scenario === candidateRow.scenario && row.count === candidateRow.count,
    ),
    budget = budgets.scenarios.find(
      (row) => row.scenario === candidateRow.scenario && row.count === candidateRow.count,
    ),
    compareMetric = (key, ceiling) => {
      const controlValues = controlSamples.map((row) => row[key].median),
        candidateValues = candidateSamples.map((row) => row[key].median),
        controlMedian = median(controlValues),
        candidateMedian = median(candidateValues),
        delta = candidateMedian - controlMedian;

      return {
        controlSamples: controlValues,
        candidateSamples: candidateValues,
        controlMedian,
        candidateMedian,
        delta,
        deltaPercent: controlMedian === 0 ? null : (delta / controlMedian) * 100,
        e0Ceiling: ceiling,
        candidatePassesE0Ceiling: candidateMedian <= ceiling + 1e-6,
      };
    };

  if (!budget) throw new Error(`Missing E0 budget for ${candidateRow.scenario}/${candidateRow.count}`);

  scenarios.push({
    scenario: candidateRow.scenario,
    count: candidateRow.count,
    repetitions: { control: controlSamples.length, candidate: candidateSamples.length },
    status: controlSamples.length === 9 && candidateSamples.length === 9 ? "measured" : "incomplete",
    update: compareMetric("updateMs", budget.updateMedianCeilingMs),
    renderExcludingUpdate: compareMetric("renderExcludingUpdateMs", budget.renderMedianCeilingMs),
  });
}

const result = {
  control: {
    bundle: control.bundle,
    measuredAt: control.measuredAt,
    browser: control.browser,
    revision: control.revision,
  },
  candidate: {
    bundle: candidate.bundle,
    measuredAt: candidate.measuredAt,
    browser: candidate.browser,
    revision: candidate.revision,
  },
  sameBrowser: control.browser === candidate.browser,
  scenarios,
  complete:
    control.browser === candidate.browser &&
    scenarios.length === 7 &&
    scenarios.every((row) => row.status === "measured"),
};

await writeFile(path.join(evidence, "runtime-confirmation-comparison.json"), `${JSON.stringify(result, null, 2)}\n`);
console.log(
  JSON.stringify({
    browser: control.browser,
    sameBrowser: result.sameBrowser,
    complete: result.complete,
    scenarios: scenarios.length,
    candidateE0Failures: scenarios.filter(
      (row) => !row.update.candidatePassesE0Ceiling || !row.renderExcludingUpdate.candidatePassesE0Ceiling,
    ).length,
  }),
);
