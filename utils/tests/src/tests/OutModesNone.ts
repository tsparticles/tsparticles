import { type Container, type ISourceOptions, OutMode, type Particle, tsParticles } from "@tsparticles/engine";
import { beforeAll, describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { loadOutModesUpdater } from "@tsparticles/updater-out-modes";

const canvasWidth = 200,
  canvasHeight = 100,
  testTimeout = 30000,
  moveDistance = 200,
  farOutside = 300,
  insideX = 100,
  insideY = 50,
  belowY = 400,
  stepValue = 16,
  stepFactor = 0.5;

let containerId = 0;

async function loadContainer(options: ISourceOptions): Promise<Container> {
  containerId += 1;

  const container = await tsParticles.load({
    id: `out-modes-none-${containerId.toString()}`,
    options,
    autoPlay: false,
    element: createCustomCanvas(canvasWidth, canvasHeight) as unknown as HTMLCanvasElement,
  });

  if (!container) {
    throw new Error(`Error test container ${containerId.toString()} not initialized`);
  }

  return container;
}

async function singleParticle(container: Container, particles: Record<string, unknown>): Promise<Particle> {
  await container.reset({
    particles: {
      number: { value: 1 },
      ...particles,
    },
  });

  const [particle] = container.particles.filter(() => true);

  return particle;
}

describe("OutMode.none with move distance", () => {
  globalThis.window = TestWindow;

  beforeAll(async () => {
    await loadOutModesUpdater(tsParticles);

    const boot = await loadContainer({});

    boot.destroy(false);
  }, testTimeout);

  const runOutside = async (distance: unknown, x: number, y: number, vx: number, vy: number): Promise<boolean> => {
    const container = await loadContainer({ autoPlay: false });

    try {
      const particle = await singleParticle(container, {
        move: { distance, outModes: { default: OutMode.none } },
      });

      particle.position.x = x;
      particle.position.y = y;
      particle.velocity.x = vx;
      particle.velocity.y = vy;

      container.particles.update({ value: stepValue, factor: stepFactor });

      return particle.destroyed;
    } finally {
      container.destroy(false);
    }
  };

  it(
    "destroys a particle that leaves the canvas when no distance is set",
    async () => {
      expect(await runOutside(undefined, insideX, -farOutside, 0, -1)).toBe(true);
    },
    testTimeout,
  );

  it(
    "keeps a distance-limited particle that leaves through the left side",
    async () => {
      expect(await runOutside(moveDistance, -farOutside, insideY, -1, 0)).toBe(false);
    },
    testTimeout,
  );

  it(
    "keeps a distance-limited particle that leaves through the top",
    async () => {
      expect(await runOutside(moveDistance, insideX, -farOutside, 0, -1)).toBe(false);
    },
    testTimeout,
  );

  it(
    "keeps a distance-limited particle that leaves through the bottom",
    async () => {
      expect(await runOutside(moveDistance, insideX, belowY, 0, 1)).toBe(false);
    },
    testTimeout,
  );
});
