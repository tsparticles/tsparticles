/* eslint-disable */
import { type ISourceOptions, defaultFps, millisecondsToSeconds, tsParticles } from "@tsparticles/engine";
import { beforeAll, describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { loadMovePlugin } from "@tsparticles/plugin-move";

type MoveOptions = NonNullable<NonNullable<ISourceOptions["particles"]>["move"]>;

async function simulateMove(fps: number, frames: number, move: MoveOptions) {
  const container = await tsParticles.load({
    autoPlay: false,
    element: createCustomCanvas(800, 600) as unknown as HTMLCanvasElement,
    options: {
      fpsLimit: fps,
      particles: { move: { enable: true, speed: 20, ...move }, number: { value: 1 } },
    },
  });

  if (!container) {
    throw new Error("Move timing test container not initialized");
  }

  try {
    const [particle] = container.particles.filter(() => true);

    if (!particle) {
      throw new Error("Move timing test particle not initialized");
    }

    particle.position.y = 300;
    particle.velocity.setTo({ x: 0, y: -1 });

    const delta = { value: millisecondsToSeconds / fps, factor: defaultFps / fps };

    for (let frame = 0; frame < frames; frame++) {
      container.particles.update(delta);
    }

    return { distance: 300 - particle.position.y, velocity: particle.velocity.y };
  } finally {
    container.destroy(false);
  }
}

describe("Move timing", () => {
  globalThis.window = TestWindow;

  beforeAll(async () => {
    await loadMovePlugin(tsParticles);
  });

  it("applies the same decay over equal elapsed time at 30, 60 and 120 FPS", async () => {
    const move = { decay: 0.1 },
      at60 = await simulateMove(60, 20, move),
      at30 = await simulateMove(30, 10, move),
      at120 = await simulateMove(120, 40, move);

    expect(at60.velocity).toBeCloseTo(-(0.9 ** 20), 10);

    for (const result of [at30, at120]) {
      expect(result.velocity).toBeCloseTo(at60.velocity, 10);
      expect(Math.abs(result.distance - at60.distance) / at60.distance).toBeLessThan(0.06);
    }
  });

  it("applies the same gravity acceleration over equal elapsed time", async () => {
    const move = { gravity: { enable: true, acceleration: 9.81 } },
      at60 = await simulateMove(60, 20, move),
      at30 = await simulateMove(30, 10, move);

    expect(at60.velocity).toBeGreaterThan(-1);
    expect(at30.velocity).toBeCloseTo(at60.velocity, 10);
  });

  it("scales displacement by elapsed time at the gravity speed limit", async () => {
    const move = { gravity: { enable: true, acceleration: 9.81, inverse: true, maxSpeed: 2 } },
      at60 = await simulateMove(60, 20, move),
      at30 = await simulateMove(30, 10, move);

    expect(at60.distance).toBeGreaterThan(0);
    expect(at30.distance).toBeCloseTo(at60.distance, 10);
    expect(at30.velocity).toBeCloseTo(at60.velocity, 10);
  });
});
