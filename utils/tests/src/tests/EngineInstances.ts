/* eslint-disable */
import { type Engine, createEngine } from "@tsparticles/engine";
import { TestOffscreenCanvas, installTransferControlToOffscreen } from "../Fixture/OffscreenCanvas.js";
import { describe, expect, it, vi } from "vitest";
import { ShapeManager } from "../../../../plugins/emitters/src/ShapeManager.js";
import { TestWindow } from "../Fixture/Window.js";

const options = { autoPlay: false, particles: { number: { value: 0 } } };
const canvas = () => new TestOffscreenCanvas(400, 300) as unknown as OffscreenCanvas;

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>(r => {
    resolve = r;
  });
  return { promise, resolve };
}

describe("explicit engine ownership", () => {
  it("creates fresh uninitialized registries without consulting global instances", () => {
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, "tsParticles");
    const lookup = vi.fn(() => {
      throw new Error("ambient engine lookup");
    });
    Object.defineProperty(globalThis, "tsParticles", { configurable: true, get: lookup });
    try {
      const a = createEngine(),
        b = createEngine();
      expect(a).not.toBe(b);
      expect(a.items).not.toBe(b.items);
      expect(a.pluginManager).not.toBe(b.pluginManager);
      expect(a.pluginManager.initialized).toBe(false);
      expect(b.pluginManager.initialized).toBe(false);
      expect(lookup).not.toHaveBeenCalled();
      a.pluginManager.addPreset("owned", options);
      a.pluginManager.addConfig({ name: "owned", ...options });
      expect(b.pluginManager.configs.owned).toBeUndefined();
      expect(b.pluginManager.presets.has("owned")).toBe(false);
      const listener = vi.fn();
      a.addEventListener("owned", listener);
      b.dispatchEvent("owned");
      expect(listener).not.toHaveBeenCalled();
      a.dispatchEvent("owned");
      expect(listener).toHaveBeenCalledOnce();
    } finally {
      if (descriptor) Object.defineProperty(globalThis, "tsParticles", descriptor);
      else Reflect.deleteProperty(globalThis, "tsParticles");
    }
  });

  it("deduplicates concurrent initialization within each engine and keeps failures independent", async () => {
    const a = createEngine(),
      b = createEngine();
    const aGate = deferred(),
      bGate = deferred();
    const calls = new Map<object, number>();
    const loader = async (engine: Engine) => {
      calls.set(engine.pluginManager, (calls.get(engine.pluginManager) ?? 0) + 1);
      await (engine.pluginManager === a.pluginManager ? aGate : bGate).promise;
    };
    await a.pluginManager.register(loader);
    await b.pluginManager.register(loader);
    const first = a.init(),
      duplicate = a.init(),
      second = b.init();
    await Promise.resolve();
    expect(calls.get(a.pluginManager)).toBe(1);
    expect(calls.get(b.pluginManager)).toBe(1);
    bGate.resolve();
    await second;
    expect(b.pluginManager.initialized).toBe(true);
    expect(a.pluginManager.initialized).toBe(false);
    aGate.resolve();
    await Promise.all([first, duplicate]);
    expect(calls.get(a.pluginManager)).toBe(1);
  });

  it("retries a failed loader without replaying another engine's initialization", async () => {
    const a = createEngine(),
      b = createEngine();
    let failures = 0;
    const calls = new Map<object, number>();
    const loader = (owner: Engine): void => {
      calls.set(owner.pluginManager, (calls.get(owner.pluginManager) ?? 0) + 1);
      if (owner.pluginManager === a.pluginManager && failures++ === 0) {
        throw new Error("partial registration");
      }
      owner.pluginManager.addPreset("owned", options);
    };
    await a.pluginManager.register(loader);
    await b.pluginManager.register(loader);
    await expect(a.init()).rejects.toThrow("partial registration");
    await b.init();
    await a.init();
    expect(calls.get(a.pluginManager)).toBe(2);
    expect(calls.get(b.pluginManager)).toBe(1);
  });

  it("isolates same-ID scenes on distinct canvases and rejects an occupied canvas", async () => {
    globalThis.window = TestWindow;
    const a = createEngine(),
      b = createEngine(),
      firstCanvas = canvas();
    const first = await a.load({ id: "shared-id", element: firstCanvas, options });
    const second = await b.load({ id: "shared-id", element: canvas(), options });
    expect(first).toBeDefined();
    expect(second).toBeDefined();
    await expect(b.load({ id: "render-alias", element: first!.canvas.renderCanvas, options })).rejects.toThrow(
      "already owned",
    );
    await expect(b.load({ id: "another-id", element: firstCanvas, options })).rejects.toThrow("already owned");
    await expect(a.load({ id: "another-id", element: firstCanvas, options })).rejects.toThrow("already owned");
    expect(a.items).toEqual([first]);
    expect(b.items).toEqual([second]);
    await first!.refresh();
    expect(second!.destroyed).toBe(false);
    first!.destroy();
    expect(second!.destroyed).toBe(false);
    const transferred = await b.load({ id: "new-owner", element: firstCanvas, options });
    expect(transferred).toBeDefined();
    transferred!.destroy();
    second!.destroy();
    expect(a.items).toHaveLength(0);
    expect(b.items).toHaveLength(0);
  });

  it("releases ownership and removes partial containers after canvas setup fails", async () => {
    globalThis.window = TestWindow;
    const a = createEngine(),
      b = createEngine(),
      element = document.createElement("canvas");
    Object.defineProperty(element, "transferControlToOffscreen", {
      configurable: true,
      value: () => {
        throw new Error("canvas unavailable");
      },
    });
    await expect(a.load({ id: "failed", element, options })).rejects.toThrow("OffscreenCanvas transfer failed");
    expect(a.items).toHaveLength(0);
    installTransferControlToOffscreen(element);
    const recovered = await b.load({ id: "recovered", element, options });
    expect(recovered).toBeDefined();
    recovered!.destroy();
  });

  it("keeps emitter shape registrations local regardless of registration order", () => {
    const a = new ShapeManager(),
      b = new ShapeManager();
    const first = { generate: () => ({ x: 1, y: 2 }) };
    const second = { generate: () => ({ x: 3, y: 4 }) };
    b.addShapeGenerator("custom", second);
    a.addShapeGenerator("custom", first);
    expect(a.getShapeGenerator("custom")).toBe(first);
    expect(b.getShapeGenerator("custom")).toBe(second);
    expect(new ShapeManager().getShapeGenerator("custom")).toBeUndefined();
  });
});
