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
    waitUntil: "load",
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
  assert.equal(fixture.results.length, 3);

  for (const result of fixture.results) {
    assert.equal(result.status, "pass", result.label);
    assert.equal(result.context.colorSpace, result.target, `${result.label} context space`);
    assert.equal(result.readbackColorSpace, result.target, `${result.label} readback space`);
  }

  assert.equal(fixture.results[2].context.colorType, "float16");
  assert.equal(fixture.results[2].readbackMode, "explicit-colorSpace");

  const report = {
    browserVersion: await browser.version(),
    fixtureDate: fixture.date,
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
