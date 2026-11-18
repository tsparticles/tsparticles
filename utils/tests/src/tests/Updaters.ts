/* eslint-disable */
import { AnimationStatus, type Container, type ISourceOptions, OutMode, createEngine } from "@tsparticles/engine";
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

const tsParticles = createEngine();

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

  it("clears destroy extension state when a pooled particle is reused", async () => {
    const container = await loadContainer({
        autoPlay: false,
        particles: { number: { value: 0 } },
      }),
      particle = container.particles.addParticle(undefined, {
        destroy: { bounds: { right: 10, bottom: 20 } },
      } as any);

    if (!particle) {
      throw new Error("destroy state test particle not initialized");
    }

    const destroyState = particle as any;

    destroyState.splitCount = 5;
    destroyState.unbreakableUntil = 5000;

    expect(destroyState.destroyBounds.right).to.equal((10 * container.canvas.size.width) / 100);
    expect(destroyState.destroyBounds.bottom).to.equal((20 * container.canvas.size.height) / 100);

    container.particles.remove(particle);

    const reused = container.particles.addParticle(),
      reusedState = reused as any;

    expect(reused).to.equal(particle);
    expect(reusedState.destroyBounds).toEqual({});
    expect(reusedState.exploding).toBeUndefined();
    expect(reusedState.splitCount).to.equal(0);
    expect(reusedState.unbreakableUntil).toBeUndefined();

    container.destroy(false);
  });

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

  it("applies split stroke offsets in canonical OKLCH units", async () => {
    const color = { value: { oklch: { c: 0.5, h: 30, l: 70 } } },
      container = await loadContainer({ autoPlay: false }),
      parent = await singleParticle(container, {
        destroy: {
          mode: "split",
          split: {
            count: 1,
            rate: { value: 1 },
            strokeColorOffset: { c: -0.02, h: 30, l: 5 },
          },
        },
        paint: {
          fill: { color },
          stroke: { enable: true, color, width: 1 },
        },
      }),
      parentStroke = parent.getStrokeColor();

    parent.destroy();

    const children = container.particles.filter(particle => particle !== parent),
      childStroke = children[0]?.getStrokeColor();

    expect(children).to.have.length(1);
    expect(childStroke?.h).to.be.closeTo(((parentStroke?.h ?? 0) + 30) % 360, 0.0001);
    expect(childStroke?.c).to.be.closeTo((parentStroke?.c ?? 0) - 0.02, 0.0001);
    expect(childStroke?.l).to.be.closeTo((parentStroke?.l ?? 0) + 5, 0.0001);

    container.destroy(false);
  });

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

  it("PaintUpdater inherits the fill color when stroke color is omitted", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, {
        paint: {
          color: { value: "#ff0000" },
          fill: { enable: true },
          stroke: { enable: true },
        },
      });

    expect(particle.getFillColor()).to.eql(particle.getStrokeColor());

    container.destroy(false);
  }, 30000);

  it("PaintUpdater resolves group paint over the container color", async () => {
    const container = await loadContainer({
      autoPlay: false,
      particles: {
        number: { value: 2 },
        paint: { color: { value: "#ff0000" }, fill: { enable: true } },
        groups: {
          blue: {
            number: { value: 1 },
            paint: { color: { value: "#0000ff" } },
          },
        },
      },
    });

    const baseParticle = container.particles.find(particle => particle.group === undefined),
      groupParticle = container.particles.find(particle => particle.group === "blue"),
      baseColor = baseParticle?.getFillColor(),
      groupColor = groupParticle?.getFillColor();

    expect(baseColor).to.not.be.undefined;
    expect(groupColor).to.not.be.undefined;
    expect(groupColor?.h).not.to.equal(baseColor?.h);
    expect(groupColor?.c).not.to.equal(baseColor?.c);

    container.destroy(false);
  }, 30000);

  it("applies explicit particle paint while preserving its group identity", async () => {
    const container = await loadContainer({
        particles: {
          number: { value: 2 },
          paint: { color: { value: "#ff0000" }, fill: { enable: true } },
          groups: {
            blue: {
              number: { value: 1 },
              paint: { color: { value: "#0000ff" } },
            },
          },
        },
      }),
      overriddenParticle = container.particles.addParticle(
        undefined,
        { paint: { color: { value: "#00ff00" } } },
        "blue",
      ),
      color = overriddenParticle?.getFillColor();

    expect(overriddenParticle).not.toBeUndefined();
    expect(overriddenParticle?.group).toBe("blue");
    expect(color?.h).toBeCloseTo(142.5, 1);
    expect(color?.c).toBeGreaterThan(0.2);

    container.destroy(false);
  }, 30000);

  it("PaintUpdater clears color state when a pooled particle is reused", async () => {
    const container = await loadContainer({ autoPlay: false }),
      particle = await singleParticle(container, {
        paint: {
          color: { value: "#ff0000" },
          fill: { enable: true },
          stroke: { enable: true },
        },
      }),
      previousId = particle.id,
      previousFillColor = particle.fillColor,
      previousFillHue = particle.fillColor?.h.value,
      previousStrokeColor = particle.strokeColor;

    expect(particle.fillColor).to.not.be.undefined;
    expect(particle.strokeColor).to.not.be.undefined;

    if (previousFillColor) {
      previousFillColor.h.value += 30;
    }

    if (previousStrokeColor) {
      previousStrokeColor.h.value += 30;
    }

    container.particles.remove(particle);

    const reused = container.particles.addParticle(
      undefined,
      {
        paint: {
          fill: { enable: false },
          stroke: { enable: false },
        },
      },
      "next",
    );

    expect(reused).to.equal(particle);
    expect(reused?.id).not.to.equal(previousId);
    expect(reused?.group).to.equal("next");
    expect(reused?.destroyed).to.be.false;
    expect(reused?.fillEnabled).to.be.false;
    expect(reused?.fillColor).not.to.equal(previousFillColor);
    expect(reused?.fillColor?.h.value).to.equal(previousFillHue);
    expect(reused?.strokeColor).not.to.equal(previousStrokeColor);

    container.destroy(false);
  }, 30000);
});
