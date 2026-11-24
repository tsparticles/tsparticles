import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd(),
  evidence = path.join(root, ".planning/handovers/evidence"),
  e0 = path.join(evidence, "e0"),
  e10 = path.join(evidence, "e10"),
  read = async (file) => JSON.parse(await readFile(file, "utf8")),
  median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)],
  bundleBudgets = await read(path.join(e0, "budgets.json")),
  originalBundles = await read(path.join(e0, "bundle-sizes.json")),
  candidateBundles = await read(path.join(e10, "bundle-sizes.json")),
  originalPackage = await read(path.join(e0, "installed-package.json")),
  candidatePackage = await read(path.join(e10, "installed-package.json")),
  runtimeControl = await read(path.join(e10, "runtime-control-comparison.json")),
  cdnCandidate = await read(path.join(e10, "cdn-candidate.json")),
  bundleRows = [];

for (const budget of bundleBudgets.budgets) {
  let original, candidate, source;

  if (budget.scenario === "cdn-minimal-page") {
    const originalCdn = await read(path.join(e0, "cdn-candidate.json"));

    original = originalCdn.total;
    candidate = cdnCandidate.total;
    source = "cdn-candidate.json";
  } else if (budget.scenario.startsWith("cjs-")) {
    const acquisition = (packageData, subpath) => packageData.cjs.acquisitions.find((row) => row.subpath === subpath),
      cjsTargets = {
        "cjs-root-acquisition": (packageData) => acquisition(packageData, ""),
        "cjs-lazy-acquisition": (packageData) => acquisition(packageData, "/lazy"),
        "cjs-full-shipped": (packageData) => packageData.cjs.full,
      },
      getTarget = cjsTargets[budget.scenario];

    if (getTarget) {
      original = getTarget(originalPackage)?.min;
      candidate = getTarget(candidatePackage)?.min;
      source = `installed-package.json:${budget.scenario}`;
    }

    if (!original || !candidate) {
      bundleRows.push({ scenario: budget.scenario, status: "pending" });

      continue;
    }
  } else {
    const candidateName =
        budget.scenario === "singleton"
          ? "factory"
          : budget.scenario === "singleton-lazy"
            ? "factory-lazy"
            : budget.scenario,
      consumer = candidateBundles.consumers.find(
        (row) => row.name === candidateName && row.condition === budget.condition,
      ),
      distribution = candidateBundles.distributions.find((row) => row.file === budget.scenario);

    if (consumer) {
      original = originalBundles.consumers.find(
        (row) => row.name === budget.scenario && row.condition === budget.condition,
      )?.minTotal;
      candidate = consumer.minTotal;
      source = `consumer:${budget.condition}/${candidateName}`;
    } else if (distribution) {
      original = originalBundles.distributions.find((row) => row.file === budget.scenario);
      candidate = distribution;
      source = `distribution:${budget.scenario}`;
    }
  }

  if (!original || !candidate) {
    bundleRows.push({ scenario: budget.scenario, condition: budget.condition, status: "pending" });

    continue;
  }

  const metrics = Object.fromEntries(
    ["gzip", "brotli"].map((key) => [
      key,
      {
        original: original[key],
        candidate: candidate[key],
        deltaBytes: candidate[key] - original[key],
        deltaPercent: ((candidate[key] - original[key]) / original[key]) * 100,
        ceiling: budget[key],
        pass: candidate[key] <= budget[key],
      },
    ]),
  );

  bundleRows.push({
    scenario: budget.scenario,
    condition: budget.condition,
    source,
    status: Object.values(metrics).every((metric) => metric.pass) ? "pass" : "fail",
    metrics,
  });
}

const runtimeBudgets = await read(path.join(e0, "runtime-budgets.json")),
  runtime = await read(path.join(e10, "runtime.json")),
  extended = await read(path.join(e10, "runtime-extended.json")),
  extendedHdr = await read(path.join(e10, "runtime-extended-hdr.json")),
  confirmationExists = await access(path.join(e10, "runtime-confirmation-comparison.json"))
    .then(() => true)
    .catch(() => false),
  runtimeConfirmation = confirmationExists
    ? await read(path.join(e10, "runtime-confirmation-comparison.json"))
    : undefined,
  extendedConfirmationExists = await access(path.join(e10, "runtime-extended-confirmation-comparison.json"))
    .then(() => true)
    .catch(() => false),
  extendedConfirmation = extendedConfirmationExists
    ? await read(path.join(e10, "runtime-extended-confirmation-comparison.json"))
    : undefined,
  runtimeRows = [];

