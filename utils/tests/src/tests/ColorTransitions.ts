/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
  type Container,
  type ISourceOptions,
  type RecursivePartial,
  getStyleFromHsl,
  tsParticles,
} from "@tsparticles/engine";
import {
  applyProgressOffset,
  getLifeProgress,
  interpolateStops,
} from "../../../../updaters/colorTransitions/src/Utils.js";
import { beforeAll, describe, expect, it } from "vitest";
import { ColorTransitions } from "../../../../updaters/colorTransitions/src/Options/Classes/ColorTransitions.js";
import type { ColorTransitionsParticle } from "../../../../updaters/colorTransitions/src/Types.js";
import { ColorTransitionsUpdater } from "../../../../updaters/colorTransitions/src/ColorTransitionsUpdater.js";
import type { ILifetimeColorTransitions } from "../../../../updaters/colorTransitions/src/Options/Interfaces/IColorTransitions.js";
import { Life } from "../../../../updaters/life/src/Options/Classes/Life.js";
import { LifeUpdater } from "../../../../updaters/life/src/LifeUpdater.js";
import { LifetimeColorTransitions } from "../../../../updaters/colorTransitions/src/Options/Classes/LifetimeColorTransitions.js";
import { TestWindow } from "../Fixture/Window.js";
import configs from "@tsparticles/configs";
import { createCanvas } from "@napi-rs/canvas";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { loadBasic } from "@tsparticles/basic";
import { loadColorTransitionsUpdater } from "../../../../updaters/colorTransitions/dist/esm/index.js";
import { loadLifeUpdater } from "@tsparticles/updater-life";

interface ColorTransitionsFixture {
  container: Container;
  particle: ColorTransitionsParticle;
  updater: ColorTransitionsUpdater;
}

globalThis.window = TestWindow;
let id = 0;

beforeAll(async () => {
  await loadBasic(tsParticles);
  await loadColorTransitionsUpdater(tsParticles);
  await loadLifeUpdater(tsParticles);
});

/**
 * Creates a real container and particle with controlled color transitions options.
 * @param lifetime - The lifetime transitions config data, always enabled.
 * @returns The container, particle, and color transitions updater.
 */
async function fixture(lifetime: RecursivePartial<ILifetimeColorTransitions>): Promise<ColorTransitionsFixture> {
  const container = await tsParticles.load({
    id: `color-transitions-${id++}`,
    element: createCustomCanvas(800, 200) as unknown as HTMLCanvasElement,
    options: { autoPlay: false, particles: { number: { value: 0 } } },
  });

  if (!container) {
    throw new Error("Missing test container");
  }

  try {
    const baseParticle = container.particles.addParticle({ x: 10, y: 10 });

    if (!baseParticle) {
      throw new Error("Missing test particle");
    }

    const particle: ColorTransitionsParticle = baseParticle,
      transitions = new ColorTransitions();

    transitions.load({ lifetime: { enable: true, ...lifetime } });
    particle.options.colorTransitions = transitions;

    const updater = new ColorTransitionsUpdater(tsParticles.pluginManager, container);

    updater.init(particle);

    return { container, particle, updater };
  } catch (error) {
    container.destroy();
    throw error;
  }
}

