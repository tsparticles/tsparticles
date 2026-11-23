/* global Buffer, URL, console, process, setTimeout, window */

import { createServer } from "node:http";
import { cpus, platform, release, arch } from "node:os";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import puppeteer from "puppeteer";
import ts from "typescript";

const scriptDirectory = dirname(fileURLToPath(import.meta.url)),
  repositoryRoot = resolve(scriptDirectory, "../../../.."),
  packageRoot = resolve(repositoryRoot, "effects/trail"),
  outputDirectory = resolve(packageRoot, "benchmarks/output"),
  sourceFiles = {
    current: resolve(packageRoot, "src/TrailDrawer.ts"),
    original: resolve(
      packageRoot,
      "benchmarks/reference/TrailDrawer.original.ts",
    ),
  },
  widthCases = [
    { name: "unset" },
    { name: "zero", minWidth: 0, maxWidth: 0 },
    { name: "nonzero", minWidth: 1, maxWidth: 4 },
  ],
  outModeCases = [
    { name: "out", mode: "out", wrapAround: false },
    { name: "destroy", mode: "destroy", wrapAround: false },
    { name: "bounce", mode: "bounce", wrapAround: false },
    { name: "split", mode: "split", wrapAround: false },
    { name: "wrap", mode: "wrap", wrapAround: true },
  ];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function buildBrowserModules() {
  for (const [name, sourcePath] of Object.entries(sourceFiles)) {
    const source = await readFile(sourcePath, "utf8"),
      transpiled = ts.transpileModule(source, {
        compilerOptions: {
          module: ts.ModuleKind.ES2022,
          target: ts.ScriptTarget.ES2022,
        },
        fileName: sourcePath,
        reportDiagnostics: true,
      }),
      diagnostics = (transpiled.diagnostics ?? []).filter(
        (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
      );

    assert(
      diagnostics.length === 0,
      diagnostics
        .map((diagnostic) =>
          ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
        )
        .join("\n"),
    );

    const destination = resolve(outputDirectory, name, "TrailDrawer.js");

    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, transpiled.outputText);
  }
}

async function resolveChromium() {
  const candidates = [
    process.env.CHROME_BIN,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    process.env.PUPPETEER_EXECUTABLE_PATH,
    await Promise.resolve(puppeteer.executablePath()).catch(() => undefined),
    "/opt/homebrew/bin/chromium",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
  ].filter(Boolean);

  return candidates.find((candidate) => existsSync(candidate));
}

function contentType(path) {
  switch (extname(path)) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".js":
    case ".mjs":
      return "text/javascript; charset=utf-8";
    case ".json":
      return "application/json; charset=utf-8";
    case ".png":
      return "image/png";
    default:
      return "application/octet-stream";
  }
}

function createStaticServer() {
  const server = createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url ?? "/", "http://127.0.0.1"),
        filePath = resolve(
          repositoryRoot,
          `.${decodeURIComponent(requestUrl.pathname)}`,
        );

      if (!filePath.startsWith(`${repositoryRoot}${sep}`)) {
        response.writeHead(403).end("Forbidden");

        return;
      }

      const body = await readFile(filePath);

      response.writeHead(200, {
        "Cache-Control": "no-store",
        "Content-Type": contentType(filePath),
      });
      response.end(body);
    } catch {
      response.writeHead(404).end("Not found");
    }
  });

  return server;
}

async function openBrowserPage() {
  const executablePath = await resolveChromium();

  assert(
    executablePath,
    "No Chromium executable found; set CHROME_BIN to a Chromium or Chrome binary.",
  );
  assert(cpus().length > 0, "Unable to identify the host CPU.");
  console.log(`Launching Chromium from ${executablePath}.`);

  const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath,
      headless: true,
      timeout: 60000,
    }),
    server = createStaticServer();
  console.log(`Launched ${await browser.version()}.`);

  await new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolveListen);
  });

  const address = server.address(),
    page = await browser.newPage(),
    pageErrors = [],
    consoleErrors = [];

  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
  page.setDefaultTimeout(120000);
  await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: 1 });
  await page.goto(
    `http://127.0.0.1:${address.port}/effects/trail/benchmarks/browser/index.html`,
    {
      waitUntil: "domcontentloaded",
    },
  );
  const ready = await page.evaluate(() =>
    Promise.race([
      window.trailHarnessReady.then(() => true),
      new Promise((resolve) => setTimeout(() => resolve(false), 5000)),
    ]),
  );

  assert(
    ready,
    `Browser harness did not initialize.\n${[...pageErrors, ...consoleErrors].join("\n")}`,
  );
  console.log("Browser harness initialized.");

  return {
    browser,
    page,
    pageErrors,
    consoleErrors,
    server,
    version: await browser.version(),
  };
}

