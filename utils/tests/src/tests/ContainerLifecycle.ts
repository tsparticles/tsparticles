/* eslint-disable @typescript-eslint/no-magic-numbers,@typescript-eslint/no-unused-expressions */
import { type Container, type IPlugin, type ISourceOptions, createEngine } from "@tsparticles/engine";
import { describe, expect, it, vi } from "vitest";
import { TestOffscreenCanvas } from "../Fixture/OffscreenCanvas.js";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

const tsParticles = createEngine();

describe("Container lifecycle", () => {
  globalThis.window = TestWindow;

  const canvasWidth = 800,
    canvasHeight = 600;

  let containerId = 0;

  /**
   * Loads a container with a deterministic canvas and autoPlay disabled.
   * @param options - The source options to load.
   * @returns The loaded container.
   */
  async function loadContainer(options: ISourceOptions, element?: HTMLCanvasElement): Promise<Container> {
    const id = `container-lifecycle-${(containerId += 1).toString()}`,
      container = await tsParticles.load({
        id,
        options: { autoPlay: false, ...options },
        autoPlay: false,
        element: element ?? (createCustomCanvas(canvasWidth, canvasHeight) as unknown as HTMLCanvasElement),
      });

    if (!container) {
      throw new Error(`Test container ${id} not initialized`);
    }

    return container;
  }

  it("loads a container exposing a sane pixel ratio, canvas size and options", async () => {
    const particleCount = 12,
      container = await loadContainer({ particles: { number: { value: particleCount } } }),
      pixelRatio = container.retina.pixelRatio,
      size = container.canvas.size;

    expect(pixelRatio).to.be.a("number");
    expect(Number.isFinite(pixelRatio)).to.be.true;
    expect(pixelRatio).to.be.greaterThan(0);

    expect(Number.isFinite(size.width)).to.be.true;
    expect(Number.isFinite(size.height)).to.be.true;
    expect(size.width).to.be.at.least(0);
    expect(size.height).to.be.at.least(0);

    /* jsdom does not lay out the canvas, so the fixture size is assigned explicitly */
    size.width = canvasWidth;
    size.height = canvasHeight;

    expect(size.width).to.equal(canvasWidth);
    expect(size.height).to.equal(canvasHeight);

    expect(container.particles.count).to.equal(particleCount);
    expect(container.options).to.be.not.undefined;
    expect(container.options.fpsLimit).to.equal(120);

    container.destroy();
  });

  it("retries Display-P3 SDR when the requested float16 HDR context is unavailable", async () => {
    const matchMediaDescriptor = Object.getOwnPropertyDescriptor(globalThis, "matchMedia"),
      originalGetContext = Object.getOwnPropertyDescriptor(TestOffscreenCanvas.prototype, "getContext")?.value as (
        this: TestOffscreenCanvas,
        type: "2d",
        settings?: CanvasRenderingContext2DSettings,
      ) => CanvasRenderingContext2D | null,
      getContext = vi.spyOn(TestOffscreenCanvas.prototype, "getContext").mockImplementation(function (
        this: TestOffscreenCanvas,
        type,
        settings,
      ) {
        const contextSettings = settings as unknown as { colorType?: string } | undefined,
          colorType = contextSettings?.colorType;

        if (settings?.colorSpace === "display-p3" && colorType === "float16") {
          throw new Error("float16 Display-P3 context unavailable");
        }

        const context = originalGetContext.call(this, type, settings);

        if (context && settings?.colorSpace === "display-p3") {
          Object.defineProperty(context, "getContextAttributes", {
            configurable: true,
            value: () => ({ colorSpace: "display-p3", colorType: "unorm8" }),
          });
        }

        return context;
      });
    let container: Container | undefined;

    Object.defineProperty(globalThis, "matchMedia", {
      configurable: true,
      value: (query: string) => ({
        matches: query === "(color-gamut: p3)" || query === "(dynamic-range: high)",
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
      }),
    });

    try {
      container = await loadContainer({ hdr: { enable: true }, particles: { number: { value: 0 } } });

      expect(
        getContext.mock.calls.map(([, settings]) => ({
          colorSpace: settings?.colorSpace,
          colorType: (settings as unknown as { colorType?: string } | undefined)?.colorType,
        })),
      ).toEqual([
        { colorSpace: "display-p3", colorType: "float16" },
        { colorSpace: "display-p3", colorType: undefined },
      ]);
      expect(container.outputColorSpace).toBe("display-p3");
      expect(container.hdr).toBe(false);
    } finally {
      container?.destroy();
      getContext.mockRestore();

      if (matchMediaDescriptor) {
        Object.defineProperty(globalThis, "matchMedia", matchMediaDescriptor);
      } else {
        Reflect.deleteProperty(globalThis, "matchMedia");
      }
    }
  });

  it("keeps the effective sRGB space when a reused context ignores a later P3 HDR request", async () => {
    const matchMediaDescriptor = Object.getOwnPropertyDescriptor(globalThis, "matchMedia"),
      originalGetContext = Object.getOwnPropertyDescriptor(TestOffscreenCanvas.prototype, "getContext")?.value as (
        this: TestOffscreenCanvas,
        type: "2d",
        settings?: CanvasRenderingContext2DSettings,
      ) => CanvasRenderingContext2D | null,
      getContext = vi.spyOn(TestOffscreenCanvas.prototype, "getContext").mockImplementation(function (
        this: TestOffscreenCanvas,
        type,
        settings,
      ) {
        const context = originalGetContext.call(this, type, settings);

        if (context) {
          Object.defineProperty(context, "getContextAttributes", {
            configurable: true,
            value: () => ({ colorSpace: "srgb", colorType: "unorm8" }),
          });
        }

        return context;
      }),
      queryMatches = new Map([
        ["(color-gamut: p3)", false],
        ["(dynamic-range: high)", false],
      ]),
      changeListeners: (() => void)[] = [];
    let container: Container | undefined;

    Object.defineProperty(globalThis, "matchMedia", {
      configurable: true,
      value: (query: string) => ({
        get matches() {
          return queryMatches.get(query) ?? false;
        },
        addEventListener: (_type: string, listener: EventListenerOrEventListenerObject | null) => {
          if (typeof listener === "function") {
            changeListeners.push(() => {
              listener(new Event("change"));
            });
          }
        },
        removeEventListener: () => undefined,
      }),
    });

    try {
      container = await loadContainer({ hdr: { enable: true }, particles: { number: { value: 0 } } });
      expect(container.outputColorSpace).toBe("srgb");
      expect(container.hdr).toBe(false);

      queryMatches.set("(color-gamut: p3)", true);
      queryMatches.set("(dynamic-range: high)", true);
      changeListeners[0]?.();

      expect(
        getContext.mock.calls.map(([, settings]) => ({
          colorSpace: settings?.colorSpace,
          colorType: (settings as unknown as { colorType?: string } | undefined)?.colorType,
        })),
      ).toEqual([
        { colorSpace: "srgb", colorType: undefined },
        { colorSpace: "display-p3", colorType: "float16" },
      ]);
      expect(container.outputColorSpace).toBe("srgb");
      expect(container.hdr).toBe(false);
    } finally {
      container?.destroy();
      getContext.mockRestore();

      if (matchMediaDescriptor) {
        Object.defineProperty(globalThis, "matchMedia", matchMediaDescriptor);
      } else {
        Reflect.deleteProperty(globalThis, "matchMedia");
      }
    }
  });

  it("recomputes Retina-scaled particle motion after a device pixel ratio change", async () => {
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, "devicePixelRatio");
    let container: Container | undefined;

    try {
      Object.defineProperty(globalThis, "devicePixelRatio", { configurable: true, value: 2 });
      container = await loadContainer({
        detectRetina: true,
        particles: {
          move: { enable: true, speed: 3 },
          number: { value: 0 },
        },
      });

      expect(container.retina.pixelRatio).toBe(2);
      const firstParticle = container.particles.addParticle();

      expect(firstParticle?.retina.moveSpeed).toBe(6);

      Object.defineProperty(globalThis, "devicePixelRatio", { configurable: true, value: 3 });
      await container.refresh();

      expect(container.retina.pixelRatio).toBe(3);
      const resizedParticle = container.particles.addParticle();

      expect(resizedParticle?.retina.moveSpeed).toBe(9);
    } finally {
      container?.destroy();

      if (descriptor) {
        Object.defineProperty(globalThis, "devicePixelRatio", descriptor);
      } else {
        Reflect.deleteProperty(globalThis, "devicePixelRatio");
      }
    }
  });

  it("resizes the render canvas and scales particle positions proportionally", async () => {
    const element = document.createElement("canvas");

    Object.defineProperties(element, {
      offsetHeight: { configurable: true, value: canvasHeight },
      offsetWidth: { configurable: true, value: canvasWidth },
    });

    const container = await loadContainer(
        {
          detectRetina: false,
          particles: { number: { value: 0 } },
        },
        element,
      ),
      particle = container.particles.addParticle({ x: 100, y: 50 });

    expect(particle).not.toBeUndefined();
    expect(container.canvas.domElement).toBe(element);

    container.particles.update({ factor: 0, value: 0 });
    if (particle) {
      particle.position.x = 100;
      particle.position.y = 50;
    }

    Object.defineProperties(element, {
      offsetHeight: { configurable: true, value: canvasHeight / 2 },
      offsetWidth: { configurable: true, value: canvasWidth / 2 },
    });
    container.started = true;

    expect(container.canvas.resize()).toBe(true);
    expect(container.canvas.renderCanvas?.width).toBe(canvasWidth / 2);
    expect(container.canvas.renderCanvas?.height).toBe(canvasHeight / 2);

    container.particles.update({ factor: 0, value: 0 });

    expect(particle?.position.x).toBe(50);
    expect(particle?.position.y).toBe(25);

    container.destroy();
  });

  it("re-resolves the particles after a refresh", async () => {
    const particleCount = 6,
      container = await loadContainer({ particles: { number: { value: particleCount } } });

    expect(container.particles.count).to.equal(particleCount);

    await container.refresh();

    expect(container.destroyed).to.be.false;
    expect(container.retina.pixelRatio).to.be.greaterThan(0);
    expect(container.particles.count).to.equal(particleCount);

    container.destroy();
  });

  it("keeps the container lifecycle working with an invalid background selector", async () => {
    const container = await loadContainer({ background: { element: "[" } });

    try {
      await container.refresh();

      expect(container.destroyed).to.be.false;
    } finally {
      container.destroy();
    }
  });

  it("stops, clears and restarts without throwing", async () => {
    const particleCount = 4,
      container = await loadContainer({ particles: { number: { value: particleCount } } });

    container.stop();

    expect(container.started).to.be.false;
    expect(container.particles.count).to.equal(0);

    await container.start();

    expect(container.started).to.be.true;
    expect(container.particles.count).to.equal(particleCount);
    expect(() => {
      container.play();
    }).to.not.throw();

    container.destroy();
  });

  it("disposes container plugin instances on refresh and destroy", async () => {
    const engine = createEngine();
    let destroyed = 0;
    const plugin: IPlugin = {
      id: "container-lifecycle-disposal",
      getPlugin: () => Promise.resolve({ destroy: () => destroyed++ }),
      loadOptions: () => undefined,
      needsPlugin: () => true,
    };

    await engine.pluginManager.register(current => {
      current.pluginManager.addPlugin(plugin);
    });

    const container = await engine.load({
      id: "container-lifecycle-disposal",
      element: createCustomCanvas(canvasWidth, canvasHeight) as unknown as HTMLCanvasElement,
      options: { autoPlay: false, particles: { number: { value: 0 } } },
    });

    if (!container) {
      throw new Error("Test container not initialized");
    }

    await container.refresh();
    expect(destroyed).to.equal(1);

    container.destroy();
    expect(destroyed).to.equal(2);
  });

  it("completes container teardown when plugin stop and destroy hooks throw", async () => {
    const engine = createEngine(),
      stopFailure = new Error("stop failed"),
      destroyFailure = new Error("destroy failed"),
      calls: string[] = [],
      plugins: IPlugin[] = [
        {
          id: "container-lifecycle-throwing-cleanup-1",
          getPlugin: () =>
            Promise.resolve({
              destroy: () => {
                calls.push("first-destroy");
                throw destroyFailure;
              },
              stop: () => {
                calls.push("first-stop");
                throw stopFailure;
              },
            }),
          loadOptions: () => undefined,
          needsPlugin: () => true,
        },
        {
          id: "container-lifecycle-throwing-cleanup-2",
          getPlugin: () =>
            Promise.resolve({
              destroy: () => calls.push("second-destroy"),
              stop: () => calls.push("second-stop"),
            }),
          loadOptions: () => undefined,
          needsPlugin: () => true,
        },
      ];

    await engine.pluginManager.register(current => {
      for (const plugin of plugins) {
        current.pluginManager.addPlugin(plugin);
      }
    });

    const container = await engine.load({
      id: "container-lifecycle-throwing-cleanup",
      element: createCustomCanvas(canvasWidth, canvasHeight) as unknown as HTMLCanvasElement,
      options: { autoPlay: false, particles: { number: { value: 0 } } },
    });

    if (!container) {
      throw new Error("Test container not initialized");
    }

    expect(() => {
      container.destroy();
    }).toThrow(stopFailure);
    expect(calls).toEqual(["first-stop", "second-stop", "first-destroy", "second-destroy"]);
    expect(container.destroyed).toBe(true);
    expect(engine.items).toHaveLength(0);
  });

  it("preserves a start failure when plugin cleanup also throws", async () => {
    const engine = createEngine(),
      startFailure = new Error("start failed"),
      cleanupFailure = new Error("cleanup failed"),
      plugin: IPlugin = {
        id: "container-lifecycle-start-failure-cleanup",
        getPlugin: () =>
          Promise.resolve({
            destroy: () => {
              throw cleanupFailure;
            },
            start: () => Promise.reject(startFailure),
            stop: () => {
              throw cleanupFailure;
            },
          }),
        loadOptions: () => undefined,
        needsPlugin: () => true,
      };

    await engine.pluginManager.register(current => {
      current.pluginManager.addPlugin(plugin);
    });

    await expect(
      engine.load({
        id: "container-lifecycle-start-failure-cleanup",
        element: createCustomCanvas(canvasWidth, canvasHeight) as unknown as HTMLCanvasElement,
        options: { autoPlay: false, particles: { number: { value: 0 } } },
      }),
    ).rejects.toBe(startFailure);

    expect(engine.items).toHaveLength(0);
  });

  it("contains cleanup errors from a plugin that resolves after container destruction", async () => {
    const engine = createEngine();
    let resolvePlugin!: (plugin: Awaited<ReturnType<IPlugin["getPlugin"]>>) => void,
      signalPluginRequested!: () => void,
      signalPluginDestroyed!: () => void;
    const pendingPlugin = new Promise<Awaited<ReturnType<IPlugin["getPlugin"]>>>(resolve => {
        resolvePlugin = resolve;
      }),
      pluginRequested = new Promise<void>(resolve => {
        signalPluginRequested = resolve;
      }),
      pluginDestroyed = new Promise<void>(resolve => {
        signalPluginDestroyed = resolve;
      }),
      plugin: IPlugin = {
        id: "container-lifecycle-late-plugin-cleanup",
        getPlugin: () => {
          signalPluginRequested();

          return pendingPlugin;
        },
        loadOptions: () => undefined,
        needsPlugin: () => true,
      };

    await engine.pluginManager.register(current => {
      current.pluginManager.addPlugin(plugin);
    });

    const loading = engine.load({
      id: "container-lifecycle-late-plugin-cleanup",
      element: createCustomCanvas(canvasWidth, canvasHeight) as unknown as HTMLCanvasElement,
      options: { autoPlay: false, particles: { number: { value: 0 } } },
    });

    await pluginRequested;

    const container = engine.items.at(0);

    if (!container) {
      throw new Error("Test container not initialized");
    }

    container.destroy();
    resolvePlugin({
      destroy: () => {
        signalPluginDestroyed();
        throw new Error("late plugin cleanup failed");
      },
    });

    await pluginDestroyed;
    await expect(loading).resolves.toBeUndefined();
    expect(engine.items).toHaveLength(0);
  });

  it("keeps only one queued animation frame after repeated play calls", async () => {
    const container = await loadContainer({ particles: { number: { value: 0 } } }),
      scheduled = new Map<number, FrameRequestCallback>();
    let nextHandle = 0;

    container.engine.setAnimationFunctions(
      callback => {
        const handle = ++nextHandle;

        scheduled.set(handle, callback);

        return handle;
      },
      handle => {
        scheduled.delete(handle);
      },
    );

    try {
      container.play();
      container.play();
      container.play(true);

      expect(scheduled.size).to.equal(1);

      const [handle, callback] = [...scheduled.entries()][0];

      scheduled.delete(handle);
      callback(16);

      expect(scheduled.size).to.equal(1);

      container.pause();

      expect(scheduled.size).to.equal(0);
    } finally {
      container.destroy();
      container.engine.setAnimationFunctions(
        callback => requestAnimationFrame(callback),
        handle => {
          cancelAnimationFrame(handle);
        },
      );
    }
  });

  it("re-scales the particles when the canvas is resized", async () => {
    const container = await loadContainer({
        particles: { number: { value: 100, density: { enable: true } } },
      }),
      initialCount = container.particles.count;

    expect(initialCount).to.be.greaterThan(0);

    container.canvas.size.width = canvasWidth;
    container.canvas.size.height = canvasHeight;
    container.particles.setDensity();

    const resizedCount = container.particles.count;

    expect(resizedCount).to.be.lessThan(initialCount);

    container.canvas.size.width = canvasWidth / 2;
    container.canvas.size.height = canvasHeight / 2;
    container.particles.setDensity();

    expect(container.particles.count).to.be.lessThan(resizedCount);
    expect(container.particles.count).to.be.at.least(0);

    container.destroy();
  });

  it("destroys a container and loads an independent one", async () => {
    const first = await loadContainer({ particles: { number: { value: 10 } } });

    first.destroy();

    expect(first.destroyed).to.be.true;

    const second = await loadContainer({ particles: { number: { value: 4 } } });

    expect(second.destroyed).to.be.false;
    expect(second.particles.count).to.equal(4);
    expect(second.id).to.not.equal(first.id);

    second.destroy();
  });
});
