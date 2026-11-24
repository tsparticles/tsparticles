import { describe, expect, it, vi } from "vitest";
import { AbsorbersPluginInstance } from "../../../../plugins/absorbers/src/AbsorbersPluginInstance.js";
import { EventListeners } from "../../../../engine/src/Core/Utils/EventListeners.js";
import { GifDrawer } from "../../../../shapes/gif/src/GifDrawer.js";
import { InteractivityEventListeners } from "../../../../plugins/interactivity/src/InteractivityEventListeners.js";
import { Responsive } from "../../../../plugins/responsive/src/Options/Classes/Responsive.js";
import { Vector } from "@tsparticles/engine";

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

  it("applies tap detection across the real pointer and touch event sequence", () => {
    const el = document.createElement("canvas"),
      handleClickMode = vi.fn(),
      data: {
        mouse: { clicking: boolean; inside: boolean; position?: { x: number; y: number } };
        status?: string;
      } = {
        mouse: { clicking: false, inside: false, position: { x: 50, y: 50 } },
      },
      makeListeners = (): InteractivityEventListeners => {
        data.mouse = { clicking: false, inside: false, position: { x: 50, y: 50 } };
        delete data.status;
        const container = {
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
            handleClickMode,
            interactivityData: data,
          };

        return new InteractivityEventListeners(container as never, interactionManager);
      },
      dispatchTouch = (type: string, identifier: number): void => {
        const event = new Event(type);

        Object.defineProperty(event, "touches", {
          value: [{ clientX: 10, clientY: 10, identifier }],
        });
        Object.defineProperty(event, "changedTouches", {
          value: [{ clientX: 10, clientY: 10, identifier }],
        });

        el.dispatchEvent(event);
      },
      dispatchPointer = (type: string, pointerType: string): void => {
        const event = new Event(type);

        Object.defineProperty(event, "pointerType", { value: pointerType });

        el.dispatchEvent(event);
      },
      quickTapMs = 100,
      longTapMs = 500,
      nowSpy = vi.spyOn(performance, "now"),
      time = { now: 1000 };

    nowSpy.mockImplementation(() => time.now);

    try {
      /* quick touch fires the click mode */
      let listeners = makeListeners();

      listeners.addListeners();
      dispatchTouch("touchstart", 1);
      time.now += quickTapMs;
      dispatchTouch("touchend", 1);

      expect(handleClickMode).toHaveBeenCalledWith("push");

      listeners.removeListeners();
      handleClickMode.mockClear();

      /* held touch is a movement, not a tap: no click mode, finished state */
      listeners = makeListeners();
      listeners.addListeners();
      dispatchTouch("touchstart", 2);
      time.now += longTapMs;
      dispatchTouch("touchend", 2);

      expect(handleClickMode).not.toHaveBeenCalled();
      expect(data.mouse.clicking).toBe(false);
      expect(data.status).toBe("pointerleave");

      listeners.removeListeners();
      handleClickMode.mockClear();

      /* held touch, real event order: pointerup must not click before the touchend guard */
      listeners = makeListeners();
      listeners.addListeners();
      dispatchPointer("pointerdown", "touch");
      dispatchTouch("touchstart", 1);
      time.now += longTapMs;
      dispatchPointer("pointerup", "touch");
      dispatchTouch("touchend", 1);

      expect(handleClickMode).not.toHaveBeenCalled();

      listeners.removeListeners();
      handleClickMode.mockClear();

      /* quick touch, real event order: exactly one click, fired by touchend */
      listeners = makeListeners();
      listeners.addListeners();
      dispatchPointer("pointerdown", "touch");
      dispatchTouch("touchstart", 1);
      time.now += quickTapMs;
      dispatchPointer("pointerup", "touch");
      dispatchPointer("pointerout", "touch");
      dispatchPointer("pointerleave", "touch");
      expect(data.mouse.position).toBeUndefined();
      dispatchTouch("touchend", 1);

      expect(handleClickMode).toHaveBeenCalledTimes(1);
      expect(handleClickMode).toHaveBeenCalledWith("push");

      listeners.removeListeners();
      handleClickMode.mockClear();

      /* mouse and pen pointerups keep firing the click mode directly */
      listeners = makeListeners();
      listeners.addListeners();
      dispatchPointer("pointerdown", "mouse");
      dispatchPointer("pointerup", "mouse");

      expect(handleClickMode).toHaveBeenCalledWith("push");

      handleClickMode.mockClear();
      dispatchPointer("pointerdown", "pen");
      dispatchPointer("pointerup", "pen");

      expect(handleClickMode).toHaveBeenCalledWith("push");

      listeners.removeListeners();
      handleClickMode.mockClear();

      /* a cancelled touch never fires the click mode */
      listeners = makeListeners();
      listeners.addListeners();
      dispatchTouch("touchstart", 1);
      time.now += quickTapMs;
      dispatchTouch("touchcancel", 1);

      expect(handleClickMode).not.toHaveBeenCalled();
      expect(data.mouse.clicking).toBe(false);
      expect(data.status).toBe("pointerleave");

      listeners.removeListeners();
    } finally {
      nowSpy.mockRestore();
    }
  });

  it.each([
    {
      name: "reentrant pointer update",
      duration: 100,
      move: false,
      cancel: false,
      enabled: true,
      count: 1,
      reentrant: true,
    },
    {
      name: "moved touch without plugin init",
      duration: 100,
      move: true,
      cancel: false,
      enabled: true,
      count: 0,
      skipInit: true,
    },
    {
      name: "existing position precedence",
      duration: 100,
      move: false,
      cancel: false,
      enabled: true,
      count: 1,
      hover: true,
    },
    {
      name: "plugin interception",
      duration: 100,
      move: false,
      cancel: false,
      enabled: true,
      count: 0,
      intercept: true,
    },
    { name: "staggered touches", duration: 100, move: false, cancel: false, enabled: true, count: 1, staggered: true },
    { name: "quick tap after boundary cleanup", duration: 100, move: false, cancel: false, enabled: true, count: 1 },
    {
      name: "multiple changed touches after boundary cleanup",
      duration: 100,
      move: false,
      cancel: false,
      enabled: true,
      count: 1,
      multiple: true,
    },
    { name: "held touch after boundary cleanup", duration: 500, move: false, cancel: false, enabled: true, count: 0 },
    { name: "moved touch after boundary cleanup", duration: 100, move: true, cancel: false, enabled: true, count: 0 },
    {
      name: "cancelled touch after boundary cleanup",
      duration: 100,
      move: false,
      cancel: true,
      enabled: true,
      count: 0,
    },
    {
      name: "disabled click after boundary cleanup",
      duration: 100,
      move: false,
      cancel: false,
      enabled: false,
      count: 0,
    },
  ])(
    "preserves $name",
    ({ duration, move, cancel, enabled, count, multiple, hover, intercept, staggered, reentrant, skipInit }) => {
      const el = document.createElement("canvas"),
        dispatchedPositions: ({ x: number; y: number } | undefined)[] = [],
        handleClickMode = vi.fn(() => {
          dispatchedPositions.push(data.mouse.position ? { ...data.mouse.position } : undefined);
          if (reentrant) {
            data.mouse.position = { x: 99, y: 77 };
          }
        }),
        data = { mouse: { clicking: false, inside: false } } as {
          mouse: {
            clicking: boolean;
            clickPosition?: { x: number; y: number };
            inside: boolean;
            position?: { x: number; y: number };
          };
          status?: string;
        },
        clickPositionValid = vi.fn(() => !!intercept),
        container = {
          actualOptions: {
            interactivity: { detectsOn: "canvas", events: { onClick: { enable: enabled, mode: "push" } } },
          },
          canvas: { domElement: el, setPointerEvents: (): void => undefined },
          plugins: [{ clickPositionValid }],
          retina: { pixelRatio: 2 },
        },
        listeners = new InteractivityEventListeners(container as never, { handleClickMode, interactivityData: data }),
        nowSpy = vi.spyOn(performance, "now"),
        touch = { identifier: 7, clientX: 40, clientY: 60 },
        secondTouch = { identifier: 8, clientX: 50, clientY: 70 },
        dispatch = (
          type: string,
          touches: (typeof touch)[] = [],
          changed = multiple ? [secondTouch, touch] : [touch],
        ): void => {
          const event = new Event(type);

          Object.defineProperties(event, {
            touches: { value: touches },
            changedTouches: { value: changed },
            pointerType: { value: "touch" },
          });
          el.dispatchEvent(event);
        };

      vi.spyOn(el, "getBoundingClientRect").mockReturnValue({ left: 10, top: 20 } as DOMRect);
      vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
      const startTime = 1000;

      nowSpy.mockReturnValue(startTime);
      if (!skipInit) {
        listeners.init();
      }
      listeners.addListeners();

      try {
        dispatch("pointerdown");
        dispatch("touchstart", multiple ? [secondTouch, touch] : [touch]);
        if (staggered) {
          dispatch("touchstart", [touch, secondTouch], [secondTouch]);
        }
        if (move) {
          dispatch("touchmove", [touch]);
        }
        nowSpy.mockReturnValue(startTime + duration);
        dispatch("pointerup");
        dispatch("pointerout");
        dispatch("pointerleave");
        expect(data.mouse.position).toBeUndefined();
        expect(data.mouse.inside).toBe(false);
        if (hover) {
          data.mouse.position = { x: 5, y: 9 };
        }
        dispatch(cancel ? "touchcancel" : "touchend", staggered ? [secondTouch] : []);
        expect(handleClickMode).toHaveBeenCalledTimes(count);
        let expectedPosition = hover ? { x: 5, y: 9 } : undefined;

        if (reentrant) {
          expectedPosition = { x: 99, y: 77 };
        }
        expect(data.mouse.position).toEqual(expectedPosition);
        expect(data.mouse.inside).toBe(!!hover || !!reentrant);
        expect(data.mouse.clicking).toBe(false);
        if (intercept) {
          expect(clickPositionValid).toHaveBeenCalledWith({ x: 60, y: 80 });
        }
        if (count) {
          expect(data.mouse.clickPosition).toEqual(hover ? { x: 5, y: 9 } : { x: 60, y: 80 });
          expect(dispatchedPositions).toEqual([hover ? { x: 5, y: 9 } : { x: 60, y: 80 }]);
          expect(handleClickMode).toHaveBeenCalledWith("push");
        }
        if (staggered) {
          handleClickMode.mockClear();
          dispatch("touchcancel", [], [secondTouch]);
          dispatch("pointerleave");
          dispatch("touchend", [], [secondTouch]);
          expect(handleClickMode).not.toHaveBeenCalled();
        }
        vi.runAllTimers();
        expect(data.mouse.clickPosition).toBeUndefined();
      } finally {
        listeners.removeListeners();
        nowSpy.mockRestore();
        vi.useRealTimers();
      }
    },
  );
});
