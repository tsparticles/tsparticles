import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd(),
  evidence = path.join(root, ".planning/handovers/evidence"),
  read = async (file) => JSON.parse(await readFile(file, "utf8")),
  control = await read(path.join(evidence, "e10/runtime-e6-control.json")),
  controlExtended = await read(path.join(evidence, "e10/e6-control/runtime-extended.json")),
  controlExtendedHdr = await read(path.join(evidence, "e10/e6-control/runtime-extended-hdr.json")),
  candidate = await read(path.join(evidence, "e10/runtime.json")),
  candidateExtended = await read(path.join(evidence, "e10/runtime-extended.json")),
  candidateExtendedHdr = await read(path.join(evidence, "e10/runtime-extended-hdr.json")),
  budgets = await read(path.join(evidence, "e0/runtime-budgets.json")),
  median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)],
  scenarios = [];

for (const budget of budgets.scenarios) {
  const extended = budget.scenario === "M6-extensions" || budget.scenario === "M8-hdr-layers-resize",
    controlReport = extended ? (budget.forceHdr ? controlExtendedHdr : controlExtended) : control,
    candidateReport = extended ? (budget.forceHdr ? candidateExtendedHdr : candidateExtended) : candidate,
    controlSamples = controlReport.samples.filter(
      (sample) => sample.scenario === budget.scenario && sample.count === budget.count,
    ),
    candidateSamples = candidateReport.samples.filter(
      (sample) => sample.scenario === budget.scenario && sample.count === budget.count,
    ),
    compareMetric = (controlValue, candidateValue, ceiling) => {
      const controlMedian = median(controlValue),
        candidateMedian = median(candidateValue),
        delta = candidateMedian - controlMedian;

      return {
        controlSamples: controlValue,
        candidateSamples: candidateValue,
        controlMedian,
        candidateMedian,
        delta,
        deltaPercent: controlMedian === 0 ? null : (delta / controlMedian) * 100,
        e0Ceiling: ceiling,
        candidatePassesE0Ceiling: candidateMedian <= ceiling + 1e-6,
      };
    },
    update = compareMetric(
      controlSamples.map((sample) => (extended ? sample.update.median : sample.updateMs.median)),
      candidateSamples.map((sample) => (extended ? sample.update.median : sample.updateMs.median)),
      budget.updateMedianCeilingMs,
    ),
    render = compareMetric(
      controlSamples.map((sample) => (extended ? sample.render.median : sample.renderExcludingUpdateMs.median)),
      candidateSamples.map((sample) => (extended ? sample.render.median : sample.renderExcludingUpdateMs.median)),
      budget.renderMedianCeilingMs,
    ),
    frameP95 = extended
      ? compareMetric(
          controlSamples.map((sample) => sample.frame.p95),
          candidateSamples.map((sample) => sample.frame.p95),
          budget.frameP95CeilingMs,
        )
      : undefined;

  scenarios.push({
    scenario: budget.scenario,
    count: budget.count,
    repetitions: { control: controlSamples.length, candidate: candidateSamples.length },
    status: controlSamples.length === 3 && candidateSamples.length === 3 ? "measured" : "incomplete",
    update,
    renderExcludingUpdate: render,
    frameP95,
  });
}

const result = {
  control: {
    artifact: control.control,
    measuredAt: control.measuredAt,
    browser: control.browser,
    revision: control.revision,
    note: "E6 preserved pre-E7 artifact, rerun in Chrome 158 with the same E10 harness; it is a matched same-browser control, not the E0 source revision.",
  },
  candidate: {
    measuredAt: candidate.measuredAt,
    browser: candidate.browser,
    revision: candidate.revision,
  },
  sameBrowser: control.browser === candidate.browser && controlExtended.browser === candidateExtended.browser,
  scenarios,
  complete: scenarios.every((scenario) => scenario.status === "measured"),
};

await writeFile(path.join(evidence, "e10/runtime-control-comparison.json"), JSON.stringify(result, null, 2) + "\n");
console.log(
  JSON.stringify({
    browser: `${control.browser} / ${candidate.browser}`,
    sameBrowser: result.sameBrowser,
    complete: result.complete,
    scenarios: scenarios.length,
    casesWithCandidateE0Exceedance: scenarios.filter(
      (scenario) =>
        !scenario.update.candidatePassesE0Ceiling || !scenario.renderExcludingUpdate.candidatePassesE0Ceiling,
    ).length,
  }),
);
