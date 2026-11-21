import assert from "node:assert/strict";
import path from "node:path";
import { writeFile } from "node:fs/promises";
import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  pipe: true,
});

try {
  const page = await browser.newPage(),
    errors = [];

  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://127.0.0.1:8765/.planning/handovers/evidence/e5/browser-color.html", {
    waitUntil: "domcontentloaded",
  });
  await page.waitForFunction(
    () => {
      const text = document.querySelector("#result")?.textContent;

      return !!text && text !== "Running…";
    },
    { timeout: 15000 },
  );

  const resultsText = await page.$eval("#result", (node) => node.textContent),
    fixture = JSON.parse(resultsText ?? "null");

  assert.deepEqual(errors, []);
  assert.equal(fixture.results.length, 5);

  for (const result of fixture.results) {
    assert.equal(result.status, "pass", result.label);
    assert.equal(result.context.colorSpace, result.target, `${result.label} context space`);
    assert.equal(result.readbackColorSpace, result.target, `${result.label} readback space`);
  }

  assert.equal(fixture.hdrLuminanceComparison, "pass");

  for (const result of fixture.results.filter(({ label }) => label.startsWith("Natural HDR tone mapping"))) {
    assert.equal(result.context.colorType, "float16", `${result.label} context type`);
    assert.equal(result.readbackMode, "explicit-colorSpace", `${result.label} readback mode`);
    assert.ok(result.luminanceNits > 0, `${result.label} luminance`);
  }

  const report = {
    browserVersion: await browser.version(),
    fixtureDate: fixture.date,
    hdrLuminanceComparison: fixture.hdrLuminanceComparison,
    results: fixture.results,
    userAgent: fixture.browser,
  };

  await writeFile(
    path.resolve(".planning/handovers/evidence/e5/browser-color-results.json"),
    `${JSON.stringify(report, null, 2)}\n`,
  );
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
