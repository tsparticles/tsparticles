import { DivEvent, DivType, loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { Vector, tsParticles } from "@tsparticles/engine";
import { beforeAll, describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { divBounce } from "../../../../interactions/external/bounce/src/Utils.js";

globalThis.window = TestWindow;

const canvasSize = 600,
  edgeX = 100,
  middleY = 300,
  nearTopY = 150,
  nearBottomY = 450,
  testTimeout = 30000;

let nextId = 0;

/**
 * Creates a tall, narrow div (100x400 at 100,100) and a particle placed relative to it.
 * @param particleX - Horizontal position of the particle
 * @param particleY - Vertical position of the particle
 * @param velocityX - Horizontal velocity of the particle
 * @returns The particle velocity after the div bounce ran once
 */
async function bounceAgainstDiv(particleX: number, particleY: number, velocityX: number): Promise<{ vx: number }> {
  const container = await tsParticles.load({
    id: `bounce-div-${nextId++}`,
    element: createCustomCanvas(canvasSize, canvasSize) as unknown as HTMLCanvasElement,
    options: { autoPlay: false, particles: { number: { value: 0 }, move: { enable: true, speed: 2 } } },
  });

  if (!container) {
    throw new Error("Test container was not initialized");
  }

  const div = document.createElement("div");

  div.id = `bounce-target-${nextId}`;
  Object.defineProperties(div, {
    offsetLeft: { value: 100 },
    offsetTop: { value: 100 },
    offsetWidth: { value: 100 },
    offsetHeight: { value: 400 },
  });
  document.body.appendChild(div);

  try {
    const divEvent = new DivEvent();

    divEvent.selectors = `#${div.id}`;
    divEvent.enable = true;
    divEvent.mode = "bounce";
    divEvent.type = DivType.rectangle;

    const particle = container.particles.addParticle({ x: particleX, y: particleY });

    if (!particle) {
      throw new Error("Test particle was not initialized");
    }

    particle.velocity.setTo(Vector.create(velocityX, 0));
    container.particles.grid.insert(particle);

    divBounce(container, divEvent, "bounce", () => true);

    return { vx: particle.velocity.x };
  } finally {
    div.remove();
    container.destroy();
  }
}

describe("bounce on a rectangle div", () => {
  beforeAll(async () => {
    await loadInteractivityPlugin(tsParticles);
  });

  it(
    "bounces a particle that hits the left edge near the middle of the div",
    async () => {
      const result = await bounceAgainstDiv(edgeX, middleY, 1);

      expect(result.vx).to.be.lessThan(0);
    },
    testTimeout,
  );

  it(
    "bounces a particle that hits the left edge near the top of the div",
    async () => {
      const result = await bounceAgainstDiv(edgeX, nearTopY, 1);

      expect(result.vx).to.be.lessThan(0);
    },
    testTimeout,
  );

  it(
    "bounces a particle that hits the left edge near the bottom of the div",
    async () => {
      const result = await bounceAgainstDiv(edgeX, nearBottomY, 1);

      expect(result.vx).to.be.lessThan(0);
    },
    testTimeout,
  );
});