describe("ColorTransitionsUtils", () => {
  it("returns undefined for empty stops", () => {
    expect(interpolateStops([], 0.5)).toBeUndefined();
  });

  it("returns the single stop color for any progress", () => {
    const stops = [{ color: { h: 10, l: 20, s: 30 }, offset: 0.4 }];

    expect(interpolateStops(stops, 0)).toEqual({ h: 10, l: 20, s: 30 });
    expect(interpolateStops(stops, 1)).toEqual({ h: 10, l: 20, s: 30 });
  });

  it("clamps progress before the first and after the last stop", () => {
    const stops = [
      { color: { h: 0, l: 10, s: 20 }, offset: 0.25 },
      { color: { h: 100, l: 50, s: 60 }, offset: 0.75 },
    ];

    expect(interpolateStops(stops, 0)).toEqual({ h: 0, l: 10, s: 20 });
    expect(interpolateStops(stops, 1)).toEqual({ h: 100, l: 50, s: 60 });
  });

  it("interpolates linearly between surrounding stops", () => {
    const stops = [
      { color: { h: 0, l: 0, s: 0 }, offset: 0 },
      { color: { h: 100, l: 40, s: 80 }, offset: 1 },
    ];

    expect(interpolateStops(stops, 0.25)).toEqual({ h: 25, l: 10, s: 20 });
    expect(interpolateStops(stops, 0.5)).toEqual({ h: 50, l: 20, s: 40 });
    expect(interpolateStops(stops, 0.75)).toEqual({ h: 75, l: 30, s: 60 });
  });

  it("interpolates hue along the shortest path across the 0/360 boundary", () => {
    const stops = [
      { color: { h: 350, l: 50, s: 50 }, offset: 0 },
      { color: { h: 10, l: 50, s: 50 }, offset: 1 },
    ];

    expect(interpolateStops(stops, 0.5)?.h).toBeCloseTo(0, 5);
  });

  it("handles zero-width stop spans without dividing by zero", () => {
    const stops = [
      { color: { h: 0, l: 0, s: 0 }, offset: 0.5 },
      { color: { h: 100, l: 50, s: 50 }, offset: 0.5 },
    ];

    expect(interpolateStops(stops, 0.5)).toEqual({ h: 0, l: 0, s: 0 });
  });

  it("writes into the provided output object when interpolating", () => {
    const stops = [
        { color: { h: 0, l: 0, s: 0 }, offset: 0 },
        { color: { h: 100, l: 40, s: 80 }, offset: 1 },
      ],
      out = { h: 0, l: 0, s: 0 },
      result = interpolateStops(stops, 0.5, out);

    expect(result).toBe(out);
    expect(result).toEqual({ h: 50, l: 20, s: 40 });
  });

  it("reads life progress only for finite durations", () => {
    expect(getLifeProgress(undefined)).toBeUndefined();
    expect(getLifeProgress({ duration: -1, time: 10 })).toBeUndefined();
    expect(getLifeProgress({ duration: 0, time: 10 })).toBeUndefined();
    expect(getLifeProgress({ duration: Infinity, time: 10 })).toBeUndefined();
    expect(getLifeProgress({ duration: 1000, time: 250 })).toBe(0.25);
    expect(getLifeProgress({ duration: 1000, time: 2000 })).toBe(1);
  });

  it("reads the custom duration instead of the life duration", () => {
    expect(getLifeProgress({ duration: 2000, time: 250 }, 500)).toBe(0.5);
    expect(getLifeProgress({ duration: 2000, time: 1000 }, 500)).toBe(1);
    expect(getLifeProgress({ duration: 2000, time: 10 }, 0)).toBeUndefined();
    expect(getLifeProgress({ duration: 2000, time: 10 }, Infinity)).toBeUndefined();
  });

  it("needs a finite advancing life clock even with a custom duration", () => {
    // -1 is the life updater infinite duration: its clock never advances, so no transition can run.
    expect(getLifeProgress({ duration: -1, time: 0 }, 500)).toBeUndefined();
    expect(getLifeProgress({ duration: 0, time: 0 }, 500)).toBeUndefined();
    expect(getLifeProgress({ duration: Infinity, time: 0 }, 500)).toBeUndefined();
  });

  it("applies the per-particle offset with wrap-around", () => {
    expect(applyProgressOffset(0.25, 0)).toBe(0.25);
    expect(applyProgressOffset(1, 0)).toBe(1);
    expect(applyProgressOffset(0.75, 0.5)).toBeCloseTo(0.25, 5);
    expect(applyProgressOffset(1, 0.5)).toBeCloseTo(0.5, 5);
  });
});

