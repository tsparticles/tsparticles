/* eslint-disable */
import { AnimationStatus, type Container, type ISourceOptions, OutMode, tsParticles } from "@tsparticles/engine";
import { beforeAll, describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { loadDestroyUpdater } from "@tsparticles/updater-destroy";
import { loadHexColorPlugin } from "@tsparticles/plugin-hex-color";
import { loadLifeUpdater } from "@tsparticles/updater-life";
import { loadOpacityUpdater } from "@tsparticles/updater-opacity";
import { loadOutModesUpdater } from "@tsparticles/updater-out-modes";
import { loadPaintUpdater } from "@tsparticles/updater-paint";
import { loadRotateUpdater } from "@tsparticles/updater-rotate";
import { loadSizeUpdater } from "@tsparticles/updater-size";

let containerId = 0;

async function loadContainer(options: ISourceOptions): Promise<Container> {
  containerId += 1;

  const container = await tsParticles.load({
    id: `updaters-${containerId.toString()}`,
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

describe("Updaters", async () => {
  globalThis.window = TestWindow;

  beforeAll(async () => {
    await loadHexColorPlugin(tsParticles);
    await loadRotateUpdater(tsParticles);
    await loadSizeUpdater(tsParticles);
    await loadOpacityUpdater(tsParticles);
    await loadOutModesUpdater(tsParticles);
    await loadLifeUpdater(tsParticles);
    await loadDestroyUpdater(tsParticles);
    await loadPaintUpdater(tsParticles);

    const boot = await loadContainer({});

    boot.destroy(false);
  });

  it("RotateUpdater advances rotation by velocity * delta.factor", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, {
        rotate: { value: 0, direction: "clockwise", animation: { enable: true, speed: 10, sync: true } },
      });

    expect(particle.rotate).to.not.be.undefined;
    expect(particle.rotate.value).to.equal(0);

    const velocity = particle.rotate.velocity;

    container.particles.update({ value: 16, factor: 0.5 });

    expect(particle.rotate.value).to.be.closeTo(velocity * 0.5, 1e-9);
    expect(particle.rotation).to.equal(particle.rotate.value);

    container.destroy(false);
  }, 30000);

  it("SizeUpdater advances the size value by velocity * delta.factor", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, {
        size: {
          value: { min: 0, max: 10 },
          animation: { enable: true, mode: "increase", startValue: "min", speed: 100, sync: true },
        },
      });

    expect(particle.size.enable).to.be.true;
    expect(particle.size.value).to.equal(0);

    const velocity = particle.size.velocity;

    container.particles.update({ value: 16, factor: 0.5 });

    expect(particle.size.value).to.be.closeTo(velocity * 0.5, 1e-9);

    container.destroy(false);
  }, 30000);

  it("SizeUpdater clamps the size at the max bound and reverses direction", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, {
        size: {
          value: { min: 0, max: 10 },
          animation: { enable: true, mode: "increase", startValue: "min", speed: 100, sync: true },
        },
      });

    particle.size.value = particle.size.max - 0.001;

    container.particles.update({ value: 16, factor: 1 });

    expect(particle.size.value).to.equal(particle.size.max);
    expect(particle.size.status).to.equal(AnimationStatus.decreasing);

    container.destroy(false);
  }, 30000);

  it("SizeUpdater applies decay to the animation velocity", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, {
        size: {
          value: { min: 0, max: 100 },
          animation: { enable: true, mode: "increase", startValue: "min", speed: 100, sync: true, decay: 0.5 },
        },
      });

    const velocity = particle.size.velocity;

    container.particles.update({ value: 16, factor: 1 });

    expect(particle.size.velocity).to.be.closeTo(velocity * 0.5, 1e-9);

    container.destroy(false);
  }, 30000);

  it("OpacityUpdater advances the opacity value by velocity * delta.factor", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, {
        opacity: {
          value: { min: 0, max: 1 },
          animation: { enable: true, mode: "increase", startValue: "min", speed: 100, sync: true },
        },
      });

    expect(particle.opacity.enable).to.be.true;
    expect(particle.opacity.value).to.equal(0);

    const velocity = particle.opacity.velocity;

    container.particles.update({ value: 16, factor: 0.5 });

    expect(particle.opacity.value).to.be.closeTo(velocity * 0.5, 1e-9);

    container.destroy(false);
  }, 30000);

  it("OpacityUpdater clamps the opacity at the max bound", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, {
        opacity: {
          value: { min: 0, max: 1 },
          animation: { enable: true, mode: "increase", startValue: "min", speed: 100, sync: true },
        },
      });

    particle.opacity.value = particle.opacity.max - 0.001;

    container.particles.update({ value: 16, factor: 1 });

    expect(particle.opacity.value).to.equal(particle.opacity.max);
    expect(particle.opacity.status).to.equal(AnimationStatus.decreasing);

    container.destroy(false);
  }, 30000);

  it("OpacityUpdater applies decay to the animation velocity", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, {
        opacity: {
          value: { min: 0, max: 1 },
          animation: { enable: true, mode: "increase", startValue: "min", speed: 100, sync: true, decay: 0.5 },
        },
      });

    const velocity = particle.opacity.velocity;

    container.particles.update({ value: 16, factor: 1 });

    expect(particle.opacity.velocity).to.be.closeTo(velocity * 0.5, 1e-9);

    container.destroy(false);
  }, 30000);

  it("LifeUpdater accumulates delay time while the particle is spawning", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, {
        life: { count: 5, delay: { value: 1, sync: true }, duration: { value: 1000, sync: true } },
      });

    expect(particle.life).to.not.be.undefined;
    expect(particle.spawning).to.be.true;
    expect(particle.life.delayTime).to.equal(0);

    container.particles.update({ value: 16, factor: 0.5 });

    expect(particle.life.delayTime).to.equal(16);
    expect(particle.spawning).to.be.true;

    container.particles.update({ value: 16, factor: 0.5 });

    expect(particle.life.delayTime).to.equal(32);

    container.destroy(false);
  }, 30000);

  it("LifeUpdater expires the duration and removes the particle when count runs out", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, {
        life: { count: 1, delay: { value: 0, sync: true }, duration: { value: 1, sync: true } },
      });

    expect(container.particles.count).to.equal(1);
    expect(particle.spawning).to.be.false;

    for (let i = 0; i < 70; i++) {
      container.particles.update({ value: 16, factor: 0.5 });
    }

    expect(particle.destroyed).to.be.true;
    expect(container.particles.count).to.equal(0);

    container.destroy(false);
  }, 30000);

  it("DestroyUpdater removes a particle crossing a destroy bound", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, { destroy: { bounds: { right: 10 } } });

    expect(particle.destroyBounds).to.not.be.undefined;
    expect(particle.destroyBounds.right).to.equal((10 * container.canvas.size.width) / 100);

    particle.position.x = 0;
    particle.position.y = 0;

    for (let i = 0; i < 3; i++) {
      container.particles.update({ value: 16, factor: 0.5 });
    }

    expect(particle.destroyed).to.be.true;
    expect(container.particles.count).to.equal(0);

    container.destroy(false);
  }, 30000);

  it("DestroyUpdater splits a destroyed particle into children", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, {
        life: { count: 1, delay: { value: 0, sync: true }, duration: { value: 1, sync: true } },
        destroy: { mode: "split", split: { count: 1, rate: { value: 2 } } },
      });

    for (let i = 0; i < 70; i++) {
      container.particles.update({ value: 16, factor: 0.5 });
    }

    expect(particle.destroyed).to.be.true;
    expect(container.particles.count).to.equal(2);

    container.destroy(false);
  }, 30000);

  it("OutOfCanvasUpdater destroys a particle outside the canvas with OutMode.destroy", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, { move: { outModes: { default: OutMode.destroy } } });

    particle.position.x = 250;

    for (let i = 0; i < 3; i++) {
      container.particles.update({ value: 16, factor: 0.5 });
    }

    expect(particle.destroyed).to.be.true;
    expect(container.particles.count).to.equal(0);

    container.destroy(false);
  }, 30000);

  it("PaintUpdater resolves the default paint fill onto the particle", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, {}),
      paint = (container.actualOptions.particles as any).paint;

    expect(paint).to.not.be.undefined;
    expect(paint.color.value).to.equal("#fff");
    expect(paint.fill.enable).to.be.true;
    expect(particle.fillEnabled).to.be.true;
    expect(particle.fillColor).to.not.be.undefined;

    container.destroy(false);
  }, 30000);

  it("PaintUpdater loads custom paint color and fill options", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, {
        paint: { color: { value: "#ff0000" }, fill: { enable: true, opacity: 0.5 } },
      }),
      paint = (container.actualOptions.particles as any).paint;

    expect(paint.color.value).to.equal("#ff0000");
    expect(paint.fill.opacity).to.equal(0.5);
    expect(particle.fillEnabled).to.be.true;
    expect(particle.fillOpacity).to.equal(0.5);
    expect(particle.fillColor).to.not.be.undefined;

    container.destroy(false);
  }, 30000);
});