function decodePngDataUrl(dataUrl) {
  const encoded = dataUrl.slice(dataUrl.indexOf(",") + 1);

  return PNG.sync.read(Buffer.from(encoded, "base64"));
}

function changedPixels(original, current) {
  const changed = [];

  for (let offset = 0; offset < original.data.length; offset += 4) {
    if (
      original.data[offset] !== current.data[offset] ||
      original.data[offset + 1] !== current.data[offset + 1] ||
      original.data[offset + 2] !== current.data[offset + 2] ||
      original.data[offset + 3] !== current.data[offset + 3]
    ) {
      const pixel = offset / 4,
        x = pixel % original.width,
        y = Math.floor(pixel / original.width),
        channels = ["red", "green", "blue", "alpha"].map((name, channel) => ({
          name,
          original: original.data[offset + channel],
          current: current.data[offset + channel],
          delta: Math.abs(
            original.data[offset + channel] - current.data[offset + channel],
          ),
        }));

      changed.push({ x, y, channels });
    }
  }

  return changed;
}

function transformPoint(transform, x, y) {
  const [a, b, c, d, e, f] = transform;

  return { x: a * x + c * y + e, y: b * x + d * y + f };
}

function resolvedStrokes(strokes) {
  return strokes.map((stroke) => {
    let start;

    for (const command of stroke.path) {
      if (command[0] === "moveTo") {
        start = transformPoint(stroke.transform, command[1], command[2]);
      } else if (command[0] === "quadraticCurveTo" && start) {
        return {
          alpha: stroke.globalAlpha,
          control: transformPoint(stroke.transform, command[1], command[2]),
          end: transformPoint(stroke.transform, command[3], command[4]),
          lineWidth: stroke.lineWidth,
          start,
          strokeStyle: stroke.strokeStyle,
        };
      }
    }

    throw new Error(
      "Geometry trace contained a stroke without a quadratic segment.",
    );
  });
}

function closestPointOnStroke(point, stroke) {
  let closest;

  for (let step = 0; step <= 100; step++) {
    const t = step / 100,
      inverse = 1 - t,
      x =
        inverse * inverse * stroke.start.x +
        2 * inverse * t * stroke.control.x +
        t * t * stroke.end.x,
      y =
        inverse * inverse * stroke.start.y +
        2 * inverse * t * stroke.control.y +
        t * t * stroke.end.y,
      distance = Math.hypot(point.x - x, point.y - y),
      edgeDistance = Math.abs(distance - stroke.lineWidth / 2);

    if (!closest || edgeDistance < closest.edgeDistance) {
      closest = { centerDistance: distance, edgeDistance, t, x, y };
    }
  }

  return closest;
}

function nearestStrokeEdge(pixel, strokes) {
  let nearest;

  for (let index = 0; index < strokes.length; index++) {
    const edge = closestPointOnStroke(
      { x: pixel.x + 0.5, y: pixel.y + 0.5 },
      strokes[index],
    );

    if (!nearest || edge.edgeDistance < nearest.edgeDistance) {
      nearest = { ...edge, strokeIndex: index };
    }
  }

  return nearest;
}

