/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type CustomEventArgs, EventType, tsParticles } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { EventDispatcher } from "../../../../engine/src/Utils/EventDispatcher.js";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

describe("event listener removal during dispatch", () => {
  it("notifies remaining listeners when a one-shot listener removes itself", async () => {
    globalThis.window = TestWindow as unknown as Window & typeof globalThis;
    const container = await tsParticles.load({
      id: "self-removing-container-listener",
      element: createCustomCanvas(800, 600) as unknown as HTMLCanvasElement,
      options: { autoPlay: false, particles: { number: { value: 0 } } },
    });

    if (!container) {
      throw new Error("Container not initialized");
    }
    const received: string[] = [],
      first = (args?: CustomEventArgs): void => {
        if (args?.container !== container) {
          return;
        }
        received.push("first");
        tsParticles.removeEventListener(EventType.containerPaused, first);
      },
      second = (args?: CustomEventArgs): void => {
        if (args?.container === container) {
          received.push("second");
        }
      };

    tsParticles.addEventListener(EventType.containerPaused, first);
    tsParticles.addEventListener(EventType.containerPaused, second);
    try {
      container.play();
      container.pause();
      expect(received).toEqual(["first", "second"]);
      container.play();
      container.pause();
      expect(received).toEqual(["first", "second", "second"]);
    } finally {
      tsParticles.removeEventListener(EventType.containerPaused, first);
      tsParticles.removeEventListener(EventType.containerPaused, second);
      container.destroy();
    }
  });
});

describe("event listener snapshots", () => {
  it("does not call a listener twice when it re-registers itself", () => {
    const dispatcher = new EventDispatcher(),
      received: string[] = [],
      first = (): void => {
        received.push("first");
        dispatcher.addEventListener("test", first);
      },
      second = (): void => {
        received.push("second");
      };

    dispatcher.addEventListener("test", first);
    dispatcher.addEventListener("test", second);
    dispatcher.dispatchEvent("test");
    expect(received).toEqual(["first", "second"]);
    dispatcher.dispatchEvent("test");
    expect(received).toEqual(["first", "second", "second", "first"]);
  });

  it("takes a fresh snapshot for a nested dispatch", () => {
    const dispatcher = new EventDispatcher(),
      received: string[] = [],
      first = (): void => {
        received.push("first");
        dispatcher.removeEventListener("test", first);
        dispatcher.dispatchEvent("test");
      },
      second = (): void => {
        received.push("second");
      };

    dispatcher.addEventListener("test", first);
    dispatcher.addEventListener("test", second);
    dispatcher.dispatchEvent("test");
    expect(received).toEqual(["first", "second", "second"]);
  });

  it("does not include newly added listeners until the next dispatch", () => {
    const dispatcher = new EventDispatcher(),
      received: string[] = [],
      added = (): void => {
        received.push("added");
      },
      first = (): void => {
        received.push("first");
        dispatcher.addEventListener("test", added);
      };

    dispatcher.addEventListener("test", first);
    dispatcher.dispatchEvent("test");
    expect(received).toEqual(["first"]);
    dispatcher.dispatchEvent("test");
    expect(received).toEqual(["first", "first", "added"]);
  });

  it("keeps the active snapshot when all listeners are cleared", () => {
    const dispatcher = new EventDispatcher(),
      received: string[] = [];

    dispatcher.addEventListener("test", () => {
      received.push("first");
      dispatcher.removeAllEventListeners("test");
    });
    dispatcher.addEventListener("test", () => {
      received.push("second");
    });
    dispatcher.dispatchEvent("test");
    dispatcher.dispatchEvent("test");
    expect(received).toEqual(["first", "second"]);
    expect(dispatcher.hasEventListener("test")).toBe(false);
  });
});
