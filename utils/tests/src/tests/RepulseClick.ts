/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type IInteractivityData, loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { type Particle, Vector, tsParticles } from "@tsparticles/engine";
import { beforeAll, describe, expect, it } from "vitest";
import { Repulse } from "../../../../interactions/external/repulse/src/Options/Classes/Repulse.js";
import type { RepulseContainer } from "../../../../interactions/external/repulse/src/Types.js";
import { Repulser } from "../../../../interactions/external/repulse/src/Repulser.js";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { loadMovePlugin } from "@tsparticles/plugin-move";

globalThis.window = TestWindow as unknown as Window & typeof globalThis;

const clickData: IInteractivityData = { mouse: { clickPosition: { x: 100, y: 100 }, clicking: false, inside: true } };
let nextId = 0;

/**
 * Creates a real container and grid around a particle with the required motion fields.
 * @param distance - Distance from click
 * @param speed - Repulse speed
 * @param enabled - Whether click mode is enabled
 * @returns The container, interactor, and particle
 */
async function fixture(
  distance: number,
  speed = 1,
  enabled = true,
): Promise<{ container: RepulseContainer; interactor: Repulser; particle: Particle }> {
  const base = await tsParticles.load({
    id: `click-repulse-${nextId++}`,
    element: createCustomCanvas(300, 300) as unknown as HTMLCanvasElement,
    options: { autoPlay: false, particles: { number: { value: 0 }, move: { enable: true, speed: 2 } } },
  });

  if (!base) {
    throw new Error("Test container was not initialized");
  }

  const container = base as RepulseContainer,
    interactivity = container.actualOptions.interactivity,
    repulse = new Repulse();

  if (!interactivity) {
    throw new Error("Interactivity options were not loaded");
  }
  interactivity.events.onClick.enable = enabled;
  interactivity.events.onClick.mode = "repulse";
  repulse.speed = speed;
  interactivity.modes.repulse = repulse;
  container.actualOptions.interactivity = interactivity;
  container.repulse = { clicking: true, particles: [] };
  container.retina.repulseModeDistance = 60;
  const particle = base.particles.addParticle({ x: 100 + distance, y: 100 });

  if (!particle) {
    throw new Error("Test particle was not initialized");
  }
  particle.velocity.setTo(Vector.create(1, 2));
  particle.initialVelocity.setTo(particle.velocity);
  container.particles.grid.insert(particle);

  const interactor = new Repulser(tsParticles.pluginManager, container);

  return { container, interactor, particle };
}

describe("click repulse", () => {
  beforeAll(async () => {
    await loadMovePlugin(tsParticles);
    await loadInteractivityPlugin(tsParticles);
  });
  it.each([0, 1, 10, -10])("keeps finite motion and restores initial velocity at distance %s", async distance => {
    const { container, interactor, particle } = await fixture(distance);

    try {
      interactor.interact(clickData);
      expect(Number.isFinite(particle.velocity.x)).toBe(true);
      expect(Number.isFinite(particle.velocity.y)).toBe(true);
      expect(particle.velocity.x).toBeCloseTo(distance === 0 ? 0 : (Math.sign(distance) * 1000) / distance ** 2);
      expect(particle.velocity.y).toBeCloseTo(0);
      const mover = container.plugins.find(plugin => plugin.constructor.name === "MovePluginInstance");

      if (!mover?.particleUpdate) {
        throw new Error("Move plugin was not initialized");
      }
      mover.particleUpdate(particle, { factor: 1, value: 16.67 });
      expect(Number.isFinite(particle.position.x)).toBe(true);
      expect(Number.isFinite(particle.position.y)).toBe(true);
      expect(container.repulse?.particles).toEqual([particle]);
      if (container.repulse) {
        container.repulse.clicking = false;
      }
      interactor.interact(clickData);
      expect(particle.velocity.x).toBe(1);
      expect(particle.velocity.y).toBe(2);
      expect(container.repulse?.particles).toEqual([]);
    } finally {
      container.destroy(false);
    }
  });

  it.each([0, 10])("keeps zero-speed repulsion finite at distance %s", async distance => {
    const { container, interactor, particle } = await fixture(distance, 0);

    try {
      interactor.interact(clickData);
      expect(particle.velocity.length).toBe(0);
    } finally {
      container.destroy(false);
    }
  });

  it.each(["outside", "disabled", "missing click"])("leaves %s particles unchanged", async control => {
    const { container, interactor, particle } = await fixture(
      control === "outside" ? 40 : 0,
      1,
      control !== "disabled",
    );

    try {
      interactor.interact(control === "missing click" ? { mouse: { clicking: false, inside: true } } : clickData);
      expect(particle.velocity.x).toBe(1);
      expect(particle.velocity.y).toBe(2);
      expect(container.repulse?.particles).toEqual([]);
    } finally {
      container.destroy(false);
    }
  });
});