function geometryDelta(original, current) {
  const oldStrokes = resolvedStrokes(original),
    newStrokes = resolvedStrokes(current);

  assert(
    oldStrokes.length === newStrokes.length,
    "Original and current geometry traces contain different stroke counts.",
  );

  let maxCoordinateDelta = 0,
    maxStyleDelta = 0;

  for (let index = 0; index < oldStrokes.length; index++) {
    const oldStroke = oldStrokes[index],
      newStroke = newStrokes[index];

    for (const point of ["start", "control", "end"]) {
      maxCoordinateDelta = Math.max(
        maxCoordinateDelta,
        Math.abs(oldStroke[point].x - newStroke[point].x),
        Math.abs(oldStroke[point].y - newStroke[point].y),
      );
    }

    maxStyleDelta = Math.max(
      maxStyleDelta,
      Math.abs(oldStroke.alpha - newStroke.alpha),
      Math.abs(oldStroke.lineWidth - newStroke.lineWidth),
      oldStroke.strokeStyle === newStroke.strokeStyle ? 0 : 1,
    );
  }

  return {
    current: newStrokes,
    maxCoordinateDelta,
    maxStyleDelta,
    original: oldStrokes,
  };
}

function copyPng(target, source, offsetX, offsetY) {
  for (let y = 0; y < source.height; y++) {
    const sourceStart = y * source.width * 4,
      targetStart = ((y + offsetY) * target.width + offsetX) * 4;

    source.data.copy(
      target.data,
      targetStart,
      sourceStart,
      sourceStart + source.width * 4,
    );
  }
}

const digitPatterns = {
  0: ["111", "101", "101", "101", "111"],
  1: ["010", "110", "010", "010", "111"],
  2: ["111", "001", "111", "100", "111"],
  3: ["111", "001", "111", "001", "111"],
  4: ["101", "101", "111", "001", "001"],
  5: ["111", "100", "111", "001", "111"],
  6: ["111", "100", "111", "101", "111"],
  7: ["111", "001", "010", "010", "010"],
  8: ["111", "101", "111", "101", "111"],
  9: ["111", "101", "111", "001", "111"],
};

function putPixel(image, x, y, color) {
  if (x < 0 || y < 0 || x >= image.width || y >= image.height) {
    return;
  }

  const offset = (y * image.width + x) * 4;

  image.data[offset] = color[0];
  image.data[offset + 1] = color[1];
  image.data[offset + 2] = color[2];
  image.data[offset + 3] = 255;
}

function markAnnotatedPixel(image, x, y, index, panelOffset, color) {
  const centerX = x + panelOffset,
    background = [0, 0, 0, 255],
    pattern = digitPatterns[String(index % 10)];

  for (let delta = -2; delta <= 2; delta++) {
    putPixel(image, centerX + delta, y - 2, color);
    putPixel(image, centerX + delta, y + 2, color);
    putPixel(image, centerX - 2, y + delta, color);
    putPixel(image, centerX + 2, y + delta, color);
  }

  for (let digitY = 0; digitY < pattern.length; digitY++) {
    for (let digitX = 0; digitX < pattern[digitY].length; digitX++) {
      if (pattern[digitY][digitX] === "1") {
        putPixel(image, centerX + 3 + digitX, y - 2 + digitY, background);
        putPixel(
          image,
          centerX + 4 + digitX,
          y - 2 + digitY,
          [255, 255, 255, 255],
        );
      }
    }
  }
}

function createAnnotatedImage(original, current, diff, pixels) {
  const gap = 4,
    headerHeight = 24,
    width = original.width * 3 + gap * 2,
    height = original.height + headerHeight,
    annotated = new PNG({ width, height }),
    offsets = [0, original.width + gap, original.width * 2 + gap * 2],
    panels = [
      { image: original, label: "original", marker: [255, 136, 0, 255] },
      { image: current, label: "current", marker: [0, 200, 80, 255] },
      { image: diff, label: "pixelmatch diff", marker: [0, 220, 255, 255] },
    ];

  panels.forEach((panel, index) => {
    copyPng(annotated, panel.image, offsets[index], headerHeight);

    for (let x = offsets[index]; x < offsets[index] + original.width; x++) {
      putPixel(annotated, x, 0, panel.marker);
      putPixel(annotated, x, 1, panel.marker);
      putPixel(annotated, x, 2, panel.marker);
    }
  });

  for (let index = 0; index < pixels.length; index++) {
    for (let panel = 0; panel < 3; panel++) {
      markAnnotatedPixel(
        annotated,
        pixels[index].x,
        pixels[index].y + headerHeight,
        index,
        offsets[panel],
        panels[panel].marker,
      );
    }
  }

  return { annotated, panels: panels.map((panel) => panel.label) };
}

