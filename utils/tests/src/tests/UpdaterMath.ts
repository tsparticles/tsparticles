/* eslint-disable */
import { type Container, type ISourceOptions, doublePI, tsParticles } from "@tsparticles/engine";
import { beforeAll, describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { loadHexColorPlugin } from "@tsparticles/plugin-hex-color";
import { loadGradientUpdater } from "@tsparticles/updater-gradient";
import { loadOrbitUpdater } from "@tsparticles/updater-orbit";
import { loadRollUpdater } from "@tsparticles/updater-roll";
import { loadTiltUpdater } from "@tsparticles/updater-tilt";
import { loadTwinkleUpdater } from "@tsparticles/updater-twinkle";
import { loadWobbleUpdater } from "@tsparticles/updater-wobble";

let containerId = 0;

/**
 * Loads a throwaway container for updater math tests.
 * @param options - The options to load
 * @returns the loaded container
 */
async function loadContainer(options: ISourceOptions): Promise<Container> {
  containerId += 1;

  const container = await tsParticles.load({
    id: `updater-math-${containerId.toString()}`,
    options,
    autoPlay: false,
    element: createCustomCanvas(800, 600) as unknown as HTMLCanvasElement,
  });

  if (!container) {
    throw new Error(`Error test container ${containerId.toString()} not initialized`);
  }

  return container;
}

/**
 * Resets the container with a single particle and returns it.
 * @param container - The container
 * @param particles - The particles options
 * @returns the single particle
 */
async function singleParticle(container: Container, particles: Record<string, unknown>): Promise<any> {
  await container.reset({
    particles: {
      number: { value: 1 },
      ...particles,
    },
  } as ISourceOptions);

  return container.particles.filter(() => true)[0];
}

describe("UpdaterMath", async () => {
  globalThis.window = TestWindow;

  beforeAll(async () => {
    await loadHexColorPlugin(tsParticles);
    await loadRollUpdater(tsParticles);
    await loadTiltUpdater(tsParticles);
    await loadOrbitUpdater(tsParticles);
    await loadWobbleUpdater(tsParticles);
    await loadGradientUpdater(tsParticles);
    await loadTwinkleUpdater(tsParticles);
  });

  it("RollUpdater initializes enabled roll state with normalized speed", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, {
        roll: { enable: true, speed: 360, mode: "horizontal" },
      });

    expect(particle.roll.enable).to.be.true;
    expect(particle.roll.horizontal).to.be.true;
    expect(particle.roll.vertical).to.be.false;
    expect(particle.roll.speed).to.equal(1);

    container.destroy(false);
  });

  it("RollUpdater disables roll state when not enabled", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, { roll: { enable: false } });

    expect(particle.roll.enable).to.be.false;
    expect(particle.roll.speed).to.equal(0);
    expect(particle.roll.angle).to.equal(0);

    container.destroy(false);
  });

  it("updateRoll advances the angle by speed * delta.factor and wraps at 2π", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, { roll: { enable: true, speed: 360, mode: "both" } });

    particle.roll.angle = 0;
    container.particles.update({ value: 16, factor: 0.5 });
    expect(particle.roll.angle).to.be.closeTo(0.5, 1e-9);

    particle.roll.angle = doublePI - 0.1;
    container.particles.update({ value: 16, factor: 1 });
    expect(particle.roll.angle).to.be.closeTo(doublePI - 0.1 + 1 - doublePI, 1e-9);

    container.destroy(false);
  });

  it("WobbleUpdater normalizes angle/move speed from options", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, {
        wobble: { enable: true, distance: 10, speed: { angle: 90, move: 0 } },
      });

    expect(particle.wobble.angleSpeed).to.equal(0.25);
    expect(particle.wobble.moveSpeed).to.equal(0);
    expect(particle.retina.wobbleDistance).to.equal(10);

    particle.wobble.angle = 0;
    container.particles.update({ value: 16, factor: 1 });
    expect(particle.wobble.angle).to.be.closeTo(0.25, 1e-9);

    container.destroy(false);
  });

  it("WobbleUpdater exposes a disabled state when not enabled", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, { wobble: { enable: false } });

    expect(particle.wobble.angle).to.equal(0);
    expect(particle.wobble.angleSpeed).to.equal(0);
    expect(particle.wobble.moveSpeed).to.equal(0);

    container.destroy(false);
  });

  it("TiltUpdater initializes degrees into radians and advances clockwise", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, {
        tilt: {
          enable: true,
          value: 0,
          direction: "clockwise",
          animation: { enable: true, speed: 360, decay: 0, sync: true },
        },
      });

    expect(particle.tilt.enable).to.be.true;

    const before = particle.tilt.value;

    container.particles.update({ value: 16, factor: 1 });

    expect(particle.tilt.value).to.be.greaterThan(before);

    container.destroy(false);
  });

  it("OrbitUpdater advances the orbit rotation when animation is enabled", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, {
        orbit: {
          enable: true,
          animation: { enable: true, speed: 1 },
          rotation: { value: 0 },
        },
      });

    particle.orbitRotation = 0;
    container.particles.update({ value: 16, factor: 1 });

    expect(particle.orbitRotation).to.be.closeTo(1, 1e-9);

    container.destroy(false);
  });

  it("OrbitUpdater keeps rotation when animation is disabled", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, {
        orbit: { enable: true, animation: { enable: false }, rotation: { value: 0 } },
      });

    particle.orbitRotation = 0;
    container.particles.update({ value: 16, factor: 1 });

    expect(particle.orbitRotation).to.equal(0);

    container.destroy(false);
  });

  it("GradientUpdater initializes gradient colors and advances the angle", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, {
        gradient: {
          type: "linear",
          angle: { value: 0, animation: { enable: true, speed: 360 } },
          colors: [
            { stop: 0, value: "#fff" },
            { stop: 1, value: "#000" },
          ],
        },
      });

    expect(particle.gradient).to.not.be.undefined;
    expect(particle.gradient.colors.length).to.equal(2);
    expect(particle.gradient.angle.value).to.equal(0);

    container.particles.update({ value: 16, factor: 1 });

    expect(particle.gradient.angle.value).to.be.greaterThan(0);

    container.destroy(false);
  });

  it("TwinkleUpdater loads twinkle options onto the particle", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, {
        twinkle: { particles: { enable: true, frequency: 0.5, opacity: 1 } },
      });

    expect(particle.options.twinkle).to.not.be.undefined;
    expect(particle.options.twinkle.particles.enable).to.be.true;
    expect(particle.options.twinkle.particles.frequency).to.equal(0.5);

    container.destroy(false);
  });
});
