/* eslint-disable @typescript-eslint/no-magic-numbers, @typescript-eslint/unbound-method -- context methods are Vitest spies in these fixtures. */
import { afterEach, describe, expect, it, vi } from "vitest";
import { CanvasManager } from "../../../../engine/src/Core/Canvas/CanvasManager.js";
import type { Container } from "../../../../engine/src/Core/Container/Container.js";
import type { IContainerPlugin } from "../../../../engine/src/Core/Interfaces/IContainerPlugin.js";
import type { IShapeDrawData } from "../../../../engine/src/Core/Interfaces/IShapeDrawData.js";
import type { Particle } from "../../../../engine/src/Core/Particles/Particle.js";
import type { PluginManager } from "../../../../engine/src/Core/Engine/PluginManager.js";
import { RenderManager } from "../../../../engine/src/Core/Rendering/RenderManager.js";

/** Builds a renderer with controllable hooks and no DOM dependencies. */
function setup(plugins: IContainerPlugin[] = []): {
  container: Container;
  context: OffscreenCanvasRenderingContext2D;
  render: RenderManager;
} {
  const container = {
      actualOptions: { clear: true, background: {} },
      plugins,
      particleUpdaters: [],
      retina: { pixelRatio: 1 },
      shapeDrawers: new Map(),
      effectDrawers: new Map(),
      particles: { update: vi.fn(), drawParticles: vi.fn() },
    } as unknown as Container,
    canvas = { size: { width: 80, height: 60 } } as CanvasManager,
    context = {
      clearRect: vi.fn(),
      fillRect: vi.fn(),
      drawImage: vi.fn(),
      globalAlpha: 0.75,
    } as unknown as OffscreenCanvasRenderingContext2D,
    render = new RenderManager({} as PluginManager, container, canvas);

  render.setContext(context);
  render.initPlugins();

  return { container, context, render };
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("render hook contracts", () => {
  it("keeps dedicated precedence, first-true short circuit and fallback", () => {
    const calls: string[] = [],
      layer: IContainerPlugin = { canvasPaint: () => false },
      first = {
        canvasClear: () => {
          calls.push("first");

          return true;
        },
      },
      second = {
        canvasClear: () => {
          calls.push("second");

          return false;
        },
      },
      { context, render } = setup([layer, first, second]);

    layer.canvasClear = () => {
      calls.push("late");

      return false;
    };
    expect(render.clear()).toBe(first);
    expect(calls).toEqual(["first"]);
    expect(context.clearRect).not.toHaveBeenCalled();
    first.canvasClear = () => {
      calls.push("first-false");

      return false;
    };
    expect(render.clear()).toBeUndefined();
    expect(calls).toEqual(["first", "first-false", "second", "late"]);
    expect(context.clearRect).toHaveBeenCalledOnce();
  });

  it("visits late clear hooks in layer order and deduplicates identities", () => {
    const calls: string[] = [],
      cleanup: IContainerPlugin = { clearDraw: () => undefined },
      multi: IContainerPlugin = {
        canvasPaint: () => false,
        draw: () => undefined,
        clearDraw: () => undefined,
      },
      setupPlugin: IContainerPlugin = { drawSettingsSetup: () => undefined },
      { render } = setup([cleanup, setupPlugin, multi]);

    cleanup.canvasClear = () => {
      calls.push("cleanup");

      return false;
    };
    multi.canvasClear = () => {
      calls.push("multi");

      return false;
    };
    setupPlugin.canvasClear = () => {
      calls.push("setup");

      return false;
    };
    render.clear();
    expect(calls).toEqual(["multi", "setup", "cleanup"]);
  });

  it("observes refreshed layers during a clear and removes retired plugins", () => {
    const calls: string[] = [],
      next: IContainerPlugin = { draw: () => undefined },
      current: IContainerPlugin = {},
      plugins = [current],
      { render } = setup(plugins);

    current.canvasClear = () => {
      calls.push("current");
      plugins.splice(0, plugins.length, next);
      render.initPlugins();
      next.canvasClear = () => {
        calls.push("next");

        return false;
      };

      return false;
    };
    render.initPlugins();
    render.clear();
    expect(calls).toEqual(["current", "next"]);
    render.clear();
    expect(calls).toEqual(["current", "next", "next"]);
  });

  it("isolates nested clears and recovers after a thrown hook", () => {
    let nested = false;
    const calls: string[] = [],
      plugin: IContainerPlugin = {
        canvasPaint: () => false,
        draw: () => undefined,
      },
      { render } = setup([plugin]);

    plugin.canvasClear = () => {
      calls.push(nested ? "nested" : "outer");
      if (!nested) {
        nested = true;
        render.clear();
        nested = false;
      }

      return false;
    };
    render.clear();
    expect(calls).toEqual(["outer", "nested"]);
    plugin.canvasClear = () => {
      throw new Error("clear hook");
    };
    expect(() => render.clear()).toThrow("clear hook");
    plugin.canvasClear = () => false;
    expect(render.clear()).toBeUndefined();
  });

  it("honors disabled plain clearing while still invoking hooks", () => {
    const plugin = { canvasClear: vi.fn(() => false) },
      { container, context, render } = setup([plugin]);

    container.actualOptions.clear = false;
    render.clear();
    expect(plugin.canvasClear).toHaveBeenCalledOnce();
    expect(context.clearRect).not.toHaveBeenCalled();
  });

  it("preserves frame hook order and uses every relevant layer", () => {
    const calls: string[] = [],
      plugin = {
        canvasClear: () => {
          calls.push("clear");

          return true;
        },
        canvasPaint: () => {
          calls.push("mask");

          return false;
        },
        drawSettingsSetup: () => {
          calls.push("setup");
        },
        draw: () => {
          calls.push("content");
        },
        clearDraw: () => {
          calls.push("clearDraw");
        },
        drawSettingsCleanup: () => {
          calls.push("cleanup");
        },
      },
      { container, render } = setup([plugin]);

    container.actualOptions.background.draw = () => {
      calls.push("background");
    };
    vi.spyOn(container.particles, "update").mockImplementation(() => {
      calls.push("update");
    });
    vi.spyOn(container.particles, "drawParticles").mockImplementation(() => {
      calls.push("particles");
    });
    render.drawParticles({ factor: 1, value: 16 });
    expect(calls).toEqual([
      "clear",
      "update",
      "background",
      "mask",
      "setup",
      "content",
      "particles",
      "clearDraw",
      "cleanup",
    ]);
  });

  it("restores image alpha when drawing fails", () => {
    const { context, render } = setup();

    vi.mocked(context.drawImage).mockImplementation(() => {
      throw new Error("image unavailable");
    });
    expect(() => {
      render.paintImage({} as HTMLImageElement, 0.25);
    }).toThrow("image unavailable");
    expect(context.globalAlpha).toBe(0.75);
  });

  it("releases the rendering context on destroy", () => {
    const { context, render } = setup(),
      draw = vi.fn();

    render.destroy();
    vi.mocked(context.clearRect).mockClear();
    expect(render.draw(draw)).toBeUndefined();
    render.stop();
    expect(draw).not.toHaveBeenCalled();
    expect(context.clearRect).not.toHaveBeenCalled();
  });
});

it("ignores HDR callbacks captured before stop or replacement", () => {
  const handlers: (() => void)[] = [],
    remove = vi.fn(),
    context = {
      clearRect: vi.fn(),
      fillRect: vi.fn(),
      getContextAttributes: () => ({ colorSpace: "srgb" }),
    },
    getContext = vi.fn(() => context),
    container = {
      actualOptions: {
        fullScreen: { enable: false },
        background: {},
        hdr: { enable: true, mode: "standard", peakNits: 400 },
      },
      retina: { pixelRatio: 1 },
      plugins: [],
      particleUpdaters: [],
    } as unknown as Container,
    manager = new CanvasManager({} as PluginManager, container);

  container.canvas = manager;
  vi.stubGlobal("matchMedia", () => ({
    matches: false,
    addEventListener: (_event: string, callback: () => void) => {
      handlers.push(callback);
    },
    removeEventListener: remove,
  }));
  manager.loadCanvas({
    width: 80,
    height: 60,
    getContext,
  } as unknown as OffscreenCanvas);
  manager.init();
  const first = handlers[0];

  manager.stop();
  getContext.mockClear();
  first();
  expect(getContext).not.toHaveBeenCalled();
  manager.init();
  getContext.mockClear();
  first();
  expect(getContext).not.toHaveBeenCalled();
  handlers[2]();
  expect(getContext).toHaveBeenCalledOnce();
  manager.destroy();
  expect(remove).toHaveBeenCalledTimes(4);
});

/** Makes a minimal particle whose draw inputs remain observable. */
function drawingParticle(id: number): Particle {
  return {
    id,
    options: { zIndex: { sizeRate: 0 } },
    zIndexFactor: 0,
    shape: "test",
    fillEnabled: true,
    getRadius: () => 3,
    getFillColor: () => ({ l: 0.5, c: 0.1, h: id * 60 }),
    getStrokeColor: () => undefined,
    getOpacity: () => ({ fillOpacity: 1, opacity: 1, strokeOpacity: 1 }),
    getPosition: () => ({ x: id * 10, y: 20 }),
    getTransformData: (transform: { a?: number }) => ({
      a: transform.a ?? 1,
      b: 0,
      c: 0,
      d: 1,
    }),
  } as unknown as Particle;
}

it("resets a particle transform after a throwing shape", () => {
  const { container, context, render } = setup(),
    failure = new Error("shape failed");

  Object.assign(context, {
    setTransform: vi.fn(),
    resetTransform: vi.fn(),
    beginPath: vi.fn(),
  });
  container.shapeDrawers.set("test", {
    draw: () => {
      throw failure;
    },
  });
  expect(() => {
    render.drawParticle(drawingParticle(1), { factor: 1, value: 16 });
  }).toThrow(failure);
  expect(context.resetTransform).toHaveBeenCalledOnce();
});

it("isolates reusable styles and transforms during nested particle drawing", () => {
  const { container, context, render } = setup(),
    colors: (string | CanvasGradient | CanvasPattern)[] = [],
    transforms: number[] = [],
    first = drawingParticle(1),
    second = drawingParticle(2);

  Object.assign(context, {
    setTransform: vi.fn(),
    resetTransform: vi.fn(),
    beginPath: vi.fn(),
    fill: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
  });
  container.shapeDrawers.set("test", {
    draw: (data) => {
      colors.push(data.context.fillStyle);
      transforms.push(data.transformData.a);
    },
  });
  container.particleUpdaters.push({
    init: () => undefined,
    isEnabled: () => true,
    update: () => undefined,
    getColorStyles: (particle) => ({
      fill: particle === first ? "red" : "blue",
    }),
    getTransformValues: (particle) => ({ a: particle === first ? 2 : 3 }),
    beforeDraw: (particle) => {
      if (particle === first) {
        render.drawParticle(second, { factor: 1, value: 16 });
      }
    },
  });
  render.initUpdaters();
  render.drawParticle(first, { factor: 1, value: 16 });
  expect(colors).toEqual(["blue", "red"]);
  expect(transforms).toEqual([3, 2]);
  expect(context.save).toHaveBeenCalledOnce();
  expect(context.restore).toHaveBeenCalledOnce();
});

it("does not let a disconnected MutationObserver repair the replacement scene", () => {
  const callbacks: MutationCallback[] = [],
    disconnect = vi.fn(),
    context = {
      clearRect: vi.fn(),
      fillRect: vi.fn(),
      getContextAttributes: () => ({ colorSpace: "srgb" }),
    },
    element = document.createElement("canvas"),
    container = {
      actualOptions: {
        fullScreen: { enable: false },
        style: {},
        background: {},
        hdr: { enable: false, mode: "standard", peakNits: 400 },
      },
      retina: { pixelRatio: 1 },
      plugins: [],
      particleUpdaters: [],
    } as unknown as Container,
    manager = new CanvasManager({} as PluginManager, container);

  vi.stubGlobal("matchMedia", undefined);
  vi.stubGlobal(
    "MutationObserver",
    class {
      disconnect = disconnect;
      observe = vi.fn();
      constructor(callback: MutationCallback) {
        callbacks.push(callback);
      }
    },
  );
  Object.defineProperty(element, "transferControlToOffscreen", {
    value: () => ({ width: 80, height: 60, getContext: () => context }),
  });
  container.canvas = manager;
  manager.loadCanvas(element);
  manager.init();
  manager.stop();
  const background = vi.spyOn(manager, "initBackground"),
    records = [
      { type: "attributes", attributeName: "style" },
    ] as MutationRecord[],
    observer = {} as MutationObserver;

  callbacks[0](records, observer);
  expect(background).not.toHaveBeenCalled();
  manager.init();
  background.mockClear();
  callbacks[0](records, observer);
  expect(background).not.toHaveBeenCalled();
  callbacks[1](records, observer);
  expect(background).toHaveBeenCalledOnce();
  manager.destroy();
  expect(disconnect).toHaveBeenCalled();
});

it("reapplies styles after external drawers mutate the context and preserves escaped draw data", () => {
  const { container, context, render } = setup(),
    styles: (string | CanvasGradient | CanvasPattern)[] = [],
    data: IShapeDrawData[] = [],
    first = drawingParticle(1),
    second = drawingParticle(2),
    plugins: IContainerPlugin[] = [
      {
        drawParticleTransform: (value) => {
          data.push(value);
        },
      },
    ];

  Object.assign(context, {
    setTransform: vi.fn(),
    resetTransform: vi.fn(),
    beginPath: vi.fn(),
    fill: vi.fn(),
  });
  Object.assign(container, { plugins });
  container.shapeDrawers.set("test", {
    draw: (value) => {
      styles.push(value.context.fillStyle);
      value.context.fillStyle = "green";
    },
  });
  container.particleUpdaters.push({
    init: () => undefined,
    isEnabled: () => true,
    update: () => undefined,
    getColorStyles: () => ({ fill: "red" }),
  });
  render.initUpdaters();
  render.drawParticle(first, { factor: 1, value: 16 });
  render.drawParticle(second, { factor: 1, value: 16 });
  expect(styles).toEqual(["red", "red"]);
  expect(data[0]).not.toBe(data[1]);
  expect(data[0].particle).toBe(first);
  expect(data[0].position.x).toBe(10);
  expect(data[1].particle).toBe(second);
  expect(data[1].position.x).toBe(20);
});

it.each([
  ["unsupported", "TSP-1101"],
  ["failed", "TSP-1102"],
])(
  "reports the stable production code for an %s canvas transfer",
  (mode, code) => {
    vi.stubEnv("NODE_ENV", "production");
    const element = document.createElement("canvas"),
      container = { retina: { pixelRatio: 1 } } as Container,
      manager = new CanvasManager({} as PluginManager, container);

    Object.defineProperty(element, "transferControlToOffscreen", {
      value:
        mode === "unsupported"
          ? undefined
          : () => {
              throw new Error("transfer rejected");
            },
    });
    expect(() => {
      manager.loadCanvas(element);
    }).toThrow(`[tsParticles Error ${code}]`);
  },
);
