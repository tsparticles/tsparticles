import { beforeAll, describe, expect, it } from "vitest";
// Keep workspace imports grouped after external packages per repository convention.
// eslint-disable-next-line sort-imports
import { type ISourceOptions, defaultFps, millisecondsToSeconds, tsParticles } from "@tsparticles/engine";
import { loadMovePlugin } from "@tsparticles/plugin-move";
// eslint-disable-next-line sort-imports
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
// eslint-disable-next-line sort-imports
import { TestWindow } from "../Fixture/Window.js";

type MoveOptions = NonNullable<NonNullable<ISourceOptions["particles"]>["move"]>;

const canvasHeight = 600,
  canvasWidth = 800,
  comparisonPrecision = 10,
  decayAmount = 0.1,
  decayMultiplier = 0.9,
  strongDecayAmount = 0.8,
  strongDecayMultiplier = 0.2,
  distanceTolerance = 0.06,
  fps30 = 30,
  fps60 = 60,
  fps120 = 120,
  framesAt30Fps = 10,
  framesAt60Fps = 20,
  framesAt120Fps = 40,
  gravityAcceleration = 9.81,
  initialPositionY = 300,
  initialVelocityY = -1,
  maximumSpeed = 2,
  moveSpeed = 20;

async function simulateMove(
  fps: number,
  frames: number,
  move: MoveOptions,
): Promise<{ distance: number; velocity: number }> {
  const container = await tsParticles.load({
    autoPlay: false,
    element: createCustomCanvas(canvasWidth, canvasHeight) as unknown as HTMLCanvasElement,
    options: {
      fpsLimit: fps,
      particles: { move: { enable: true, speed: moveSpeed, ...move }, number: { value: 1 } },
    },
  });

  try {
    const [particle] = container.particles.filter(() => true);

    particle.position.y = initialPositionY;
    particle.velocity.setTo({ x: 0, y: initialVelocityY });

    const delta = { value: millisecondsToSeconds / fps, factor: defaultFps / fps };

    for (let frame = 0; frame < frames; frame++) {
      container.particles.update(delta);
    }

    return { distance: initialPositionY - particle.position.y, velocity: particle.velocity.y };
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
    const move = { decay: decayAmount },
      at60 = await simulateMove(fps60, framesAt60Fps, move),
      at30 = await simulateMove(fps30, framesAt30Fps, move),
      at120 = await simulateMove(fps120, framesAt120Fps, move);

    expect(at60.velocity).toBeCloseTo(-(decayMultiplier ** framesAt60Fps), comparisonPrecision);

    for (const result of [at30, at120]) {
      expect(result.velocity).toBeCloseTo(at60.velocity, comparisonPrecision);
      expect(Math.abs(result.distance - at60.distance) / at60.distance).toBeLessThan(distanceTolerance);
    }
  });

  it("integrates strong-decay displacement consistently over equal elapsed time", async () => {
    const move = { decay: strongDecayAmount },
      at60 = await simulateMove(fps60, framesAt60Fps, move),
      at30 = await simulateMove(fps30, framesAt30Fps, move),
      at120 = await simulateMove(fps120, framesAt120Fps, move);

    expect(at60.velocity).toBeCloseTo(-(strongDecayMultiplier ** framesAt60Fps), comparisonPrecision);
    expect(at30.velocity).toBeCloseTo(at60.velocity, comparisonPrecision);
    expect(at120.velocity).toBeCloseTo(at60.velocity, comparisonPrecision);
    expect(at30.distance).toBeCloseTo(at60.distance, comparisonPrecision);
    expect(at120.distance).toBeCloseTo(at60.distance, comparisonPrecision);
  });

  it("applies the same gravity acceleration over equal elapsed time", async () => {
    const move = { gravity: { enable: true, acceleration: gravityAcceleration } },
      at60 = await simulateMove(fps60, framesAt60Fps, move),
      at30 = await simulateMove(fps30, framesAt30Fps, move);

    expect(at60.velocity).toBeGreaterThan(initialVelocityY);
    expect(at30.velocity).toBeCloseTo(at60.velocity, comparisonPrecision);
  });

  it("applies gravity and decay consistently over equal elapsed time", async () => {
    const move = { decay: decayAmount, gravity: { enable: true, acceleration: gravityAcceleration } },
      at60 = await simulateMove(fps60, framesAt60Fps, move),
      at30 = await simulateMove(fps30, framesAt30Fps, move),
      at120 = await simulateMove(fps120, framesAt120Fps, move);

    expect(at30.velocity).toBeCloseTo(at60.velocity, comparisonPrecision);
    expect(at120.velocity).toBeCloseTo(at60.velocity, comparisonPrecision);
    expect(Math.abs(at30.distance - at60.distance) / at60.distance).toBeLessThan(distanceTolerance);
    expect(Math.abs(at120.distance - at60.distance) / at60.distance).toBeLessThan(distanceTolerance);
  });

  it("scales displacement by elapsed time at the gravity speed limit", async () => {
    const move = {
        gravity: { enable: true, acceleration: gravityAcceleration, inverse: true, maxSpeed: maximumSpeed },
      },
      at60 = await simulateMove(fps60, framesAt60Fps, move),
      at30 = await simulateMove(fps30, framesAt30Fps, move);

    expect(at60.distance).toBeGreaterThan(0);
    expect(at30.distance).toBeCloseTo(at60.distance, comparisonPrecision);
    expect(at30.velocity).toBeCloseTo(at60.velocity, comparisonPrecision);
  });
});
