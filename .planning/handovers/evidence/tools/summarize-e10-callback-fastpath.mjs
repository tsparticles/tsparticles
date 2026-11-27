import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd(),
  evidence = path.join(root, ".planning/handovers/evidence/e10"),
  read = async (file) => JSON.parse(await readFile(path.join(evidence, file), "utf8")),
  median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)],
  budgets = JSON.parse(await readFile(path.join(root, ".planning/handovers/evidence/e0/runtime-budgets.json"), "utf8")),
  main = await read("runtime-callback-fastpath-confirmation.json"),
  extended = await read("runtime-extended-callback-fastpath-comparison.json"),
  mainKeys = [...new Set(main.samples.map((sample) => `${sample.scenario}:${sample.count}`))],
  mainRows = mainKeys.map((key) => {
    const [scenario, countText] = key.split(":"),
      count = Number(countText),
      budget = budgets.scenarios.find((row) => row.scenario === scenario && row.count === count),
      samples = main.samples.filter((row) => row.scenario === scenario && row.count === count),
      update = median(samples.map((row) => row.updateMs.median)),
      render = median(samples.map((row) => row.renderExcludingUpdateMs.median));

    if (!budget) throw new Error(`Missing E0 budget for ${scenario}/${count}`);

    return {
      scenario,
      count,
      forceHdr: false,
      repetitions: samples.length,
      update: {
        median: update,
        ceiling: budget.updateMedianCeilingMs,
        pass: update <= budget.updateMedianCeilingMs + 1e-6,
      },
      render: {
        median: render,
        ceiling: budget.renderMedianCeilingMs,
        pass: render <= budget.renderMedianCeilingMs + 1e-6,
      },
    };
  }),
  extendedRows = extended.scenarios.map((row) => ({
    scenario: row.scenario,
    count: row.count,
    forceHdr: row.forceHdr,
    repetitions: row.repetitions.candidate,
    update: {
      median: row.update.candidateMedian,
      ceiling: row.update.e0Ceiling,
      pass: row.update.candidatePassesE0Ceiling,
    },
    render: {
      median: row.render.candidateMedian,
      ceiling: row.render.e0Ceiling,
      pass: row.render.candidatePassesE0Ceiling,
    },
    frameP95: {
      median: row.frameP95.candidateMedian,
      ceiling: row.frameP95.e0Ceiling,
      pass: row.frameP95.candidatePassesE0Ceiling,
    },
  })),
  rows = [...mainRows, ...extendedRows],
  result = {
    candidate: {
      revision: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
      workingTree: true,
      bundle: main.bundle,
      browser: main.browser,
      repetitions: 9,
    },
    extendedComparison: "runtime-extended-callback-fastpath-comparison.json",
    rows,
    complete:
      mainRows.length === 18 &&
      extendedRows.length === 12 &&
      rows.every((row) => row.repetitions === 9 && row.update.pass && row.render.pass && (row.frameP95?.pass ?? true)),
    passing: rows.filter((row) => row.update.pass && row.render.pass && (row.frameP95?.pass ?? true)).length,
    failing: rows.filter((row) => !row.update.pass || !row.render.pass || row.frameP95?.pass === false).length,
  };

await writeFile(path.join(evidence, "budget-screen-callback-fastpath.json"), `${JSON.stringify(result, null, 2)}\n`);
console.log(
  JSON.stringify({ complete: result.complete, rows: rows.length, passing: result.passing, failing: result.failing }),
);
