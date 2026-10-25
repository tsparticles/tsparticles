/* eslint-disable @typescript-eslint/no-magic-numbers */
import { afterEach, describe, expect, it, vi } from "vitest";
import type { Container } from "../../../../engine/src/Core/Container.js";
import { EventListeners } from "../../../../engine/src/Core/Utils/EventListeners.js";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { tsParticles } from "@tsparticles/engine";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe.each(["window", "observer"])("resize listener lifecycle: %s", mode => {
  /**
   * Creates a resize listener with a controllable event source.
   * @returns the listeners and resize spies
   */
  function setup(): {
    disconnect: ReturnType<typeof vi.fn>;
    listeners: EventListeners;
    resize: () => void;
    windowResize: ReturnType<typeof vi.fn>;
  } {
    vi.useFakeTimers();
    let notifyObserver: ResizeObserverCallback | undefined;
    const canvas = document.createElement("canvas"),
      disconnect = vi.fn(),
      windowResize = vi.fn().mockResolvedValue(undefined);

    vi.stubGlobal(
      "ResizeObserver",
      mode === "window"
        ? undefined
        : class {
            disconnect = disconnect;
            observe = vi.fn();
            unobserve = vi.fn();

            constructor(callback: ResizeObserverCallback) {
              notifyObserver = callback;
            }
          },
    );
    const container = {
        actualOptions: { resize: { enable: true, delay: 0.5 } },
        canvas: { domElement: canvas, windowResize },
      } as unknown as Container,
      listeners = new EventListeners(container),
      resize = (): void => {
        if (mode === "window") {
          globalThis.dispatchEvent(new Event("resize"));
        } else {
          notifyObserver?.([{ target: canvas } as ResizeObserverEntry], {} as ResizeObserver);
        }
      };

    listeners.addListeners();
    return { listeners, resize, windowResize, disconnect };
  }

  it("cancels a pending resize when listeners are removed", async () => {
    const { listeners, resize, windowResize, disconnect } = setup();

    resize();
    listeners.removeListeners();
    await vi.runAllTimersAsync();
    expect(windowResize).not.toHaveBeenCalled();
    if (mode === "observer") {
      expect(disconnect).toHaveBeenCalledOnce();
    }
  });

  it("still debounces active listeners", async () => {
    const { listeners, resize, windowResize } = setup();

    try {
      resize();
      await vi.advanceTimersByTimeAsync(250);
      resize();
      await vi.advanceTimersByTimeAsync(499);
      expect(windowResize).not.toHaveBeenCalled();
      await vi.advanceTimersByTimeAsync(1);
      expect(windowResize).toHaveBeenCalledOnce();
    } finally {
      listeners.removeListeners();
    }
  });

  it("can be added again without running a stale resize", async () => {
    const { listeners, resize, windowResize } = setup();

    resize();
    listeners.removeListeners();
    listeners.addListeners();
    try {
      await vi.runAllTimersAsync();
      expect(windowResize).not.toHaveBeenCalled();
      resize();
      await vi.runAllTimersAsync();
      expect(windowResize).toHaveBeenCalledOnce();
    } finally {
      listeners.removeListeners();
    }
  });
});

describe("stopped container resize", () => {
  it("does not process a resize queued before stop", async () => {
    globalThis.window = TestWindow as unknown as Window & typeof globalThis;
    vi.stubGlobal("ResizeObserver", undefined);
    const container = await tsParticles.load({
      id: "pending-resize-stop",
      element: createCustomCanvas(800, 600) as unknown as HTMLCanvasElement,
      options: { autoPlay: false, resize: { enable: true, delay: 0.5 }, particles: { number: { value: 0 } } },
    });

    if (!container) {
      throw new Error("Container not initialized");
    }
    try {
      vi.useFakeTimers();
      const windowResize = vi.spyOn(container.canvas, "windowResize");

      globalThis.dispatchEvent(new Event("resize"));
      container.stop();
      await vi.runAllTimersAsync();
      expect(windowResize).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
      container.destroy();
    }
  });
});
