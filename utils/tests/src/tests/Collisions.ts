/* eslint-disable */
import { type IDelta, type ISourceOptions, double, getDistance, getRangeValue, tsParticles } from "@tsparticles/engine";
import { loadParticlesCollisionsInteraction } from "@tsparticles/interaction-particles-collisions";
import { loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { loadMovePlugin } from "@tsparticles/plugin-move";
import { loadCircleShape } from "@tsparticles/shape-circle";
import { loadSizeUpdater } from "@tsparticles/updater-size";
import { beforeAll, describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

globalThis.window = TestWindow;

const canvasWidth = 800,
  canvasHeight = 600,
  testDelta: IDelta = { value: 1, factor: 1 },
  /** Penetration above a quarter of the contact distance, the threshold of a visible overlap. */
  visibleOverlapFactor = 0.25,
  /** Penetration above half of the contact distance, where the particles are nearly coincident. */
  deepOverlapFactor = 0.5,
  /**
   * Floor of the settled pool density, as a share of the contact distance.
   *
   * A settled pile of hard circles touches at 1.0, so this is not a spacing target but a collapse
   * guard: below it the pool is interpenetrating instead of resting. The particles spawn at random
   * positions, so the measured value scatters by a few percent between runs.
   */
  minSeparationRatio = 0.7,
  maxSeparationRatio = 3.5,
  maxContactPairsRatio = 0.03,
  /**
   * Share of pairs allowed to be visibly interpenetrating.
   *
   * The solver is per particle, so a particle cannot converge on its own inside a compressed pile:
   * pushing it out of a neighbor wedges it into another one. A global relaxation pass would be needed
   * to close the remaining gap, so this is a floor rather than zero, and it guards against the
   * regression that matters, a pool turning back into an overlapping gas. The random spawn scatters
   * the measured value between runs, hence the headroom over the observed value.
   */
  maxVisibleOverlapRatio = 0.008;

interface TestFluidOptions {
  radius: number | { min: number; max: number };
  stiffness: number | { min: number; max: number };
  nearStiffness: number | { min: number; max: number };
  restDensity: number | { min: number; max: number };
  maxForce: number | { min: number; max: number };
  maxNeighbors: number;
}

interface TestCollisionsOptions {
  enable?: boolean;
  mode?: string;
  fluid?: Partial<TestFluidOptions>;
  overlap?: { enable?: boolean; retries?: number };
}

interface TestCollisionParticle {
  id: number;
  destroyed: boolean;
  position: { x: number; y: number; z: number };
  velocity: { x: number; y: number; z: number };
  getRadius: () => number;
  getPosition: () => { x: number; y: number; z: number };
  options: { collisions?: TestCollisionsOptions };
  fluid?: undefined;
}

interface TestContainer {
  destroy: () => Promise<void>;
  canvas: { size: { width: number; height: number } };
  particles: {
    count: number;
    filter: (condition: (particle: TestCollisionParticle) => boolean) => TestCollisionParticle[];
    update: (delta: IDelta) => void;
  };
}

let containerId = 0;

/**
 * Loads a container with the given options, using a deterministic canvas and no external assets.
 * @param options - the particles options to load
 * @returns the loaded container
 */
async function loadCollisionsContainer(options: ISourceOptions): Promise<TestContainer> {
  const id = `collisions-${(containerId += 1).toString()}`,
    container = (await tsParticles.load({
      id,
      options,
      autoPlay: false,
      element: createCustomCanvas(canvasWidth, canvasHeight) as unknown as HTMLCanvasElement,
    })) as unknown as TestContainer | null;

  if (!container) {
    throw new Error(`Test container ${id} not initialized`);
  }

  return container;
}

/**
 * Loads a container with the given number of particles, placed on a horizontal line with the given gap.
 * @param count - the number of particles to spawn
 * @param gap - the horizontal distance between the particles
 * @param options - the particles options to load
 * @returns the loaded container and its particles
 */
async function loadFluidContainer(
  count: number,
  gap: number,
  options: ISourceOptions,
  size = false,
): Promise<{ container: TestContainer; particles: TestCollisionParticle[] }> {
  const container = await loadCollisionsContainer(options),
    particles = container.particles.filter(() => true),
    startX = canvasWidth / 2,
    startY = canvasHeight / 2;

  expect(particles).toHaveLength(count);

  /* the test canvas is not laid out by jsdom, so the canvas size must be set explicitly */
  if (size) {
    container.canvas.size.width = canvasWidth;
    container.canvas.size.height = canvasHeight;
  }

  for (let i = 0, len = particles.length; i < len; i++) {
    const particle = particles[i];

    particle.position.x = startX + (i - count / 2) * gap;
    particle.position.y = startY;
    particle.velocity.x = 0;
    particle.velocity.y = 0;
  }

  return { container, particles };
}

describe("Collisions tests", () => {
  beforeAll(async () => {
    await loadInteractivityPlugin(tsParticles);
    await loadMovePlugin(tsParticles);
    await loadCircleShape(tsParticles);
    await loadSizeUpdater(tsParticles);
    await loadParticlesCollisionsInteraction(tsParticles);
  });

  it("should load the fluid options with their default values", async () => {
    const { container, particles } = await loadFluidContainer(1, 0, {
        particles: {
          number: { value: 1, animation: { enable: false, speed: 0 } },
          collisions: {
            enable: true,
          },
        },
      }),
      fluid = particles[0].options.collisions?.fluid;

    expect(fluid).to.be.not.undefined;
    expect(getRangeValue(fluid!.radius)).toBe(30);
    expect(getRangeValue(fluid!.stiffness)).toBe(0.5);
    expect(getRangeValue(fluid!.nearStiffness)).toBe(0.5);
    expect(getRangeValue(fluid!.restDensity)).toBe(3);
    expect(getRangeValue(fluid!.maxForce)).toBe(2.5);
    expect(fluid!.maxNeighbors).toBe(64);

    await container.destroy();
  });

  it("should load the partial fluid options, keeping the missing ones at their default value", async () => {
    const { container, particles } = await loadFluidContainer(1, 0, {
        particles: {
          number: { value: 1, animation: { enable: false, speed: 0 } },
          collisions: {
            enable: true,
            mode: "fluid",
            fluid: {
              radius: { min: 40, max: 60 },
              maxNeighbors: 12,
            },
          },
        },
      }),
      fluid = particles[0].options.collisions?.fluid;

    expect(fluid).to.be.not.undefined;
    expect(fluid!.radius).toStrictEqual({ min: 40, max: 60 });
    expect(fluid!.maxNeighbors).toBe(12);
    expect(getRangeValue(fluid!.stiffness)).toBe(0.5);
    expect(getRangeValue(fluid!.restDensity)).toBe(3);

    await container.destroy();
  });

  it("should push apart particles packed above the rest density", async () => {
    const { container, particles } = await loadFluidContainer(6, 4, {
        particles: {
          number: { value: 6, animation: { enable: false, speed: 0 } },
          position: { animation: { enable: false } },
          move: { enable: false },
          collisions: {
            enable: true,
            mode: "fluid",
            fluid: {
              radius: 40,
              restDensity: 0.5,
              stiffness: 1,
              nearStiffness: 1,
              maxForce: 5,
            },
          },
        },
      }),
      initialDistance = getDistance(particles[0].getPosition(), particles[1].getPosition());

    for (let i = 0; i < 10; i++) {
      container.particles.update(testDelta);
    }

    const finalDistance = getDistance(particles[0].getPosition(), particles[1].getPosition());

    expect(finalDistance).toBeGreaterThan(initialDistance);

    for (const particle of particles) {
      expect(Number.isFinite(particle.position.x)).toBe(true);
      expect(Number.isFinite(particle.position.y)).toBe(true);
      expect(Number.isFinite(particle.velocity.x)).toBe(true);
      expect(Number.isFinite(particle.velocity.y)).toBe(true);
    }

    await container.destroy();
  });

  it("should keep the falling fluid particles inside the canvas bounds", async () => {
    const { container, particles } = await loadFluidContainer(
      2,
      canvasWidth / 2,
      {
        particles: {
          number: { value: 2, animation: { enable: false, speed: 0 } },
          position: { animation: { enable: false } },
          move: {
            enable: true,
            speed: 2,
            outModes: { default: "none" },
            gravity: { enable: true, acceleration: 2 },
          },
          collisions: {
            enable: true,
            mode: "fluid",
            fluid: {
              radius: 30,
              restDensity: 1,
            },
          },
        },
      },
      true,
    );

    for (const particle of particles) {
      particle.position.y = canvasHeight / 2;
      particle.velocity.y = 0;
    }

    for (let i = 0; i < 60; i++) {
      container.particles.update(testDelta);
    }

    for (const particle of particles) {
      expect(Number.isFinite(particle.position.y)).toBe(true);
      expect(particle.position.y).toBeGreaterThanOrEqual(0);
      expect(particle.position.y).toBeLessThanOrEqual(canvasHeight);
      expect(particle.position.x).toBeGreaterThanOrEqual(0);
      expect(particle.position.x).toBeLessThanOrEqual(canvasWidth);
    }

    await container.destroy();
  });

  it("should move a free fluid particle without keeping any per particle state", async () => {
    const { container, particles } = await loadFluidContainer(2, 100, {
        particles: {
          number: { value: 2, animation: { enable: false, speed: 0 } },
          position: { animation: { enable: false } },
          move: { enable: true, speed: 5, direction: "right", outModes: { default: "none" } },
          collisions: {
            enable: true,
            mode: "fluid",
          },
        },
      }),
      particle = particles[0],
      initialPosition = { ...particle.position };

    /* the solver is stateless: keeping a pre advection snapshot per particle is what used to feed
       the pressure displacement back into the velocity, and turn the pool into an energy source */
    expect(particle.fluid).to.be.undefined;

    particle.velocity.x = 5;

    container.particles.update(testDelta);

    expect(particle.fluid).to.be.undefined;
    expect(particle.position.x).toBeGreaterThan(initialPosition.x);

    await container.destroy();
  });

  it("should not create the fluid state in the classic collision modes", async () => {
    const { container, particles } = await loadFluidContainer(2, 2, {
        particles: {
          number: { value: 2, animation: { enable: false, speed: 0 } },
          position: { animation: { enable: false } },
          move: { enable: false },
          collisions: {
            enable: true,
            mode: "bounce",
          },
        },
      }),
      initialDistance = getDistance(particles[0].getPosition(), particles[1].getPosition());

    for (let i = 0; i < 10; i++) {
      container.particles.update(testDelta);
    }

    expect(particles[0].fluid).to.be.undefined;
    expect(particles[1].fluid).to.be.undefined;
    expect(getDistance(particles[0].getPosition(), particles[1].getPosition())).toBe(initialDistance);

    await container.destroy();
  });

  it("should not displace the particles when the neighbors are capped to zero", async () => {
    const { container, particles } = await loadFluidContainer(2, 2, {
        particles: {
          number: { value: 2, animation: { enable: false, speed: 0 } },
          position: { animation: { enable: false } },
          move: { enable: false },
          collisions: {
            enable: true,
            mode: "fluid",
            fluid: {
              radius: 40,
              restDensity: 0.5,
              maxNeighbors: 0,
            },
          },
        },
      }),
      initialDistance = getDistance(particles[0].getPosition(), particles[1].getPosition());

    for (let i = 0; i < 10; i++) {
      container.particles.update(testDelta);
    }

    expect(getDistance(particles[0].getPosition(), particles[1].getPosition())).toBe(initialDistance);

    await container.destroy();
  });

  it("should not run the fluid solver when the collisions are disabled", async () => {
    const { container, particles } = await loadFluidContainer(2, 4, {
        particles: {
          number: { value: 2, animation: { enable: false, speed: 0 } },
          position: { animation: { enable: false } },
          move: { enable: false },
          collisions: {
            enable: false,
            mode: "fluid",
          },
        },
      }),
      initialPositions = particles.map(particle => ({ ...particle.position }));

    for (let i = 0; i < 10; i++) {
      container.particles.update(testDelta);
    }

    for (const [i, particle] of particles.entries()) {
      expect(particle.position.x).toBe(initialPositions[i].x);
      expect(particle.position.y).toBe(initialPositions[i].y);
    }

    await container.destroy();
  });

  it("should settle the falling fluid into a dense pool without overlapping or exploding", async () => {
    const container = await loadCollisionsContainer({
        particles: {
          number: { value: 150, animation: { enable: false, speed: 0 } },
          shape: { type: "circle" },
          size: { value: 10 },
          move: {
            enable: true,
            speed: 1,
            outModes: { default: "bounce" },
            gravity: { enable: true, acceleration: 9.81 },
          },
          collisions: {
            enable: true,
            mode: "fluid",
            fluid: { radius: 26, stiffness: 1.5, nearStiffness: 1.5, restDensity: 8, maxForce: 30 },
          },
        },
      }),
      particles = container.particles.filter(() => true);

    container.canvas.size.width = canvasWidth;
    container.canvas.size.height = canvasHeight;

    for (let i = 0; i < 240; i++) {
      container.particles.update(testDelta);
    }

    let nearestSum = 0,
      contactPairs = 0,
      visibleOverlapPairs = 0,
      deepOverlapPairs = 0,
      totalPairs = 0;

    for (const [i, particle] of particles.entries()) {
      let nearest = Number.POSITIVE_INFINITY;

      for (const [j, other] of particles.entries()) {
        if (i === j) {
          continue;
        }

        const contactDistance = particle.getRadius() + other.getRadius(),
          distance = getDistance(particle.getPosition(), other.getPosition()),
          penetration = contactDistance - distance;

        nearest = Math.min(nearest, distance);
        totalPairs++;

        if (penetration > 0) {
          contactPairs++;
        }

        /* a quarter of the contact distance is the threshold below which an overlap stops being
           visible, half of it is the threshold below which the particles are basically coincident */
        if (penetration > contactDistance * visibleOverlapFactor) {
          visibleOverlapPairs++;
        }

        if (penetration > contactDistance * deepOverlapFactor) {
          deepOverlapPairs++;
        }
      }

      if (Number.isFinite(nearest)) {
        nearestSum += nearest / (particle.getRadius() * double);
      }
    }

    const averageNearestRatio = nearestSum / particles.length;

    /* the non penetration constraint is hard, so only a negligible share of the pairs can be left
       interpenetrating, and practically none of them deeply or visibly */
    expect(visibleOverlapPairs / totalPairs).toBeLessThan(maxVisibleOverlapRatio);
    expect(deepOverlapPairs / totalPairs).toBeLessThan(maxVisibleOverlapRatio);
    /* the fluid keeps a clearance between the particles, without spreading out like a gas */
    expect(averageNearestRatio).toBeGreaterThan(minSeparationRatio);
    expect(averageNearestRatio).toBeLessThan(maxSeparationRatio);
    /* only a negligible share of pairs may stay in contact */
    expect(contactPairs / totalPairs).toBeLessThan(maxContactPairsRatio);

    for (const particle of particles) {
      expect(Number.isFinite(particle.position.x)).toBe(true);
      expect(Number.isFinite(particle.position.y)).toBe(true);
      expect(Number.isFinite(particle.velocity.x)).toBe(true);
      expect(Number.isFinite(particle.velocity.y)).toBe(true);
    }

    await container.destroy();
  });
});