describe("LifetimeColorTransitions options", () => {
  it("ignores a null stops list instead of crashing", () => {
    const lifetime = new LifetimeColorTransitions();

    expect(() => {
      lifetime.load({ enable: true, stops: null } as never);
    }).to.not.throw();
    expect(lifetime.enable).toBe(true);
    expect(lifetime.stops).toEqual([]);
  });

  it("ignores null channel stops instead of crashing", () => {
    const lifetime = new LifetimeColorTransitions();

    lifetime.load({ enable: true, fill: { stops: null }, stroke: { stops: null } } as never);
    expect(lifetime.fill?.stops).toEqual([]);
    expect(lifetime.stroke?.stops).toEqual([]);
  });

  it("preserves channel stops across layered loads and clears them explicitly", () => {
    const lifetime = new LifetimeColorTransitions();

    lifetime.load({ enable: true, fill: { stops: [{ offset: 0, value: "#ff0000" }] } });
    expect(lifetime.fill?.stops.length).toBe(1);

    // A layered load that omits the channel stops must not erase them.
    lifetime.load({ fill: {} });
    expect(lifetime.fill?.stops.length).toBe(1);

    // An explicit null or empty list clears the channel stops, restoring the shared fallback.
    lifetime.load({ fill: { stops: null } } as never);
    expect(lifetime.fill?.stops).toEqual([]);

    lifetime.load({ fill: { stops: [{ offset: 1, value: "#00ff00" }] } });
    expect(lifetime.fill?.stops.length).toBe(1);

    lifetime.load({ fill: { stops: [] } });
    expect(lifetime.fill?.stops).toEqual([]);
  });

  it("loads the custom duration and per-channel stops", () => {
    const lifetime = new LifetimeColorTransitions();

    lifetime.load({
      duration: 500,
      enable: true,
      fill: { stops: [{ offset: 0, value: "#ff0000" }] },
      stops: [
        { offset: 0, value: "#000000" },
        { offset: 1, value: "#ffffff" },
      ],
    });

    expect(lifetime.duration).toBe(500);
    expect(lifetime.stops.length).toBe(2);
    expect(lifetime.fill?.stops.length).toBe(1);
    expect(lifetime.stroke).toBeUndefined();
  });
});