function summarizeChannelDeltas(pixels) {
  const channels = ["red", "green", "blue", "alpha"],
    result = {};

  for (const name of channels) {
    const values = pixels.flatMap((pixel) =>
      pixel.channels
        .filter((channel) => channel.name === name)
        .map((channel) => channel.delta),
    );

    result[name] = values.length
      ? {
          min: Math.min(...values),
          max: Math.max(...values),
          mean: values.reduce((sum, value) => sum + value, 0) / values.length,
        }
      : { min: 0, max: 0, mean: 0 };
  }

  return result;
}

function encodeScenarioName(config) {
  return [
    `transform-${config.transform}`,
    `fade-${config.fade}`,
    `length-${config.length}`,
    `width-${config.widthName}`,
    `out-${config.outModeName}`,
    `dpr-${config.dpr}`,
  ].join("_");
}

async function setDeviceScaleFactor(page, dpr) {
  await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: dpr });
}

async function runPixelComparison(page) {
  const results = [],
    dprs = [1, 2],
    transforms = [false, true],
    fades = [false, true],
    lengths = [1, 3, 10, 50],
    scenarioConfigs = new Map(),
    geometryCandidates = new Map(),
    zeroWidthFrames = [];
  let scenarioCount = 0;

  for (const dpr of dprs) {
    await setDeviceScaleFactor(page, dpr);

    for (const transform of transforms) {
      for (const fade of fades) {
        for (const length of lengths) {
          for (const widthCase of widthCases) {
            for (const outModeCase of outModeCases) {
              const config = {
                  animateSize: true,
                  baseRadius: 3,
                  dpr,
                  fade,
                  length,
                  outMode: outModeCase.mode,
                  outModeName: outModeCase.name,
                  particleCount: 12,
                  seed: 0x5eed1234,
                  transform,
                  wrapAround: outModeCase.wrapAround,
                  widthName: widthCase.name,
                  ...widthCase,
                },
                scenario = encodeScenarioName(config),
                result = await page.evaluate(async (scenarioConfig) => {
                  await window.trailHarnessReady;

                  return window.trailHarness.runPixelScenario(scenarioConfig);
                }, config);

              assert(
                result.dpr === dpr,
                `Browser reported DPR ${result.dpr} for requested DPR ${dpr}.`,
              );
              scenarioConfigs.set(scenario, config);

              for (const implementation of ["current", "original"]) {
                const state = result.contextStates[implementation];

                assert(
                  state,
                  `No context state recorded for ${implementation} (${scenario}).`,
                );
                assert(
                  state.restored,
                  `Context state changed for ${implementation} (${scenario}): ${JSON.stringify(state)}.`,
                );
              }

              for (const capture of result.captures) {
                const current = decodePngDataUrl(capture.current),
                  original = decodePngDataUrl(capture.original);

                assert(
                  current.width === original.width &&
                    current.height === original.height,
                  `Canvas dimensions differ for ${scenario}, frame ${capture.frame}.`,
                );

                const diff = new PNG({
                    width: current.width,
                    height: current.height,
                  }),
                  // Use an exact comparison so edge-coverage differences are reported, not tolerated.
                  differingPixels = pixelmatch(
                    original.data,
                    current.data,
                    diff.data,
                    current.width,
                    current.height,
                    {
                      includeAA: true,
                      threshold: 0,
                    },
                  );
                let currentPixelIsUniformBackground = true,
                  originalPixelIsUniformBackground = true;

                for (
                  let offset = 0;
                  offset < current.data.length;
                  offset += 4
                ) {
                  const currentBackground =
                      current.data[offset] === 16 &&
                      current.data[offset + 1] === 24 &&
                      current.data[offset + 2] === 32 &&
                      current.data[offset + 3] === 255,
                    originalBackground =
                      original.data[offset] === 16 &&
                      original.data[offset + 1] === 24 &&
                      original.data[offset + 2] === 32 &&
                      original.data[offset + 3] === 255;

                  if (!currentBackground) {
                    currentPixelIsUniformBackground = false;
                  }

                  if (!originalBackground) {
                    originalPixelIsUniformBackground = false;
                  }
                }

                if (widthCase.name === "zero") {
                  assert(
                    currentPixelIsUniformBackground,
                    `Zero maximum width rendered pixels in ${scenario}, frame ${capture.frame}.`,
                  );
                  assert(
                    originalPixelIsUniformBackground === (capture.frame === 1),
                    `Unexpected original zero-width rendering in ${scenario}, frame ${capture.frame}.`,
                  );
                  if (differingPixels > 0) {
                    zeroWidthFrames.push({
                      scenario,
                      frame: capture.frame,
                      differingPixels,
                    });
                  }
                }

                const isGeometryCandidate =
                    !transform &&
                    dpr === 2 &&
                    widthCase.name !== "zero" &&
                    differingPixels > 0,
                  record = {
                    scenario,
                    frame: capture.frame,
                    differingPixels,
                    intentionalZeroWidthDifference:
                      widthCase.name === "zero" && differingPixels > 0,
                    equivalentGeometryAaDifference: false,
                    transform,
                    dpr,
                  };

                results.push(record);
                if (isGeometryCandidate) {
                  const pixels = changedPixels(original, current);

                  assert(
                    pixels.length === differingPixels,
                    `Pixel detail count mismatch for ${scenario}, frame ${capture.frame}.`,
                  );
                  geometryCandidates.set(`${scenario}@${capture.frame}`, {
                    pixels,
                    record,
                  });
                }

                if (differingPixels > 0) {
                  const diffDirectory = resolve(outputDirectory, "pixel-diffs");

                  await mkdir(diffDirectory, { recursive: true });
                  await Promise.all([
                    writeFile(
                      resolve(
                        diffDirectory,
                        `${scenario}_frame-${capture.frame}_original.png`,
                      ),
                      PNG.sync.write(original),
                    ),
                    writeFile(
                      resolve(
                        diffDirectory,
                        `${scenario}_frame-${capture.frame}_current.png`,
                      ),
                      PNG.sync.write(current),
                    ),
                    writeFile(
                      resolve(
                        diffDirectory,
                        `${scenario}_frame-${capture.frame}_diff.png`,
                      ),
                      PNG.sync.write(diff),
                    ),
                  ]);
                }
              }

              scenarioCount++;

              if (scenarioCount % 20 === 0) {
                console.log(`Compared ${scenarioCount}/480 pixel scenarios.`);
              }
            }
          }
        }
      }
    }
  }

  const edgeTolerancePx = 0.05,
    maxAllowedAaPixelsPerCapture = 8,
    // The full comparison measured a maximum channel delta of 57; 64 allows a small regression margin.
    maxAllowedAaChannelDelta = 64,
    pixelDeltas = [],
    geometryReports = [];
  let worstAaCapture;

  for (const [key, candidate] of geometryCandidates) {
    const [scenario, frameText] = key.split("@"),
      frame = Number(frameText),
      config = {
        ...scenarioConfigs.get(scenario),
        recordGeometry: true,
        traceFrame: frame,
      },
      traced = await page.evaluate(async (scenarioConfig) => {
        await window.trailHarnessReady;

        return window.trailHarness.runPixelScenario(scenarioConfig);
      }, config),
      capture = traced.captures.find((item) => item.frame === frame);

    assert(
      capture,
      `No traced image capture was returned for ${scenario}, frame ${frame}.`,
    );

    const original = decodePngDataUrl(capture.original),
      current = decodePngDataUrl(capture.current),
      diff = new PNG({ width: current.width, height: current.height }),
      traces = geometryDelta(traced.geometry.original, traced.geometry.current),
      pixels = candidate.pixels.map((pixel) => {
        const originalEdge = nearestStrokeEdge(pixel, traces.original),
          currentEdge = nearestStrokeEdge(pixel, traces.current);

        return {
          ...pixel,
          originalNearestEdge: originalEdge,
          currentNearestEdge: currentEdge,
          withinEdgeTolerance:
            originalEdge.edgeDistance <= edgeTolerancePx &&
            currentEdge.edgeDistance <= edgeTolerancePx,
        };
      }),
      channelDeltas = summarizeChannelDeltas(pixels);
    const captureMaxChannelDelta = Math.max(
      0,
      ...Object.values(channelDeltas).map((channel) => channel.max),
    );

    pixelmatch(
      original.data,
      current.data,
      diff.data,
      current.width,
      current.height,
      {
        includeAA: true,
        threshold: 0,
      },
    );

    const report = {
      scenario,
      frame,
      differingPixels: pixels.length,
      maxCoordinateDeltaDevicePx: traces.maxCoordinateDelta,
      maxStyleDelta: traces.maxStyleDelta,
      maxChannelDelta: captureMaxChannelDelta,
      allPixelsWithinEdgeTolerance: pixels.every(
        (pixel) => pixel.withinEdgeTolerance,
      ),
      channelDeltas,
      pixels,
    };

    geometryReports.push(report);
    pixelDeltas.push(...pixels);
    candidate.record.equivalentGeometryAaDifference =
      pixels.length <= maxAllowedAaPixelsPerCapture &&
      report.maxStyleDelta === 0 &&
      captureMaxChannelDelta <= maxAllowedAaChannelDelta &&
      report.allPixelsWithinEdgeTolerance;

    if (
      !worstAaCapture ||
      report.differingPixels > worstAaCapture.report.differingPixels
    ) {
      worstAaCapture = { current, diff, original, pixels, report };
    }

    if (pixels.length > maxAllowedAaPixelsPerCapture) {
      candidate.record.equivalentGeometryAaDifference = false;
    }
  }

  const antialiasingFrames = results.filter(
      (result) => result.equivalentGeometryAaDifference,
    ),
    antialiasingPixels = antialiasingFrames.reduce(
      (sum, result) => sum + result.differingPixels,
      0,
    ),
    maxAntialiasingPixels = Math.max(
      0,
      ...antialiasingFrames.map((result) => result.differingPixels),
    ),
    unexpected = results.filter(
      (result) =>
        result.differingPixels > 0 &&
        !result.intentionalZeroWidthDifference &&
        !result.equivalentGeometryAaDifference,
    ),
    differingFrames = results.filter((result) => result.differingPixels > 0),
    intentionalZeroWidthPixels = results
      .filter((result) => result.intentionalZeroWidthDifference)
      .reduce((sum, result) => sum + result.differingPixels, 0),
    totalDifferingPixels = results.reduce(
      (sum, result) => sum + result.differingPixels,
      0,
    ),
    allAaPixelsWithinEdge = geometryReports.every(
      (report) => report.allPixelsWithinEdgeTolerance,
    ),
    maxCoordinateDeltaDevicePx = Math.max(
      0,
      ...geometryReports.map((report) => report.maxCoordinateDeltaDevicePx),
    ),
    maxChannelDelta = Math.max(
      0,
      ...geometryReports.flatMap((report) =>
        Object.values(report.channelDeltas).map((channel) => channel.max),
      ),
    ),
    channelDeltas = summarizeChannelDeltas(pixelDeltas),
    report = {
      comparison:
        "pixelmatch threshold=0, includeAA=true; zero-width differences are explicit behavior changes",
      scenarios: scenarioCount,
      captures: results.length,
      totalDifferingPixels,
      differingFrames: differingFrames.length,
      intentionalZeroWidthFrames: zeroWidthFrames.length,
      intentionalZeroWidthPixels,
      equivalentGeometryAaFrames: antialiasingFrames.length,
      equivalentGeometryAaPixels: antialiasingPixels,
      maxEquivalentGeometryAaPixelsInCapture: maxAntialiasingPixels,
      unexpectedFrames: unexpected.length,
      geometryAnalysis: {
        hypothesis:
          "Subtracting particle position before applying the translated transform changes floating-point rasterization at sub-pixel stroke edges.",
        tolerance: {
          maxDifferingPixelsPerCapture: maxAllowedAaPixelsPerCapture,
          maxPerChannelDelta: maxAllowedAaChannelDelta,
          edgeDistanceDevicePx: edgeTolerancePx,
          reason:
            "Only DPR 2, transform:false captures are eligible; every differing pixel must be within 0.05 device px of a matching stroke edge, stroke styles must be identical, each capture may have at most eight differing pixels, and no channel may differ by more than 64 (the observed maximum was 57).",
        },
        maxCoordinateDeltaDevicePx,
        maxChannelDelta,
        allAaPixelsWithinEdge,
        perChannelDeltas: channelDeltas,
        captures: geometryReports,
      },
      results,
    };

  assert(
    maxChannelDelta <= maxAllowedAaChannelDelta,
    `DPR 2 antialiasing channel delta ${maxChannelDelta} exceeds allowed ${maxAllowedAaChannelDelta}.`,
  );

  if (worstAaCapture) {
    const { annotated, panels } = createAnnotatedImage(
        worstAaCapture.original,
        worstAaCapture.current,
        worstAaCapture.diff,
        worstAaCapture.pixels,
      ),
      annotationDirectory = resolve(outputDirectory, "pixel-diffs"),
      annotationBase = resolve(
        annotationDirectory,
        "worst-dpr2-edge-annotated",
      );

    await Promise.all([
      writeFile(`${annotationBase}.png`, PNG.sync.write(annotated)),
      writeFile(
        `${annotationBase}.json`,
        JSON.stringify(
          {
            panels,
            scenario: worstAaCapture.report.scenario,
            frame: worstAaCapture.report.frame,
            coordinateDeltaDevicePx:
              worstAaCapture.report.maxCoordinateDeltaDevicePx,
            perChannelDeltas: worstAaCapture.report.channelDeltas,
            pixels: worstAaCapture.report.pixels,
          },
          null,
          2,
        ),
      ),
    ]);
  }

  await writeFile(
    resolve(outputDirectory, "pixel-comparison.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(
    `Pixel comparison: ${scenarioCount} scenarios, ${results.length} captures, ${totalDifferingPixels} differing pixels; ${intentionalZeroWidthPixels} intentional maxWidth:0 pixels, ${antialiasingPixels} DPR 2 edge-antialiasing pixels across ${antialiasingFrames.length} captures, ${unexpected.length} unexpected captures.`,
  );
  console.log(
    `DPR 2 geometry: max coordinate delta ${maxCoordinateDeltaDevicePx} device px; differing pixel channel deltas ${JSON.stringify(channelDeltas)}.`,
  );

  const consistency = await page.evaluate(() =>
    window.trailHarness.runConsistency(),
  );

  await writeFile(
    resolve(outputDirectory, "bounds-consistency.json"),
    JSON.stringify(consistency, null, 2),
  );
  console.log(
    `Bounds consistency: ${consistency.length} mode/direction runs × 1,000 frames; ${consistency.reduce((sum, item) => sum + item.checkedBreakSteps, 0)} break steps checked; the active trail length was verified after every frame.`,
  );

  assert(
    scenarioCount === 480,
    `Expected 480 pixel scenarios, ran ${scenarioCount}.`,
  );
  assert(
    intentionalZeroWidthPixels > 0,
    "The maxWidth: 0 behavior-change scenarios did not produce the expected difference from the original.",
  );
  assert(
    geometryReports.length === antialiasingFrames.length,
    "At least one DPR 2 geometry difference was not proven to be an edge antialiasing difference.",
  );
  assert(
    allAaPixelsWithinEdge,
    "At least one DPR 2 differing pixel was not within one device pixel of a stroke edge.",
  );
  assert(
    maxAntialiasingPixels <= maxAllowedAaPixelsPerCapture,
    `DPR 2 antialiasing count ${maxAntialiasingPixels} exceeds the explicit per-capture limit ${maxAllowedAaPixelsPerCapture}.`,
  );
  assert(
    maxChannelDelta <= maxAllowedAaChannelDelta,
    `DPR 2 antialiasing channel delta ${maxChannelDelta} exceeds the explicit limit ${maxAllowedAaChannelDelta}.`,
  );
  assert(
    unexpected.length === 0,
    `Found ${unexpected.length} unexpected pixel-difference frames.`,
  );

  return { pixelReport: report, consistency };
}

function summarizeTimings(samples) {
  const sorted = [...samples].sort((a, b) => a - b),
    middle = Math.floor(sorted.length / 2),
    median =
      sorted.length % 2
        ? sorted[middle]
        : (sorted[middle - 1] + sorted[middle]) / 2;

  return {
    medianMs: median,
    minMs: sorted[0],
    maxMs: sorted[sorted.length - 1],
    samplesMs: samples,
  };
}

function machineDetails() {
  let processor = cpus()[0]?.model ?? "unknown";

  if (platform() === "darwin") {
    try {
      processor =
        execFileSync("/usr/sbin/sysctl", ["-n", "machdep.cpu.brand_string"], {
          encoding: "utf8",
        }).trim() || processor;
    } catch {
      // The Node CPU model remains available when sysctl is not.
    }
  }

  return {
    platform: `${platform()} ${release()}`,
    architecture: arch(),
    processor,
  };
}

async function runBrowserBenchmark(page, version) {
  const report = {
    chromium: version,
    machine: machineDetails(),
    cpuThrottling: "disabled (no CDP CPU-throttling emulation configured)",
    configuration: {
      particles: 500,
      trailLength: 50,
      fade: true,
      warmupFrames: 20,
      measuredFrames: 60,
      repetitions: 5,
    },
    results: [],
  };

  for (const dpr of [1, 2]) {
    await setDeviceScaleFactor(page, dpr);

    for (const transform of [false, true]) {
      const measurements = { current: [], original: [] };

      for (
        let repetition = 0;
        repetition < report.configuration.repetitions;
        repetition++
      ) {
        const order =
          repetition % 2 === 0
            ? ["original", "current"]
            : ["current", "original"];

        for (const implementation of order) {
          const sample = await page.evaluate(
            (implementationName, config) =>
              window.trailHarness.benchmarkIteration(
                implementationName,
                config,
              ),
            implementation,
            {
              animateSize: true,
              baseRadius: 3,
              canvasHeight: 600,
              canvasWidth: 800,
              dpr,
              fade: true,
              length: 50,
              maxWidth: undefined,
              minWidth: undefined,
              measuredFrames: report.configuration.measuredFrames,
              outMode: "out",
              particleCount: 500,
              seed: 0x5eed1234,
              transform,
              warmupFrames: report.configuration.warmupFrames,
            },
          );

          measurements[implementation].push(sample);
        }
      }

      report.results.push({
        transform,
        dpr,
        original: summarizeTimings(measurements.original),
        current: summarizeTimings(measurements.current),
      });
    }
  }

  await writeFile(
    resolve(outputDirectory, "browser-benchmark.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(`Chromium: ${report.chromium}`);
  console.log(
    `Machine: ${report.machine.processor}; ${report.machine.platform}; ${report.machine.architecture}`,
  );
  console.log(report.cpuThrottling);
  console.log(
    "| Transform | DPR | Original median (min-max) ms/frame | Current median (min-max) ms/frame | Change |",
  );
  console.log("|---|---:|---:|---:|---:|");

  for (const result of report.results) {
    const change = (
      (result.current.medianMs / result.original.medianMs - 1) *
      100
    ).toFixed(1);

    console.log(
      `| ${result.transform} | ${result.dpr} | ${result.original.medianMs.toFixed(3)} (${result.original.minMs.toFixed(3)}-${result.original.maxMs.toFixed(3)}) | ${result.current.medianMs.toFixed(3)} (${result.current.minMs.toFixed(3)}-${result.current.maxMs.toFixed(3)}) | ${change}% |`,
    );
  }

  return report;
}

async function main() {
  const mode = process.argv[2];

  assert(
    mode === "compare" || mode === "benchmark",
    "Usage: run-browser.mjs <compare|benchmark>",
  );
  await buildBrowserModules();
  await mkdir(outputDirectory, { recursive: true });

  const { browser, page, pageErrors, server, version } =
    await openBrowserPage();

  try {
    if (mode === "compare") {
      await runPixelComparison(page);
    } else {
      await runBrowserBenchmark(page, version);
    }

    assert(
      pageErrors.length === 0,
      `Browser page errors:\n${pageErrors.join("\n")}`,
    );
  } finally {
    await browser.close();
    await new Promise((resolveClose, reject) =>
      server.close((error) => (error ? reject(error) : resolveClose())),
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
