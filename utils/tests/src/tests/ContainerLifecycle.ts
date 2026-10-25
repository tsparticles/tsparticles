/* eslint-disable @typescript-eslint/no-magic-numbers,@typescript-eslint/no-unused-expressions */
import { type Container, type ISourceOptions, tsParticles } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

describe("Container lifecycle", () => {
  globalThis.window = TestWindow;

  const canvasWidth = 800,
    canvasHeight = 600;

  let containerId = 0;

  /**
   * Loads a container with a deterministic canvas and autoPlay disabled.
   * @param options - The source options to load.
   * @returns The loaded container.
   */
  async function loadContainer(options: ISourceOptions): Promise<Container> {
    const id = `container-lifecycle-${(containerId += 1).toString()}`,
      container = await tsParticles.load({
        id,
        options: { autoPlay: false, ...options },
        autoPlay: false,
        element: createCustomCanvas(canvasWidth, canvasHeight) as unknown as HTMLCanvasElement,
      });

    if (!container) {
      throw new Error(`Test container ${id} not initialized`);
    }

    return container;
  }

  it("loads a container exposing a sane pixel ratio, canvas size and options", async () => {
    const particleCount = 12,
      container = await loadContainer({ particles: { number: { value: particleCount } } }),
      pixelRatio = container.retina.pixelRatio,
      size = container.canvas.size;

    expect(pixelRatio).to.be.a("number");
    expect(Number.isFinite(pixelRatio)).to.be.true;
    expect(pixelRatio).to.be.greaterThan(0);

    expect(Number.isFinite(size.width)).to.be.true;
    expect(Number.isFinite(size.height)).to.be.true;
    expect(size.width).to.be.at.least(0);
    expect(size.height).to.be.at.least(0);

    /* jsdom does not lay out the canvas, so the fixture size is assigned explicitly */
    size.width = canvasWidth;
    size.height = canvasHeight;

    expect(size.width).to.equal(canvasWidth);
    expect(size.height).to.equal(canvasHeight);

    expect(container.particles.count).to.equal(particleCount);
    expect(container.options).to.be.not.undefined;
    expect(container.options.fpsLimit).to.equal(120);

    container.destroy();
  });

  it("re-resolves the particles after a refresh", async () => {
    const particleCount = 6,
      container = await loadContainer({ particles: { number: { value: particleCount } } });

    expect(container.particles.count).to.equal(particleCount);

    await container.refresh();

    expect(container.destroyed).to.be.false;
    expect(container.retina.pixelRatio).to.be.greaterThan(0);
    expect(container.particles.count).to.equal(particleCount);

    container.destroy();
  });

  it("stops, clears and restarts without throwing", async () => {
    const particleCount = 4,
      container = await loadContainer({ particles: { number: { value: particleCount } } });

    container.stop();

    expect(container.started).to.be.false;
    expect(container.particles.count).to.equal(0);

    await container.start();

    expect(container.started).to.be.true;
    expect(container.particles.count).to.equal(particleCount);
    expect(() => {
      container.play();
    }).to.not.throw();

    container.destroy();
  });

  it("re-scales the particles when the canvas is resized", async () => {
    const container = await loadContainer({
        particles: { number: { value: 100, density: { enable: true } } },
      }),
      initialCount = container.particles.count;

    expect(initialCount).to.be.greaterThan(0);

    container.canvas.size.width = canvasWidth;
    container.canvas.size.height = canvasHeight;
    container.particles.setDensity();

    const resizedCount = container.particles.count;

    expect(resizedCount).to.be.lessThan(initialCount);

    container.canvas.size.width = canvasWidth / 2;
    container.canvas.size.height = canvasHeight / 2;
    container.particles.setDensity();

    expect(container.particles.count).to.be.lessThan(resizedCount);
    expect(container.particles.count).to.be.at.least(0);

    container.destroy();
  });

  it("destroys a container and loads an independent one", async () => {
    const first = await loadContainer({ particles: { number: { value: 10 } } });

    first.destroy();

    expect(first.destroyed).to.be.true;

    const second = await loadContainer({ particles: { number: { value: 4 } } });

    expect(second.destroyed).to.be.false;
    expect(second.particles.count).to.equal(4);
    expect(second.id).to.not.equal(first.id);

    second.destroy();
  });
});