describe("ColorTransitionsUpdater", () => {
  it("creates no state when the options are missing or disabled", async () => {
    const { container, particle, updater } = await fixture({ stops: [{ offset: 0, value: "#ff0000" }] });

    try {
      particle.options.colorTransitions = undefined;
      particle.colorTransitions = undefined;
      updater.init(particle);
      expect(particle.colorTransitions).toBeUndefined();

      const disabled = new ColorTransitions();

      disabled.load({ lifetime: { enable: false, stops: [{ offset: 0, value: "#ff0000" }] } });
      particle.options.colorTransitions = disabled;
      updater.init(particle);
      expect(particle.colorTransitions).toBeUndefined();
    } finally {
      container.destroy();
    }
  });

  it("keeps the base colors when the particle has no finite lifetime", async () => {
    const { container, particle, updater } = await fixture({
      stops: [
        { offset: 0, value: "#ffff00" },
        { offset: 1, value: "#000000" },
      ],
    });

    try {
      expect(particle).toHaveProperty("colorTransitions.lifetime.enable", true);

      updater.update(particle, { factor: 1, value: 16.66 });
      expect(particle.colorTransitions?.lifetime.fill?.current).toBeUndefined();
      expect(particle.colorTransitions?.lifetime.stroke?.current).toBeUndefined();
      expect(updater.getColorStyles(particle, undefined as never, 0, 1)).toEqual({});
    } finally {
      container.destroy();
    }
  });

  it("transitions both fill and stroke colors over the particle lifetime", async () => {
    const { container, particle, updater } = await fixture({
      stops: [
        { offset: 0, value: "#ffff00" },
        { offset: 1, value: "#000000" },
      ],
    });

    try {
      particle.life = { duration: 1000, time: 0 };
      updater.update(particle, { factor: 1, value: 16.66 });
      expect(particle.colorTransitions?.lifetime.fill?.current).toEqual({ h: 60, l: 50, s: 100 });
      expect(particle.colorTransitions?.lifetime.stroke?.current).toEqual({ h: 60, l: 50, s: 100 });
      expect(updater.isEnabled(particle)).toBe(true);

      particle.life = { duration: 1000, time: 500 };
      updater.update(particle, { factor: 1, value: 16.66 });
      expect(particle.colorTransitions?.lifetime.fill?.current).toEqual({ h: 30, l: 25, s: 50 });
      expect(particle.colorTransitions?.lifetime.stroke?.current).toEqual({ h: 30, l: 25, s: 50 });

      particle.life = { duration: 1000, time: 1000 };
      updater.update(particle, { factor: 1, value: 16.66 });
      expect(particle.colorTransitions?.lifetime.fill?.current).toEqual({ h: 0, l: 0, s: 0 });

      const styles = updater.getColorStyles(particle, undefined as never, 0, 1);

      expect(styles.fill).toBeDefined();
      expect(styles.stroke).toBeDefined();
    } finally {
      container.destroy();
    }
  });

  it("transitions only the stroke channel when only stroke stops are configured", async () => {
    const { container, particle, updater } = await fixture({
      stroke: {
        stops: [
          { offset: 0, value: "#000000" },
          { offset: 1, value: "#ffffff" },
        ],
      },
    });

    try {
      expect(particle.colorTransitions?.lifetime.fill).toBeUndefined();
      expect(particle.colorTransitions?.lifetime.stroke?.stops.length).toBe(2);

      particle.life = { duration: 1000, time: 500 };
      updater.update(particle, { factor: 1, value: 16.66 });

      const styles = updater.getColorStyles(particle, undefined as never, 0, 1);

      expect(styles.fill).toBeUndefined();
      expect(styles.stroke).toBeDefined();
    } finally {
      container.destroy();
    }
  });

  it("uses per-channel stops over the shared stops", async () => {
    const { container, particle, updater } = await fixture({
      fill: {
        stops: [
          { offset: 0, value: "#ff0000" },
          { offset: 1, value: "#0000ff" },
        ],
      },
      stops: [
        { offset: 0, value: "#ffffff" },
        { offset: 1, value: "#000000" },
      ],
    });

    try {
      expect(particle.colorTransitions?.lifetime.fill?.stops[0]?.color).toEqual({ h: 0, l: 50, s: 100 });
      expect(particle.colorTransitions?.lifetime.stroke?.stops[0]?.color).toEqual({ h: 0, l: 100, s: 0 });

      particle.life = { duration: 1000, time: 500 };
      updater.update(particle, { factor: 1, value: 16.66 });

      const styles = updater.getColorStyles(particle, undefined as never, 0, 1);

      expect(styles.fill).toBeDefined();
      expect(styles.stroke).toBeDefined();
    } finally {
      container.destroy();
    }
  });

  it("uses the custom duration instead of the life duration", async () => {
    const { container, particle, updater } = await fixture({
      duration: 0.5,
      stops: [
        { offset: 0, value: "#000000" },
        { offset: 1, value: "#ffffff" },
      ],
    });

    try {
      // The options duration is in seconds; the particle state runs on the life clock milliseconds.
      expect(particle.colorTransitions?.lifetime.duration).toBe(500);

      particle.life = { duration: 2000, time: 250 };
      updater.update(particle, { factor: 1, value: 16.66 });
      expect(particle.colorTransitions?.lifetime.fill?.current).toEqual({ h: 0, l: 50, s: 0 });

      particle.life = { duration: 2000, time: 1000 };
      updater.update(particle, { factor: 1, value: 16.66 });
      expect(particle.colorTransitions?.lifetime.fill?.current).toEqual({ h: 0, l: 100, s: 0 });
    } finally {
      container.destroy();
    }
  });

  it("follows the real life updater clock", async () => {
    const { container, particle, updater } = await fixture({
      stops: [
        { offset: 0, value: "#000000" },
        { offset: 1, value: "#ffffff" },
      ],
    });

    try {
      const life = new Life();

      life.count = 1;
      life.duration.sync = true;
      life.duration.value = 1;
      life.delay.sync = true;
      life.delay.value = 0;
      particle.options.life = life;

      const lifeUpdater = new LifeUpdater(container);

      lifeUpdater.init(particle);
      expect(particle.spawning).toBe(false);
      expect(particle.life?.duration).toBe(1000);

      lifeUpdater.update(particle, { factor: 1, value: 250 });
      updater.update(particle, { factor: 1, value: 250 });
      expect(particle.life?.time).toBe(250);
      expect(particle.colorTransitions?.lifetime.fill?.current).toEqual({ h: 0, l: 25, s: 0 });

      lifeUpdater.update(particle, { factor: 1, value: 250 });
      updater.update(particle, { factor: 1, value: 250 });
      expect(particle.colorTransitions?.lifetime.fill?.current).toEqual({ h: 0, l: 50, s: 0 });
    } finally {
      container.destroy();
    }
  });

  it("keeps the base colors on an infinite life clock, even with a custom duration", async () => {
    const { container, particle, updater } = await fixture({
      duration: 0.5,
      stops: [
        { offset: 0, value: "#000000" },
        { offset: 1, value: "#ffffff" },
      ],
    });

    try {
      const life = new Life();

      life.count = 0;
      life.duration.sync = true;
      life.duration.value = 0;
      life.delay.sync = true;
      life.delay.value = 0;
      particle.options.life = life;

      const lifeUpdater = new LifeUpdater(container);

      lifeUpdater.init(particle);

      // The life updater converts a zero duration to its infinite marker (-1) and never advances time.
      expect(particle.life?.duration).toBe(-1);

      lifeUpdater.update(particle, { factor: 1, value: 250 });
      updater.update(particle, { factor: 1, value: 250 });
      expect(particle.colorTransitions?.lifetime.fill?.current).toBeUndefined();
      expect(particle.colorTransitions?.lifetime.stroke?.current).toBeUndefined();
      expect(updater.getColorStyles(particle, undefined as never, 0, 1)).toEqual({});
    } finally {
      container.destroy();
    }
  });

  it("resolves the shared stops once for both channels", async () => {
    const { container, particle } = await fixture({
      stops: [
        { offset: 0, value: "random" },
        { offset: 1, value: "random" },
      ],
    });

    try {
      const fill = particle.colorTransitions?.lifetime.fill,
        stroke = particle.colorTransitions?.lifetime.stroke;

      expect(fill?.stops.length).toBe(2);
      expect(fill?.stops).toBe(stroke?.stops);
    } finally {
      container.destroy();
    }
  });

  it("reuses the interpolation output object across interior frames", async () => {
    const { container, particle, updater } = await fixture({
      stops: [
        { offset: 0, value: "#000000" },
        { offset: 1, value: "#ffffff" },
      ],
    });

    try {
      particle.life = { duration: 1000, time: 250 };
      updater.update(particle, { factor: 1, value: 16.66 });

      const first = particle.colorTransitions?.lifetime.fill?.current;

      particle.life = { duration: 1000, time: 500 };
      updater.update(particle, { factor: 1, value: 16.66 });

      const second = particle.colorTransitions?.lifetime.fill?.current;

      expect(first).toBeDefined();
      expect(second).toBe(first);
      expect(second).toEqual({ h: 0, l: 50, s: 0 });
    } finally {
      container.destroy();
    }
  });

  it("sorts unsorted stops at init", async () => {
    const { container, particle } = await fixture({
      stops: [
        { offset: 1, value: "#000000" },
        { offset: 0, value: "#ffffff" },
        { offset: 0.5, value: "#ff0000" },
      ],
    });

    try {
      expect(particle.colorTransitions?.lifetime.fill?.stops.map(s => s.offset)).toEqual([0, 0.5, 1]);
      expect(particle.colorTransitions?.lifetime.stroke?.stops.map(s => s.offset)).toEqual([0, 0.5, 1]);
    } finally {
      container.destroy();
    }
  });

  it("offsets the transition progress per particle when sync is disabled", async () => {
    const { container, particle, updater } = await fixture({
      stops: [
        { offset: 0, value: "#000000" },
        { offset: 1, value: "#ffffff" },
      ],
      sync: false,
    });

    try {
      const offset = particle.colorTransitions?.lifetime.offset;

      expect(offset).toBeDefined();
      expect(offset).toBeGreaterThanOrEqual(0);
      expect(offset).toBeLessThan(1);

      particle.life = { duration: 1000, time: 0 };
      updater.update(particle, { factor: 1, value: 16.66 });

      const expected = interpolateStops(particle.colorTransitions?.lifetime.fill?.stops ?? [], offset ?? 0);

      expect(particle.colorTransitions?.lifetime.fill?.current).toEqual(expected);
    } finally {
      container.destroy();
    }
  });

  it("loads options from plain config sources", async () => {
    const { container, particle, updater } = await fixture({ stops: [{ offset: 0, value: "#ff0000" }] });

    try {
      const options = particle.options;

      options.colorTransitions = undefined;
      updater.loadOptions(options, {
        colorTransitions: {
          lifetime: {
            enable: true,
            stops: [
              { offset: 0, value: "#ffff00" },
              { offset: 1, value: "#ff0000" },
            ],
            sync: false,
          },
        },
      });

      expect(options).toHaveProperty("colorTransitions.lifetime.enable", true);
      expect(options).toHaveProperty("colorTransitions.lifetime.sync", false);
      expect(options).toHaveProperty("colorTransitions.lifetime.stops.length", 2);

      particle.colorTransitions = undefined;
      updater.init(particle);
      expect(particle).toHaveProperty("colorTransitions.lifetime.enable", true);
      expect(particle).toHaveProperty("colorTransitions.lifetime.fill.stops.length", 2);
      expect(particle).toHaveProperty("colorTransitions.lifetime.stroke.stops.length", 2);
    } finally {
      container.destroy();
    }
  });

  it("clears stale state when a pooled particle is reused without the feature", async () => {
    const container = await tsParticles.load({
      id: `color-transitions-pool-${id++}`,
      element: createCustomCanvas(800, 200) as unknown as HTMLCanvasElement,
      options: { autoPlay: false, particles: { number: { value: 0 } } },
    });

    if (!container) {
      throw new Error("Missing test container");
    }

    try {
      const firstParticle = container.particles.addParticle(
        { x: 10, y: 10 },
        {
          colorTransitions: {
            lifetime: {
              enable: true,
              stops: [
                { offset: 0, value: "#ff0000" },
                { offset: 1, value: "#000000" },
              ],
              sync: true,
            },
          },
        },
      );

      expect(firstParticle).toBeDefined();

      if (!firstParticle) {
        throw new Error("Missing test particle");
      }

      const first = firstParticle as ColorTransitionsParticle,
        updater = container.particleUpdaters.find(u => u.constructor.name === "ColorTransitionsUpdater") as
          ColorTransitionsUpdater | undefined;

      expect(updater).toBeDefined();

      if (!updater) {
        throw new Error("Missing test updater");
      }

      expect(first.colorTransitions?.lifetime.enable).toBe(true);

      first.life = { duration: 1000, time: 0 };
      updater.update(first, { factor: 1, value: 16.66 });
      expect(updater.getColorStyles(first, undefined as never, 0, 1).fill).toBeDefined();

      container.particles.remove(first);

      const reusedParticle = container.particles.addParticle({ x: 20, y: 20 });

      // The pool must hand back the exact same instance.
      expect(reusedParticle).toBe(firstParticle);

      if (!reusedParticle) {
        throw new Error("Missing reused particle");
      }

      const reused = reusedParticle as ColorTransitionsParticle;

      expect(reused.options.colorTransitions).toBeUndefined();
      expect(reused.colorTransitions).toBeUndefined();
      expect(updater.isEnabled(reused)).toBe(false);
      expect(updater.getColorStyles(reused, undefined as never, 0, 1)).toEqual({});
    } finally {
      container.destroy();
    }
  });

  it("clears stale state when reused with disabled, empty, or invalid stops", async () => {
    const { container, particle, updater } = await fixture({
      stops: [
        { offset: 0, value: "#ff0000" },
        { offset: 1, value: "#000000" },
      ],
    });

    try {
      expect(particle.colorTransitions?.lifetime.enable).toBe(true);

      const variants: (ColorTransitions | undefined)[] = [undefined],
        disabled = new ColorTransitions();

      disabled.load({ lifetime: { enable: false, stops: [{ offset: 0, value: "#ff0000" }] } });
      variants.push(disabled);

      const empty = new ColorTransitions();

      empty.load({ lifetime: { enable: true, stops: [] } });
      variants.push(empty);

      const invalid = new ColorTransitions();

      invalid.load({ lifetime: { enable: true, stops: [{ offset: 0, value: "not-a-color" }] } });
      variants.push(invalid);

      for (const variant of variants) {
        particle.options.colorTransitions = variant;
        updater.init(particle);
        expect(particle.colorTransitions).toBeUndefined();
        expect(updater.isEnabled(particle)).toBe(false);
        expect(updater.getColorStyles(particle, undefined as never, 0, 1)).toEqual({});
      }
    } finally {
      container.destroy();
    }
  });

  it("reports enabled only for live, initialized particles", async () => {
    const { container, particle, updater } = await fixture({ stops: [{ offset: 0, value: "#ff0000" }] });

    try {
      expect(updater.isEnabled(particle)).toBe(true);

      particle.spawning = true;
      expect(updater.isEnabled(particle)).toBe(false);

      particle.spawning = false;
      particle.destroyed = true;
      expect(updater.isEnabled(particle)).toBe(false);
    } finally {
      container.destroy();
    }
  });
});

