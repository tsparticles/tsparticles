import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { gunzipSync } from "node:zlib";
import path from "node:path";
import puppeteer from "puppeteer";

const [
    bundlePath = "bundles/all/dist/tsparticles.all.bundle.min.js",
    destination = ".planning/handovers/evidence/e7/browser-contracts",
  ] = process.argv.slice(2),
  bytes = await readFile(bundlePath),
  source = bundlePath.endsWith(".gz") ? gunzipSync(bytes).toString() : bytes.toString(),
  hash = (value) => createHash("sha256").update(value).digest("hex"),
  errors = [],
  results = [];
await mkdir(destination, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  pipe: true,
});
try {
  for (const { mode, repetition } of ["natural", "forced-hdr", "fallback", "trail"].flatMap((mode) =>
    [0, 1, 2].map((repetition) => ({ mode, repetition })),
  )) {
    const page = await browser.newPage();
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 2 });
    await page.setContent(
      '<body style="margin:0;background:#182030"><canvas id="scene" style="width:400px;height:300px"></canvas><canvas id="other" style="width:400px;height:300px"></canvas></body>',
    );
    await page.addScriptTag({ content: source });
    const result = await page.evaluate(async (mode) => {
      const check = (condition, message) => {
          if (!condition) throw new Error(message);
        },
        media = new Map(),
        observers = new Set(),
        transfers = new Map(),
        add = MediaQueryList.prototype.addEventListener,
        remove = MediaQueryList.prototype.removeEventListener,
        transfer = HTMLCanvasElement.prototype.transferControlToOffscreen,
        NativeObserver = MutationObserver,
        nativeMatch = matchMedia.bind(globalThis),
        nativeContext = OffscreenCanvas.prototype.getContext;
      MediaQueryList.prototype.addEventListener = function (type, callback, ...args) {
        if (type === "change") {
          const handlers = media.get(this) ?? new Set();
          handlers.add(callback);
          media.set(this, handlers);
        }
        return add.call(this, type, callback, ...args);
      };
      MediaQueryList.prototype.removeEventListener = function (type, callback, ...args) {
        if (type === "change") media.get(this)?.delete(callback);
        return remove.call(this, type, callback, ...args);
      };
      globalThis.MutationObserver = class extends NativeObserver {
        observe(...args) {
          observers.add(this);
          return super.observe(...args);
        }
        disconnect() {
          observers.delete(this);
          return super.disconnect();
        }
      };
      HTMLCanvasElement.prototype.transferControlToOffscreen = function () {
        transfers.set(this, (transfers.get(this) ?? 0) + 1);
        return transfer.call(this);
      };
      if (["forced-hdr", "fallback"].includes(mode))
        globalThis.matchMedia = (query) => {
          const m = nativeMatch(query);
          if (["(color-gamut: p3)", "(dynamic-range: high)"].includes(query))
            Object.defineProperty(m, "matches", { value: true });
          return m;
        };
      let failedRequests = 0;
      if (mode === "fallback")
        OffscreenCanvas.prototype.getContext = function (type, settings) {
          if (settings?.colorType === "float16" || settings?.colorSpace === "display-p3") {
            failedRequests++;
            return null;
          }
          return nativeContext.call(this, type, settings);
        };
      const factoryStart = performance.now();
      const engine = tsParticles.createEngine(),
        second = tsParticles.createEngine(),
        instances = [];
      class StatefulUpdater {
        #particles = new WeakSet();
        #counts = { init: 0, update: 0, draw: 0 };
        init(p) {
          this.#particles.add(p);
          this.#counts.init++;
        }
        isEnabled() {
          return true;
        }
        update(p) {
          check(this.#particles.has(p), "updater update identity");
          this.#counts.update++;
        }
        beforeDraw(p) {
          check(this.#particles.has(p), "updater draw identity");
          this.#counts.draw++;
        }
        counts() {
          return { ...this.#counts };
        }
      }
      await engine.pluginManager.register((owner) =>
        owner.pluginManager.addParticleUpdater("e7-private-state", () => {
          const updater = new StatefulUpdater();
          instances.push(updater);
          return updater;
        }),
      );
      await loadAll(engine);
      await loadAll(second);
      const factoryAndLoadersMs = performance.now() - factoryStart;
      let seed = 123456789,
        randomCalls = 0;
      engine.setRandom(() => {
        randomCalls++;
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        return seed / 4294967296;
      });
      const element = document.getElementById("scene"),
        other = document.getElementById("other"),
        background = new OffscreenCanvas(400, 300),
        bg = background.getContext("2d");
      bg.fillStyle = "#203040";
      bg.fillRect(0, 0, 400, 300);
      let backgrounds = 0;
      const options = {
        autoPlay: false,
        fullScreen: false,
        detectRetina: true,
        fpsLimit: 60,
        hdr: { enable: true, mode: "standard", peakNits: 400 },
        background: {
          element: background,
          draw: (ctx) => {
            backgrounds++;
            ctx.fillStyle = "rgba(220,20,60,0.25)";
            ctx.fillRect(0, 0, 50, 50);
          },
        },
        backgroundMask: { enable: true, cover: { color: "#102030", opacity: 0.3 } },
        particles: {
          number: { value: 40, density: { enable: false } },
          shape: { type: "circle" },
          paint: { fill: { color: "oklch(70% 0.22 35 / 0.7)" } },
          opacity: { value: 0.8 },
          size: { value: 3 },
          move: { enable: true, speed: 1 },
          links: { enable: true, distance: 60 },
          collisions: { enable: true, mode: "bounce" },
        },
      };
      if (mode === "trail") {
        options.backgroundMask.enable = false;
        options.trail = { enable: true, length: 10, fill: { color: "#102030" } };
      }
      const loadStart = performance.now();
      const container = await engine.load({ id: "e7", element, options }),
        peer = await second.load({
          id: "peer",
          element: other,
          options: {
            ...options,
            detectRetina: false,
            background: { color: "#102030" },
            backgroundMask: { enable: false },
          },
        });
      const pairInitializationMs = performance.now() - loadStart;
      const delta = { factor: 1, value: 1000 / 60 };
      for (let i = 0; i < 30; i++) container.canvas.render.drawParticles(delta);
      const renderCanvas = container.canvas.renderCanvas;
      check(renderCanvas.width === 800 && renderCanvas.height === 600, "retina dimensions");
      container.canvas.setZoom(1.5, { x: 100, y: 80 });
      container.canvas.render.drawParticles(delta);
      let attributes, pixelBytes;
      container.canvas.render.draw((ctx) => {
        attributes = ctx.getContextAttributes();
        pixelBytes = Array.from(ctx.getImageData(0, 0, renderCanvas.width, renderCanvas.height).data);
      });
      check(container.outputColorSpace === attributes.colorSpace, "effective output color space");
      check(
        container.hdr ===
          Boolean(
            ["forced-hdr", "fallback"].includes(mode) &&
            attributes.colorSpace === "display-p3" &&
            attributes.colorType === "float16",
          ),
        "effective HDR",
      );
      if (mode === "fallback")
        check(attributes.colorSpace === "srgb" && !container.hdr && failedRequests >= 2, "HDR fallback");
      const pngBytes = Array.from(new Uint8Array(await (await renderCanvas.convertToBlob()).arrayBuffer()));
      const image = await container.export("image");
      check(image instanceof Blob && image.size > 0, "DOM image export");
      element.style.width = "320px";
      element.style.height = "240px";
      const resizeStart = performance.now();
      const resized = container.canvas.resize();
      const resizeMs = performance.now() - resizeStart;
      const resizedDimensions = { ...container.canvas.size };
      container.canvas.render.drawParticles(delta);
      check(resized && renderCanvas.width === 640 && renderCanvas.height === 480, "resize/retina");
      check(!container.canvas.resize(), "unchanged resize");
      const redrawStart = performance.now();
      await container.particles.redraw();
      container.canvas.render.drawParticles(delta);
      const redrawMs = performance.now() - redrawStart;
      const refreshStart = performance.now();
      await container.refresh();
      const refreshMs = performance.now() - refreshStart;
      container.canvas.render.drawParticles(delta);
      check(
        instances
          .filter((u) => u.counts().init > 0)
          .every((u) => {
            const c = u.counts();
            return c.update > 0 && c.draw > 0;
          }),
        "updater private state after redraw/refresh: " + JSON.stringify(instances.map((u) => u.counts())),
      );
      let rejected = false;
      try {
        await second.load({ id: "conflict", element, options });
      } catch {
        rejected = true;
      }
      check(rejected, "concurrent ownership rejection");
      const teardownStart = performance.now();
      container.destroy();
      const teardownMs = performance.now() - teardownStart;
      check(!peer.destroyed, "peer survives destroy");
      const originalStyle = Object.fromEntries(
        [...element.style].map((key) => [key, element.style.getPropertyValue(key)]),
      );
      const reused = await second.load({
        id: "reused",
        element,
        options: { ...options, detectRetina: false, background: {}, backgroundMask: { enable: false } },
      });
      check(reused.canvas.renderCanvas === renderCanvas, "one-time transfer after destroy");
      await reused.reset({
        ...options,
        fullScreen: { enable: true, zIndex: 4 },
        detectRetina: false,
        background: {},
        backgroundMask: { enable: false },
      });
      check(element.style.position === "fixed", "fullscreen style");
      reused.destroy();
      check(
        Object.entries(originalStyle).every(([key, value]) => element.style.getPropertyValue(key) === value) &&
          [...element.style].every((key) => key in originalStyle),
        "caller style values restored: " + JSON.stringify({ originalStyle, actual: element.style.cssText }),
      );
      peer.destroy();
      const offscreen = new OffscreenCanvas(80, 60),
        explicit = await second.load({
          id: "explicit",
          element: offscreen,
          options: { ...options, detectRetina: false, background: {}, backgroundMask: { enable: false } },
        });
      explicit.canvas.render.drawParticles(delta);
      check(explicit.canvas.renderCanvas === offscreen && !explicit.canvas.domElement, "explicit surface ownership");
      check((await explicit.export("image")) === undefined, "explicit image export unsupported fallback");
      explicit.destroy();
      const mediaCount = [...media.values()].reduce((n, s) => n + s.size, 0);
      check(mediaCount === 0 && observers.size === 0, "listener and observer cleanup");
      check(engine.items.length === 0 && second.items.length === 0, "containers cleanup");
      check(transfers.get(element) === 1 && transfers.get(other) === 1, "single DOM transfers");
      return {
        mode,
        attributes,
        hdr: attributes.colorType === "float16",
        failedRequests,
        backgrounds,
        updater: instances.map((u) => u.counts()),
        randomCalls,
        pixelBytes,
        pngBytes,
        resize: resizedDimensions,
        phaseMs: { factoryAndLoadersMs, pairInitializationMs, resizeMs, redrawMs, refreshMs, teardownMs },
        mediaCount,
        observers: observers.size,
        transfers: [...transfers.values()],
        imageBytes: image.size,
      };
    }, mode);
    const { pixelBytes, pngBytes, ...rest } = result;
    results.push({ ...rest, repetition, pixelSha256: hash(Buffer.from(pixelBytes)) });
    await writeFile(path.join(destination, `${mode}.png`), Buffer.from(pngBytes));
    await page.close();
  }
  const page = await browser.newPage();
  const worker = await page.evaluate(async (source) => {
    const body =
      source +
      `;onmessage=async event=>{try { const e=tsParticles.createEngine();await loadAll(e);const c=await e.load({id:'worker',element:event.data,options:{autoPlay:false,fullScreen:false,detectRetina:false,particles:{number:{value:5},shape:{type:'circle'},size:{value:3},paint:{fill:{color:'#ff0000'}}}}});c.canvas.render.drawParticles({value:16,factor:1});const count=c.particles.count;c.destroy();postMessage({count,remaining:e.items.length});}catch(error){postMessage({error:String(error),stack:error.stack});}}`;
    const url = URL.createObjectURL(new Blob([body], { type: "text/javascript" }));
    try {
      return await new Promise((resolve, reject) => {
        const worker = new Worker(url),
          canvas = new OffscreenCanvas(80, 60);
        const timer = setTimeout(() => {
          worker.terminate();
          reject(new Error("worker timeout"));
        }, 15000);
        worker.onmessage = (e) => {
          clearTimeout(timer);
          worker.terminate();
          resolve(e.data);
        };
        worker.onerror = (e) => {
          clearTimeout(timer);
          worker.terminate();
          reject(new Error(e.message));
        };
        worker.postMessage(canvas, [canvas]);
      });
    } finally {
      URL.revokeObjectURL(url);
    }
  }, source);
  if (process.env.E7_EXPECT_BASELINE_WORKER_FAILURE === "true") {
    assert.match(worker.error, /document is not defined/);
  } else {
    assert.deepEqual(worker, { count: 5, remaining: 0 });
  }
  assert.deepEqual(errors, []);
  const report = {
    browser: await browser.version(),
    bundleSha256: hash(source),
    viewport: { width: 800, height: 600, deviceScaleFactor: 2 },
    results,
    worker,
    errors,
    limitations: [
      "Forced HDR tests actual float16/P3 context plus SDR fallback; no physical display luminance claim.",
      "Image export supported for DOM canvas; explicit OffscreenCanvas export remains the documented absent-result path.",
      "PNG artifacts and readback hashes are captured on the live render surface before resize/teardown.",
    ],
  };
  await writeFile(path.join(destination, "results.json"), JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
