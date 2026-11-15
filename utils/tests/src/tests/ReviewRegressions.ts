import { describe, expect, it, vi } from "vitest";
import { AbsorbersPluginInstance } from "../../../../plugins/absorbers/src/AbsorbersPluginInstance.js";
import { EventListeners } from "../../../../engine/src/Core/Utils/EventListeners.js";
import { GifDrawer } from "../../../../shapes/gif/src/GifDrawer.js";
import { Responsive } from "../../../../plugins/responsive/src/Options/Classes/Responsive.js";
import { InteractivityEventListeners } from "../../../../plugins/interactivity/src/InteractivityEventListeners.js";
import { TestWindow } from "../Fixture/Window.js";
import { TestOffscreenCanvas, installTransferControlToOffscreen } from "../Fixture/OffscreenCanvas.js";
import { loadInteractivityPlugin } from "../../../../plugins/interactivity/src/index.js";
import { Vector, tsParticles } from "@tsparticles/engine";

const testOrbitRadius = 10;

describe("review regressions", () => {
  it("adds and removes listeners without a document in a worker", () => {
    vi.stubGlobal("document", undefined);

    try {
      const listeners = new EventListeners({ actualOptions: { resize: { enable: false } } } as never);

      listeners.addListeners();
      listeners.removeListeners();
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("does not retry a GIF after its particle is recycled as an image", () => {
    const retries: (() => void)[] = [],
      timeout = vi.spyOn(globalThis, "setTimeout");

    timeout.mockImplementation(((callback: () => void): number => {
      retries.push(callback);

      return 0;
    }) as typeof setTimeout);

    try {
      const drawer = new GifDrawer({} as never),
        particle = {
          shape: "gif",
          shapeData: { src: "pending.gif" },
          destroyed: false,
        };

      drawer.particleInit({ destroyed: false } as never, particle as never);
      particle.shape = "image";
      retries[0]?.();

      expect(timeout).toHaveBeenCalledTimes(1);
    } finally {
      timeout.mockRestore();
    }
  });

  it("mirrors tangential force for counterclockwise absorber orbits", () => {
    const orbitingAbsorber = {
        orbits: true,
        position: { x: 0, y: 0 },
        size: 1,
        getForce: () => Vector.origin,
        getAttraction: () => 1,
        attract: () => undefined,
      },
      attractingAbsorber = {
        orbits: false,
        getForce: () => Vector.create(0, 1),
        attract: () => undefined,
      },
      container = {
        canvas: { size: { width: 100, height: 100 } },
        retina: { reduceFactor: 1 },
      },
      instancesManager = {
        initContainer: () => undefined,
        getArray: () => [orbitingAbsorber, attractingAbsorber],
      },
      plugin = new AbsorbersPluginInstance(container as never, instancesManager as never),
      particle = {
        position: Vector.create(testOrbitRadius, 0),
        velocity: Vector.create(-1, 0),
        options: { move: { size: false } },
        retina: { moveSpeed: 0 },
        size: { max: 1 },
        absorberOrbit: undefined as Vector | undefined,
        getPosition() {
          return this.position;
        },
        getRadius: () => 1,
        destroyed: false,
        needsNewPosition: false,
      };

    plugin.particleUpdate(particle as never, { value: 1, factor: 1 });

    expect(particle.absorberOrbit?.angle).to.be.lessThan(0);
  });

  it("preserves drawable references in responsive backgrounds and mask covers", () => {
    const backgroundElement = document.createElement("canvas"),
      maskElement = document.createElement("canvas"),
      responsive = new Responsive();

    responsive.load({
      options: {
        background: { element: backgroundElement },
        backgroundMask: { cover: { element: maskElement } },
      },
    });

    const options = responsive.options as {
      background?: { element?: unknown };
      backgroundMask?: { cover?: { element?: unknown } };
    };

    expect(options.background?.element).to.equal(backgroundElement);
    expect(options.backgroundMask?.cover?.element).to.equal(maskElement);
  });

  it("cancels pending touchend finish timer on listener removal and rapid touchstart", () => {
    const el = document.createElement("canvas"),
      container = {
        actualOptions: {
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
            },
          },
        },
        canvas: {
          domElement: el,
          setPointerEvents: (): void => undefined,
        },
        plugins: [],
        retina: {
          pixelRatio: 1,
        },
      },
      interactionManager = {
        handleClickMode: (): void => undefined,
        interactivityData: {
          mouse: {
            position: { x: 50, y: 50 },
          },
        },
      },
      listeners = new InteractivityEventListeners(container as never, interactionManager as never),
      clearTimeoutSpy = vi.spyOn(globalThis, "clearTimeout"),
      setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");

    try {
      listeners.addListeners();

      const touchEndEvent = new Event("touchend");

      Object.defineProperty(touchEndEvent, "changedTouches", {
        value: [{ identifier: 1 }],
      });

      el.dispatchEvent(touchEndEvent);

      expect(setTimeoutSpy).toHaveBeenCalled();

      const lastTimerId = setTimeoutSpy.mock.results.at(-1)?.value as ReturnType<typeof setTimeout>;

      listeners.removeListeners();

      expect(clearTimeoutSpy).toHaveBeenCalledWith(lastTimerId);

      /* Rapid touchstart test */
      clearTimeoutSpy.mockClear();
      listeners.addListeners();
      el.dispatchEvent(touchEndEvent);

      const rapidTimerId = setTimeoutSpy.mock.results.at(-1)?.value as ReturnType<typeof setTimeout>,
        touchStartEvent = new Event("touchstart");

      Object.defineProperty(touchStartEvent, "touches", {
        value: [{ clientX: 10, clientY: 10, identifier: 2 }],
      });
      Object.defineProperty(touchStartEvent, "changedTouches", {
        value: [{ clientX: 10, clientY: 10, identifier: 2 }],
      });

      el.dispatchEvent(touchStartEvent);

      expect(clearTimeoutSpy).toHaveBeenCalledWith(rapidTimerId);
    } finally {
      listeners.removeListeners();
      clearTimeoutSpy.mockRestore();
      setTimeoutSpy.mockRestore();
    }
  });

  it("cancels pending touchend timer when container is destroyed", async () => {
    globalThis.window = TestWindow;
    (globalThis as { __VERSION__?: string }).__VERSION__ = "4.6.0";

    await loadInteractivityPlugin(tsParticles);

    const canvas = document.createElement("canvas");

    installTransferControlToOffscreen(canvas);

    const container = await tsParticles.load({
        id: "test-touch-leak-cleanup",
        element: canvas,
        options: {
          autoPlay: false,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
            },
          },
        },
      });

    if (!container) {
      throw new Error("Container not initialized");
    }

    await container.start();

    const interactivityContainer = container as {
      interactionManager?: {
        interactivityData: {
          mouse: {
            clicking: boolean;
            inside: boolean;
            position?: { x: number; y: number };
          };
        };
      };
    };

    if (interactivityContainer.interactionManager) {
      interactivityContainer.interactionManager.interactivityData.mouse.position = { x: 50, y: 50 };
    }

    const clearTimeoutSpy = vi.spyOn(globalThis, "clearTimeout"),
      setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");

    try {
      const targetEl =
        (interactivityContainer.interactionManager?.interactivityData.element as HTMLElement | undefined) ??
        container.canvas.domElement ??
        canvas;

      const touchEndEvent = new Event("touchend");

      Object.defineProperty(touchEndEvent, "changedTouches", {
        value: [{ identifier: 1 }],
      });

      targetEl.dispatchEvent(touchEndEvent);

      expect(setTimeoutSpy).toHaveBeenCalled();

      const lastTimerId = setTimeoutSpy.mock.results.at(-1)?.value as ReturnType<typeof setTimeout>;

      container.destroy();

      expect(clearTimeoutSpy).toHaveBeenCalledWith(lastTimerId);
    } finally {
      if (!container.destroyed) {
        container.destroy();
      }

      clearTimeoutSpy.mockRestore();
      setTimeoutSpy.mockRestore();
    }
  });
});