describe("ColorTransitions integration", () => {
  it("transitions fill and stroke through the real engine draw pipeline with the preset", async () => {
    const preset = (configs as Record<string, ISourceOptions | undefined>).colorTransitions;

    if (!preset) {
      throw new Error("Missing colorTransitions preset");
    }

    const container = await tsParticles.load({
      id: `color-transitions-draw-${id++}`,
      element: createCustomCanvas(800, 200) as unknown as HTMLCanvasElement,
      options: {
        ...preset,
        autoPlay: false,
        particles: { ...preset.particles, number: { value: 0 } },
      },
    });

    if (!container) {
      throw new Error("Missing test container");
    }

    const realCtx = createCanvas(800, 200).getContext("2d") as unknown as OffscreenCanvasRenderingContext2D;

    try {
      const baseParticle = container.particles.addParticle({ x: 400, y: 100 });

      if (!baseParticle) {
        throw new Error("Missing test particle");
      }

      const particle: ColorTransitionsParticle = baseParticle;

      // The preset options flow through the registered updaters: state for both channels exists
      // and the life updater built the real clock from the preset life options (5 seconds).
      expect(particle.colorTransitions?.lifetime.enable).toBe(true);
      expect(particle.colorTransitions?.lifetime.fill?.stops.length).toBe(3);
      expect(particle.colorTransitions?.lifetime.stroke?.stops.length).toBe(2);
      expect(particle.life?.duration).toBe(5000);

      const lifeUpdater = container.particleUpdaters.find(u => u.constructor.name === "LifeUpdater"),
        colorUpdater = container.particleUpdaters.find(u => u.constructor.name === "ColorTransitionsUpdater") as
          ColorTransitionsUpdater | undefined;

      if (!lifeUpdater || !colorUpdater) {
        throw new Error("Missing registered updaters");
      }

      // Advance half a life cycle through the real life updater, then run the transition update.
      lifeUpdater.update(particle, { factor: 1, value: 2500 });
      colorUpdater.update(particle, { factor: 1, value: 2500 });

      // Shared stops red -> green -> blue at half life: the fill is green.
      expect(particle.colorTransitions?.lifetime.fill?.current).toEqual({ h: 120, l: 50, s: 100 });
      // Stroke override white -> magenta at half life.
      expect(particle.colorTransitions?.lifetime.stroke?.current).toEqual({ h: 330, l: 75, s: 50 });

      // Draw through the real render manager into a real canvas 2d context, recording the
      // style assignments: the engine restores the context state after the draw, so the
      // transition styles can only be observed while the draw runs.
      const assigned: { fill?: string; stroke?: string } = {},
        ctx = new Proxy(realCtx, {
          get(target, property, receiver): unknown {
            const value = Reflect.get(target, property, receiver) as unknown;

            // Methods must run on the real context, not on the proxy.
            return typeof value === "function" ? (value as (...args: unknown[]) => unknown).bind(target) : value;
          },
          set(target, property, value): boolean {
            if (property === "fillStyle") {
              assigned.fill = value as string;
            } else if (property === "strokeStyle") {
              assigned.stroke = value as string;
            }

            return Reflect.set(target, property, value);
          },
        });

      container.canvas.render.setContext(ctx);

      particle.draw({ factor: 1, value: 0 });

      const { opacity } = particle.getOpacity(),
        styles = colorUpdater.getColorStyles(particle, ctx, 0, opacity),
        scratch = createCanvas(1, 1).getContext("2d") as unknown as OffscreenCanvasRenderingContext2D,
        normalize = (style: string | undefined): string | undefined => {
          if (style === undefined) {
            return undefined;
          }

          scratch.fillStyle = style;

          return scratch.fillStyle;
        };

      expect(styles.fill).toBeDefined();
      expect(styles.stroke).toBeDefined();
      expect(normalize(assigned.fill)).toBe(normalize(styles.fill));
      expect(normalize(assigned.stroke)).toBe(normalize(styles.stroke));

      // The drawn styles come from the transition, not the base paint colors.
      const fillColor = particle.getFillColor(),
        strokeColor = particle.getStrokeColor();

      if (!fillColor || !strokeColor) {
        throw new Error("Missing base paint colors");
      }

      expect(normalize(assigned.fill)).to.not.equal(
        normalize(getStyleFromHsl(fillColor, container.hdr, opacity, container.peakNits, container.hdrMode)),
      );
      expect(normalize(assigned.stroke)).to.not.equal(
        normalize(getStyleFromHsl(strokeColor, container.hdr, opacity, container.peakNits, container.hdrMode)),
      );
    } finally {
      // Restore the real context: the proxy is only needed to observe the style assignments.
      container.canvas.render.setContext(realCtx);
      container.destroy();
    }
  });
});
