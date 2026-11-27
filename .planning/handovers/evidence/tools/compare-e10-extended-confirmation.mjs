import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd(),
  evidence = path.join(root, ".planning/handovers/evidence/e10"),
  args = new Map(
    process.argv.slice(2).map((arg) => {
      const [key, ...value] = arg.slice(2).split("=");

      return [key, value.join("=")];
    }),
  ),
  read = async (file) => JSON.parse(await readFile(file, "utf8")),
  candidateSdr = await read(
    path.resolve(args.get("candidate-sdr") ?? path.join(evidence, "runtime-extended-e10-confirmation.json")),
  ),
  candidateHdr = await read(
    path.resolve(args.get("candidate-hdr") ?? path.join(evidence, "runtime-extended-hdr-e10-confirmation.json")),
  ),
  controlSdr = await read(path.join(evidence, "e6-control/runtime-extended-e6-confirmation.json")),
  controlHdr = await read(path.join(evidence, "e6-control/runtime-extended-hdr-e6-confirmation.json")),
  budgets = await read(path.join(root, ".planning/handovers/evidence/e0/runtime-budgets.json")),
  median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)],
  rows = [];

for (const budget of budgets.scenarios.filter(
  (row) => row.scenario === "M6-extensions" || row.scenario === "M8-hdr-layers-resize",
)) {
  const controlReport = budget.forceHdr ? controlHdr : controlSdr,
    candidateReport = budget.forceHdr ? candidateHdr : candidateSdr,
    controlSamples = controlReport.samples.filter(
      (row) => row.scenario === budget.scenario && row.count === budget.count,
    ),
    candidateSamples = candidateReport.samples.filter(
      (row) => row.scenario === budget.scenario && row.count === budget.count,
    ),
    compareMetric = (key, value, ceiling) => {
      const controlValues = controlSamples.map((row) => row[key][value]),
        candidateValues = candidateSamples.map((row) => row[key][value]),
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
    },
    frameP95 = (() => {
      const controlValues = controlSamples.map((row) => row.frame.p95),
        candidateValues = candidateSamples.map((row) => row.frame.p95),
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
        e0Ceiling: budget.frameP95CeilingMs,
        candidatePassesE0Ceiling: candidateMedian <= budget.frameP95CeilingMs + 1e-6,
      };
    })();

  rows.push({
    scenario: budget.scenario,
    count: budget.count,
    forceHdr: budget.forceHdr ?? false,
    repetitions: { control: controlSamples.length, candidate: candidateSamples.length },
    status: controlSamples.length === 9 && candidateSamples.length === 9 ? "measured" : "incomplete",
    update: compareMetric("update", "median", budget.updateMedianCeilingMs),
    render: compareMetric("render", "median", budget.renderMedianCeilingMs),
    frameP95,
  });
}

const browsers = [controlSdr.browser, controlHdr.browser, candidateSdr.browser, candidateHdr.browser],
  result = {
    control: { browser: controlSdr.browser, revision: controlSdr.revision, bundle: controlSdr.bundlePath },
    candidate: { browser: candidateSdr.browser, revision: candidateSdr.revision, bundle: candidateSdr.bundlePath },
    sameBrowser: new Set(browsers).size === 1,
    scenarios: rows,
    complete: new Set(browsers).size === 1 && rows.length === 12 && rows.every((row) => row.status === "measured"),
  },
  outputPath = path.resolve(args.get("output") ?? path.join(evidence, "runtime-extended-confirmation-comparison.json"));

await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(
  JSON.stringify({
    browser: controlSdr.browser,
    sameBrowser: result.sameBrowser,
    complete: result.complete,
    scenarios: rows.length,
    candidateE0Failures: rows.filter(
      (row) =>
        !row.update.candidatePassesE0Ceiling ||
        !row.render.candidatePassesE0Ceiling ||
        !row.frameP95.candidatePassesE0Ceiling,
    ).length,
  }),
);
