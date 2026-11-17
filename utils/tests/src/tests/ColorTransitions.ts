/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type Container, tsParticles } from "@tsparticles/engine";
import {
  applyProgressOffset,
  getLifeProgress,
  interpolateStops,
} from "../../../../updaters/colorTransitions/src/Utils.js";
import { beforeAll, describe, expect, it } from "vitest";
import { ColorTransitions } from "../../../../updaters/colorTransitions/src/Options/Classes/ColorTransitions.js";
import type { ColorTransitionsParticle } from "../../../../updaters/colorTransitions/src/Types.js";
import { ColorTransitionsUpdater } from "../../../../updaters/colorTransitions/src/ColorTransitionsUpdater.js";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { loadColorTransitionsUpdater } from "../../../../updaters/colorTransitions/dist/esm/index.js";
import { loadHexColorPlugin } from "@tsparticles/plugin-hex-color";
import { loadHslColorPlugin } from "@tsparticles/plugin-hsl-color";
import { loadRgbColorPlugin } from "@tsparticles/plugin-rgb-color";

interface ColorTransitionsFixture {
  container: Container;
  particle: ColorTransitionsParticle;
  updater: ColorTransitionsUpdater;
}

globalThis.window = TestWindow;
let id = 0;

beforeAll(async () => {
  await loadHexColorPlugin(tsParticles);
  await loadHslColorPlugin(tsParticles);
  await loadRgbColorPlugin(tsParticles);
  await loadColorTransitionsUpdater(tsParticles);
});

/**
 * Creates a real container and particle with controlled color transitions options.
 * @param stops - The transition stops as plain config data.
 * @param sync - Whether the transition progress is synced across particles.
 * @returns The container, particle, and color transitions updater.
 */
async function fixture(stops: { offset: number; value: string }[], sync = true): Promise<ColorTransitionsFixture> {
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

    transitions.load({ lifetime: { enable: true, stops, sync } });
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

  it("reads life progress only for finite durations", () => {
    expect(getLifeProgress(undefined)).toBeUndefined();
    expect(getLifeProgress({ duration: -1, time: 10 })).toBeUndefined();
    expect(getLifeProgress({ duration: 0, time: 10 })).toBeUndefined();
    expect(getLifeProgress({ duration: 1000, time: 250 })).toBe(0.25);
    expect(getLifeProgress({ duration: 1000, time: 2000 })).toBe(1);
  });

  it("applies the per-particle offset with wrap-around", () => {
    expect(applyProgressOffset(0.25, 0)).toBe(0.25);
    expect(applyProgressOffset(1, 0)).toBe(1);
    expect(applyProgressOffset(0.75, 0.5)).toBeCloseTo(0.25, 5);
    expect(applyProgressOffset(1, 0.5)).toBeCloseTo(0.5, 5);
  });
});

describe("ColorTransitionsUpdater", () => {
  it("creates no state when the options are missing or disabled", async () => {
    const { container, particle, updater } = await fixture([{ offset: 0, value: "#ff0000" }]);

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

  it("keeps the base color when the particle has no finite lifetime", async () => {
    const { container, particle, updater } = await fixture([
      { offset: 0, value: "#ffff00" },
      { offset: 1, value: "#000000" },
    ]);

    try {
      expect(particle).toHaveProperty("colorTransitions.lifetime.enable", true);

      updater.update(particle, { factor: 1, value: 16.66 });
      expect(particle.colorTransitions?.lifetime.current).toBeUndefined();
      expect(updater.getColorStyles(particle, undefined as never, 0, 1)).toEqual({});
    } finally {
      container.destroy();
    }
  });

  it("transitions the fill color over the particle lifetime", async () => {
    const { container, particle, updater } = await fixture([
      { offset: 0, value: "#ffff00" },
      { offset: 1, value: "#000000" },
    ]);

    try {
      particle.life = { duration: 1000, time: 0 };
      updater.update(particle, { factor: 1, value: 16.66 });
      expect(particle.colorTransitions?.lifetime.current).toEqual({ h: 60, l: 50, s: 100 });
      expect(updater.isEnabled(particle)).toBe(true);

      particle.life = { duration: 1000, time: 500 };
      updater.update(particle, { factor: 1, value: 16.66 });
      expect(particle.colorTransitions?.lifetime.current).toEqual({ h: 30, l: 25, s: 50 });

      particle.life = { duration: 1000, time: 1000 };
      updater.update(particle, { factor: 1, value: 16.66 });
      expect(particle.colorTransitions?.lifetime.current).toEqual({ h: 0, l: 0, s: 0 });

      const styles = updater.getColorStyles(particle, undefined as never, 0, 1);

      expect(styles.fill).toBeDefined();
    } finally {
      container.destroy();
    }
  });

  it("sorts unsorted stops at init", async () => {
    const { container, particle } = await fixture([
      { offset: 1, value: "#000000" },
      { offset: 0, value: "#ffffff" },
      { offset: 0.5, value: "#ff0000" },
    ]);

    try {
      expect(particle.colorTransitions?.lifetime.stops.map(s => s.offset)).toEqual([0, 0.5, 1]);
    } finally {
      container.destroy();
    }
  });

  it("offsets the transition progress per particle when sync is disabled", async () => {
    const { container, particle, updater } = await fixture(
      [
        { offset: 0, value: "#000000" },
        { offset: 1, value: "#ffffff" },
      ],
      false,
    );

    try {
      const offset = particle.colorTransitions?.lifetime.offset;

      expect(offset).toBeDefined();
      expect(offset).toBeGreaterThanOrEqual(0);
      expect(offset).toBeLessThan(1);

      particle.life = { duration: 1000, time: 0 };
      updater.update(particle, { factor: 1, value: 16.66 });

      const expected = interpolateStops(particle.colorTransitions?.lifetime.stops ?? [], offset ?? 0);

      expect(particle.colorTransitions?.lifetime.current).toEqual(expected);
    } finally {
      container.destroy();
    }
  });

  it("loads options from plain config sources", async () => {
    const { container, particle, updater } = await fixture([{ offset: 0, value: "#ff0000" }]);

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
      expect(particle).toHaveProperty("colorTransitions.lifetime.stops.length", 2);
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
    const { container, particle, updater } = await fixture([
      { offset: 0, value: "#ff0000" },
      { offset: 1, value: "#000000" },
    ]);

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
    const { container, particle, updater } = await fixture([{ offset: 0, value: "#ff0000" }]);

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