for (const budget of runtimeBudgets.scenarios) {
  const extendedScenario = budget.scenario === "M6-extensions" || budget.scenario === "M8-hdr-layers-resize",
    extendedSource = extendedScenario
      ? budget.forceHdr
        ? "runtime-extended-hdr.json"
        : "runtime-extended.json"
      : undefined,
    report = extendedScenario ? (budget.forceHdr ? extendedHdr : extended) : runtime,
    samples = report.samples.filter((sample) => sample.scenario === budget.scenario && sample.count === budget.count),
    confirmation = extendedScenario
      ? extendedConfirmation?.scenarios.find(
          (row) =>
            row.scenario === budget.scenario &&
            row.count === budget.count &&
            row.forceHdr === (budget.forceHdr ?? false),
        )
      : runtimeConfirmation?.scenarios.find((row) => row.scenario === budget.scenario && row.count === budget.count),
    group = (getValue, ceiling) => {
      if (ceiling === undefined) return undefined;

      const values = samples.map(getValue),
        value = median(values);

      return {
        value,
        ceiling,
        pass: value <= ceiling + 1e-6,
        samples: values,
      };
    },
    initialCheck = extendedScenario
      ? {
          update: group((sample) => sample.update.median, budget.updateMedianCeilingMs),
          render: group((sample) => sample.render.median, budget.renderMedianCeilingMs),
          frameP95: group((sample) => sample.frame.p95, budget.frameP95CeilingMs),
          source: extendedSource,
        }
      : {
          update: group((sample) => sample.updateMs.median, budget.updateMedianCeilingMs),
          render: group((sample) => sample.renderExcludingUpdateMs.median, budget.renderMedianCeilingMs),
        };
  const check =
    confirmation?.status === "measured"
      ? extendedScenario
        ? {
            update: {
              value: confirmation.update.candidateMedian,
              ceiling: confirmation.update.e0Ceiling,
              pass: confirmation.update.candidatePassesE0Ceiling,
              samples: confirmation.update.candidateSamples,
            },
            render: {
              value: confirmation.render.candidateMedian,
              ceiling: confirmation.render.e0Ceiling,
              pass: confirmation.render.candidatePassesE0Ceiling,
              samples: confirmation.render.candidateSamples,
            },
            frameP95: {
              value: confirmation.frameP95.candidateMedian,
              ceiling: confirmation.frameP95.e0Ceiling,
              pass: confirmation.frameP95.candidatePassesE0Ceiling,
              samples: confirmation.frameP95.candidateSamples,
            },
            source: extendedSource,
          }
        : {
            update: {
              value: confirmation.update.candidateMedian,
              ceiling: confirmation.update.e0Ceiling,
              pass: confirmation.update.candidatePassesE0Ceiling,
              samples: confirmation.update.candidateSamples,
            },
            render: {
              value: confirmation.renderExcludingUpdate.candidateMedian,
              ceiling: confirmation.renderExcludingUpdate.e0Ceiling,
              pass: confirmation.renderExcludingUpdate.candidatePassesE0Ceiling,
              samples: confirmation.renderExcludingUpdate.candidateSamples,
            },
          }
      : initialCheck;

  runtimeRows.push({
    scenario: budget.scenario,
    count: budget.count,
    forceHdr: budget.forceHdr ?? false,
    browser: report.browser,
    sampleCount: confirmation?.status === "measured" ? confirmation.repetitions.candidate : samples.length,
    initialSampleCount: samples.length,
    initialStatus:
      samples.length === 3 &&
      Object.values(initialCheck)
        .filter(Boolean)
        .every((metric) => metric.pass !== false)
        ? "pass"
        : "fail",
    confirmation:
      confirmation?.status === "measured"
        ? extendedScenario
          ? "runtime-extended-confirmation-comparison.json"
          : "runtime-confirmation-comparison.json"
        : undefined,
    status:
      (confirmation?.status === "measured" || samples.length === 3) &&
      Object.values(check)
        .filter(Boolean)
        .every((metric) => metric.pass !== false)
        ? "pass"
        : "fail",
    checks: check,
  });
}

const result = {
  measuredAt: runtime.measuredAt,
  candidateRevision: runtime.revision,
  originalBudgetRevision: "1944fa0f5c202b8af82841b5de9b2315f758a258",
  browsers: { original: "Chrome/157.0.8103.52", candidate: runtime.browser },
  matchedControl: {
    status: runtimeControl.complete && runtimeControl.sameBrowser ? "complete" : "pending",
    browser: runtimeControl.control.browser,
    controlRevision: runtimeControl.control.revision,
    artifact: runtimeControl.control.artifact,
    comparison: "runtime-control-comparison.json",
    note: runtimeControl.control.note,
  },
  bundles: {
    rows: bundleRows,
    passing: bundleRows.filter((row) => row.status === "pass").length,
    failing: bundleRows.filter((row) => row.status === "fail").length,
    pending: bundleRows.filter((row) => row.status === "pending").length,
  },
  runtime: {
    rows: runtimeRows,
    passing: runtimeRows.filter((row) => row.status === "pass").length,
    failing: runtimeRows.filter((row) => row.status === "fail").length,
    pending: runtimeRows.filter((row) => row.status === "pending").length,
  },
};

await writeFile(path.join(e10, "budget-screen.json"), JSON.stringify(result, null, 2) + "\n");
console.log(
  JSON.stringify(
    {
      bundles: {
        passing: result.bundles.passing,
        failing: result.bundles.failing,
        pending: result.bundles.pending,
        failed: bundleRows.filter((row) => row.status === "fail").map((row) => row.scenario),
      },
      runtime: {
        passing: result.runtime.passing,
        failing: result.runtime.failing,
        pending: result.runtime.pending,
        failed: runtimeRows
          .filter((row) => row.status === "fail")
          .map(({ scenario, count, forceHdr }) => ({ scenario, count, forceHdr })),
      },
    },
    null,
    2,
  ),
);
