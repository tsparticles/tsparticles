/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type Container, setRandom, tsParticles } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { Life } from "../../../../updaters/life/src/Options/Classes/Life.js";
import type { LifeParticle } from "../../../../updaters/life/src/Types.js";
import { LifeUpdater } from "../../../../updaters/life/src/LifeUpdater.js";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

interface LifeFixture {
  container: Container;
  particle: LifeParticle;
  updater: LifeUpdater;
}

globalThis.window = TestWindow as unknown as Window & typeof globalThis;
let id = 0;

/**
 * Creates a real container and particle with controlled life options.
 * @param width - Canvas width.
 * @param height - Canvas height.
 * @param count - Life count.
 * @param duration - Life duration in seconds.
 * @param delay - Spawn delay in seconds.
 * @returns The container, particle, and life updater.
 */
async function fixture(width = 800, height = 200, count = 2, duration = 0.001, delay = 0): Promise<LifeFixture> {
  const container = await tsParticles.load({
    id: `life-respawn-${id++}`,
    element: createCustomCanvas(width, height) as unknown as HTMLCanvasElement,
    options: { autoPlay: false, particles: { number: { value: 0 } } },
  });
  if (!container) {
    throw new Error("Missing test container");
  }
  try {
    container.canvas.size.width = width;
    container.canvas.size.height = height;
    const particle = container.particles.addParticle({ x: 10, y: 10 });
    if (!particle) {
      throw new Error("Missing test particle");
    }
    const life = new Life();
    life.count = count;
    life.duration.sync = true;
    life.duration.value = duration;
    life.delay.sync = true;
    life.delay.value = delay;
    particle.options.life = life;
    const updater = new LifeUpdater(container);
    updater.init(particle);
    return { container, particle, updater };
  } catch (error) {
    container.destroy();
    throw error;
  }
}

type Fixture = LifeFixture;
/**
 * Restores the shared random source and container after every assertion.
 * @param test - Assertions for this fixture.
 * @param args - Fixture settings.
 */
async function run(test: (value: Fixture) => void, ...args: Parameters<typeof fixture>): Promise<void> {
  const value = await fixture(...args);
  try {
    setRandom(() => 0.75);
    test(value);
  } finally {
    setRandom();
    value.container.destroy();
  }
}

const delta = { value: 1, factor: 1 };

describe("Life respawn canvas bounds", () => {
  for (const [width, height] of [
    [800, 200],
    [200, 800],
    [400, 400],
    [800, 0],
    [0, 800],
  ]) {
    it(`uses each canvas dimension for ${width} by ${height}`, async () => {
      await run(
        ({ particle, updater }) => {
          updater.update(particle, delta);
          expect(particle.position.x).toBe(width * 0.75);
          expect(particle.position.y).toBe(height * 0.75);
          expect(particle.life?.count).toBe(1);
          expect(particle.life?.time).toBe(0);
          expect(particle.life?.delayTime).toBe(0);
          expect(particle.spawning).toBe(true);
          expect(particle.destroyed).toBe(false);
        },
        width,
        height,
      );
    });
  }

  it("reads the current dimensions after resize", async () => {
    await run(({ container, particle, updater }) => {
      container.canvas.size.width = 300;
      container.canvas.size.height = 900;
      updater.update(particle, delta);
      expect(particle.position.x).toBe(225);
      expect(particle.position.y).toBe(675);
    });
  });

  it("draws the two coordinates independently", async () => {
    await run(({ particle, updater }) => {
      const values = [0.25, 0.875];
      setRandom(() => values.shift() ?? 0.5);
      updater.update(particle, delta);
      expect(particle.position.x).toBe(200);
      expect(particle.position.y).toBe(175);
    });
  });

  for (const random of [0, 0.999999]) {
    it(`keeps a respawn in bounds at random ${random}`, async () => {
      await run(({ particle, updater }) => {
        setRandom(() => random);
        updater.update(particle, delta);
        expect(particle.position.x).toBe(800 * random);
        expect(particle.position.y).toBe(200 * random);
      });
    });
  }

  it("does not reposition before the duration ends", async () => {
    await run(({ particle, updater }) => {
      updater.update(particle, { value: 0.5, factor: 0.5 });
      expect(particle.position.x).toBe(10);
      expect(particle.position.y).toBe(10);
      expect(particle.life?.count).toBe(2);
      expect(particle.life?.time).toBe(0.5);
    });
  });

  it("destroys the final life without repositioning", async () => {
    await run(
      ({ particle, updater }) => {
        updater.update(particle, delta);
        expect(particle.destroyed).toBe(true);
        expect(particle.life?.count).toBe(0);
        expect(particle.position.x).toBe(10);
        expect(particle.position.y).toBe(10);
      },
      800,
      200,
      1,
    );
  });

  it("keeps an infinite duration at the original position", async () => {
    await run(
      ({ particle, updater }) => {
        updater.update(particle, delta);
        expect(particle.life?.duration).toBe(-1);
        expect(particle.position.x).toBe(10);
        expect(particle.position.y).toBe(10);
        expect(particle.life?.count).toBe(2);
      },
      800,
      200,
      2,
      0,
    );
  });

  it("respawns unlimited lives without decrementing the infinite count", async () => {
    await run(
      ({ particle, updater }) => {
        updater.update(particle, delta);
        expect(particle.life?.count).toBe(-1);
        expect(particle.position.y).toBe(150);
        expect(particle.destroyed).toBe(false);
      },
      800,
      200,
      0,
    );
  });

  it("waits through the delay and starts a full life before respawning", async () => {
    await run(
      ({ particle, updater }) => {
        updater.update(particle, delta);
        expect(particle.spawning).toBe(true);
        expect(particle.position.y).toBe(10);
        updater.update(particle, delta);
        expect(particle.spawning).toBe(false);
        expect(particle.life?.time).toBe(0);
        expect(particle.position.y).toBe(10);
        updater.update(particle, delta);
        expect(particle.position.y).toBe(150);
        expect(particle.spawning).toBe(true);
        expect(particle.life?.count).toBe(1);
        expect(particle.life?.delay).toBe(2);
        expect(particle.life?.duration).toBe(1);
      },
      800,
      200,
      2,
      0.001,
      0.002,
    );
  });

  it("does nothing for particles without life state", async () => {
    await run(({ particle, updater }) => {
      delete particle.life;
      updater.update(particle, delta);
      expect(particle.position.x).toBe(10);
      expect(particle.position.y).toBe(10);
    });
  });
});
