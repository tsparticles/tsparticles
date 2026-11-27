import { type IParticlesOptions, tsParticles } from "@tsparticles/engine";
import { beforeAll, describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { TrailMaker } from "../../../../interactions/external/trail/src/TrailMaker.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";

globalThis.window = TestWindow;

const canvasSize = 200,
  mouseX = 20,
  mouseY = 150,
  bigDelta = 100000,
  testTimeout = 30000;

let nextId = 0;

/**
 * Runs one trail emit step and returns the particle options passed to particles.push.
 * @param weights - The weights of the hue component
 * @returns The options used for the emitted particles
 */
async function emitWithWeights(weights: { x?: number; y?: number }): Promise<IParticlesOptions | undefined> {
  const container = await tsParticles.load({
    id: `trail-coords-${nextId++}`,
    element: createCustomCanvas(canvasSize, canvasSize) as unknown as HTMLCanvasElement,
    options: {
      autoPlay: false,
      particles: { number: { value: 0 } },
    },
  });

  if (!container) {
    throw new Error("Test container was not initialized");
  }

  try {
    let received: unknown;

    container.particles.push = (_quantity, _position, options): undefined => {
      received = options;

      return undefined;
    };

    const maker = new TrailMaker(tsParticles.pluginManager, container),
      options = container.actualOptions as unknown as { interactivity?: { modes: unknown } },
      modes = options.interactivity?.modes;

    if (!modes) {
      throw new Error("Interactivity modes were not loaded");
    }

    maker.loadModeOptions(modes as never, { trail: { colorCoords: { h: { value: { min: 0, max: 360 }, weights } } } });

    maker.interact({ mouse: { position: { x: mouseX, y: mouseY } }, status: "pointermove" } as never, {
      value: bigDelta,
      factor: 1,
    });

    return received as IParticlesOptions | undefined;
  } finally {
    container.destroy();
  }
}

describe("trail colorCoords weights", () => {
  beforeAll(async () => {
    await loadInteractivityPlugin(tsParticles);
  });

  it(
    "applies the hue when only the x weight is set",
    async () => {
      const options = await emitWithWeights({ x: 1 });

      expect(JSON.stringify(options)).toContain('"h"');
    },
    testTimeout,
  );

  it(
    "applies the hue when only the y weight is set",
    async () => {
      const options = await emitWithWeights({ y: 1 });

      expect(JSON.stringify(options)).toContain('"h"');
    },
    testTimeout,
  );
});
