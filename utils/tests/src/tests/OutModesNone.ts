/* eslint-disable */
import { type Container, type ISourceOptions, OutMode, tsParticles } from "@tsparticles/engine";
import { beforeAll, describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { loadOutModesUpdater } from "@tsparticles/updater-out-modes";

let containerId = 0;

async function loadContainer(options: ISourceOptions): Promise<Container> {
  containerId += 1;

  const container = await tsParticles.load({
    id: `out-modes-none-${containerId.toString()}`,
    options,
    autoPlay: false,
    element: createCustomCanvas(200, 100) as unknown as HTMLCanvasElement,
  });

  if (!container) {
    throw new Error(`Error test container ${containerId.toString()} not initialized`);
  }

  return container;
}

async function singleParticle(container: Container, particles: Record<string, unknown>): Promise<any> {
  await container.reset({
    particles: {
      number: { value: 1 },
      ...particles,
    },
  } as ISourceOptions);

  return container.particles.filter(() => true)[0];
}

describe("OutMode.none with move distance", async () => {
  globalThis.window = TestWindow;

  beforeAll(async () => {
    await loadOutModesUpdater(tsParticles);

    const boot = await loadContainer({});

    boot.destroy(false);
  }, 30000);

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

      container.particles.update({ value: 16, factor: 0.5 });

      return particle.destroyed as boolean;
    } finally {
      container.destroy(false);
    }
  };

  it("destroys a particle that leaves the canvas when no distance is set", async () => {
    expect(await runOutside(undefined, 100, -300, 0, -1)).to.be.true;
  }, 30000);

  it("keeps a distance-limited particle that leaves through the left side", async () => {
    expect(await runOutside(200, -300, 50, -1, 0)).to.be.false;
  }, 30000);

  it("keeps a distance-limited particle that leaves through the top", async () => {
    expect(await runOutside(200, 100, -300, 0, -1)).to.be.false;
  }, 30000);

  it("keeps a distance-limited particle that leaves through the bottom", async () => {
    expect(await runOutside(200, 100, 400, 0, 1)).to.be.false;
  }, 30000);
});
