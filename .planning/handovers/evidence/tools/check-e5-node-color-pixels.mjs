import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { writeFile } from "node:fs/promises";

const require = createRequire(new URL("../../../../utils/tests/package.json", import.meta.url)),
  { createCanvas } = require("@napi-rs/canvas"),
  { getStyleFromOklch, mapOklchToDisplayP3, mapOklchToSrgb } = require("@tsparticles/engine"),
  cases = [
    { name: "sRGB", colorSpace: "srgb", map: mapOklchToSrgb },
    { name: "Display-P3", colorSpace: "display-p3", map: mapOklchToDisplayP3 },
  ],
  source = { a: 0.5, c: 0.27, h: 60, l: 76 },
  opacity = 0.4;

function render(colorSpace) {
  const canvas = createCanvas(2, 2),
    context = canvas.getContext("2d", { colorSpace });

  assert.equal(context.getContextAttributes().colorSpace, colorSpace);

  const style = getStyleFromOklch(source, false, opacity, undefined, undefined, colorSpace);

  assert.match(style, /^oklch\(/u);
  context.fillStyle = style;
  assert.match(context.fillStyle, /^oklch\(/u);
  context.fillRect(0, 0, 1, 1);

  const actual = [...context.getImageData(0, 0, 1, 1, { colorSpace }).data],
    mapped = cases.find((testCase) => testCase.colorSpace === colorSpace).map(source),
    expected = [mapped.rgb.r, mapped.rgb.g, mapped.rgb.b]
      .map((value) => Math.round(value))
      .concat(Math.round(255 * source.a * opacity));

  for (let channel = 0; channel < 4; channel++) {
    assert.ok(
      Math.abs(actual[channel] - expected[channel]) <= 1,
      `${colorSpace} channel ${channel}: ${actual[channel]} vs ${expected[channel]}`,
    );
  }

  return { style, actualRgba: actual, expectedRgba: expected, mappedColor: mapped.color };
}

const results = cases.map((testCase) => ({
    name: testCase.name,
    colorSpace: testCase.colorSpace,
    ...render(testCase.colorSpace),
  })),
  result = {
    measuredAt: new Date().toISOString(),
    runtime: `Node ${process.version} + @napi-rs/canvas`,
    sourceOklch: source,
    opacity,
    hueUnitCompatibility: "The formatter emits a CSS unitless hue; its output is passed to Skia unchanged.",
    results,
    limitations: [
      "This verifies native Skia canvas pixel readback, not browser CSS parsing or browser rendering.",
      "The expected pixel is computed by the engine's gamut mapper; independent WPT/Color.js vectors remain covered by unit tests.",
      "HDR output, float16 headroom, and physical-display appearance are not covered by this SDR check.",
    ],
  };

await writeFile(".planning/handovers/evidence/e5/node-color-pixels.json", JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
