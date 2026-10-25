/* eslint-disable */
import { type Container, type ISourceOptions, millisecondsToSeconds, tsParticles } from "@tsparticles/engine";
import { beforeAll, describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { loadBubbleEffect } from "@tsparticles/effect-bubble";
import { loadFilterEffect } from "@tsparticles/effect-filter";
import { loadParticlesEffect } from "@tsparticles/effect-particles";
import { loadShadowEffect } from "@tsparticles/effect-shadow";
import { loadTrailEffect } from "@tsparticles/effect-trail";
import { loadHexColorPlugin } from "@tsparticles/plugin-hex-color";

let containerId = 0;

/**
 * Loads a throwaway container for effect tests.
 * @param options - The options to load
 * @returns the loaded container
 */
async function loadContainer(options: ISourceOptions): Promise<Container> {
  containerId += 1;

  const container = await tsParticles.load({
    id: `effects-${containerId.toString()}`,
    options: { autoPlay: false, ...options },
    element: createCustomCanvas(800, 600) as unknown as HTMLCanvasElement,
  });

  if (!container) {
    throw new Error(`effect container ${containerId.toString()} not initialized`);
  }

  return container;
}

/**
 * Gets the first particle in a container.
 * @param container - The container
 * @returns the first particle
 */
function firstParticle(container: Container): any {
  return container.particles.filter(() => true)[0];
}

/**
 * Creates a recording 2d context stub.
 * @returns the context and the recorded calls
 */
function createRecordingContext(): { context: any; record: any } {
  const record: any = {},
    context: any = {
      arc: (x: number, y: number, radius: number): void => {
        record.arc = { x, y, radius };
      },
      beginPath: (): void => {},
      closePath: (): void => {},
      fill: (): void => {},
      save: (): void => {},
      fillStyle: "",
      filter: "",
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: "",
    };

  return { context, record };
}

describe("Effects", async () => {
  globalThis.window = TestWindow;

  beforeAll(async () => {
    await loadHexColorPlugin(tsParticles);
    await loadBubbleEffect(tsParticles);
    await loadFilterEffect(tsParticles);
    await loadShadowEffect(tsParticles);
    await loadTrailEffect(tsParticles);
    await loadParticlesEffect(tsParticles);
  });

  it("effect packages expose their loader functions", () => {
    expect(loadBubbleEffect).to.be.a("function");
    expect(loadFilterEffect).to.be.a("function");
    expect(loadShadowEffect).to.be.a("function");
    expect(loadTrailEffect).to.be.a("function");
    expect(loadParticlesEffect).to.be.a("function");
  }, 30000);

  it("registers all five effect loaders during the first engine boot", async () => {
    const container = await loadContainer({}),
      registered = tsParticles.pluginManager.initializers.effects,
      names = ["bubble", "filter", "shadow", "trail", "particles"];

    for (const name of names) {
      expect(registered.has(name), `effect ${name} not registered`).to.be.true;
      expect(container.effectDrawers.has(name), `effect drawer ${name} missing`).to.be.true;
    }

    container.destroy(false);
  }, 30000);

  it("bubble effect resolves the particle effect and exposes its drawer", async () => {
    const container = await loadContainer({
        particles: {
          number: { value: 1 },
          effect: { type: "bubble" },
        },
      }),
      particle = firstParticle(container);

    expect(particle).to.not.be.undefined;
    expect(particle.effect).to.equal("bubble");
    expect(container.effectDrawers.get("bubble")).to.not.be.undefined;

    container.destroy(false);
  }, 30000);

  it("bubble drawer draws the highlight at one third of the particle radius", async () => {
    const container = await loadContainer({
        particles: {
          number: { value: 1 },
          effect: { type: "bubble" },
        },
      }),
      drawer = container.effectDrawers.get("bubble"),
      { context, record } = createRecordingContext();

    drawer?.drawAfter?.({ context, radius: 30 } as any);

    expect(record.arc).to.not.be.undefined;
    expect(record.arc.radius).to.equal(10);
    expect(record.arc.x).to.equal(10);
    expect(record.arc.y).to.equal(-10);

    container.destroy(false);
  }, 30000);

  it("filter effect copies the configured CSS filter values onto the particle", async () => {
    const container = await loadContainer({
        particles: {
          number: { value: 1 },
          effect: {
            type: "filter",
            options: {
              filter: { blur: 10, hueRotate: 90, opacity: 0.5 },
            },
          },
        },
      }),
      particle = firstParticle(container);

    expect(particle.filterBlur).to.equal(10);
    expect(particle.filterHueRotate).to.equal(90);
    expect(particle.filterOpacity).to.equal(0.5);

    container.destroy(false);
  }, 30000);

  it("filter drawer serializes the particle values into a CSS filter string", async () => {
    const container = await loadContainer({
        particles: {
          number: { value: 1 },
          effect: {
            type: "filter",
            options: {
              filter: { blur: 10, hueRotate: 90, opacity: 0.5 },
            },
          },
        },
      }),
      particle = firstParticle(container),
      drawer = container.effectDrawers.get("filter"),
      { context } = createRecordingContext();

    drawer?.drawBefore?.({ context, particle } as any);

    expect(context.filter).to.include("blur(10px)");
    expect(context.filter).to.include("hue-rotate(90deg)");
    expect(context.filter).to.include("opacity(0.5)");

    container.destroy(false);
  }, 30000);

  it("shadow effect resolves color, blur and offset onto the particle", async () => {
    const container = await loadContainer({
        particles: {
          number: { value: 1 },
          effect: {
            type: "shadow",
            options: {
              shadow: { color: "#ff0000", blur: 7, offset: { x: 2, y: 3 } },
            },
          },
        },
      }),
      particle = firstParticle(container);

    expect(particle.shadowBlur).to.equal(7);
    expect(particle.shadowColor).to.not.be.undefined;
    expect(particle.shadowColor.r).to.equal(255);
    expect(particle.shadowColor.g).to.equal(0);
    expect(particle.shadowColor.b).to.equal(0);
    expect(particle.shadowOffset.x).to.equal(2);
    expect(particle.shadowOffset.y).to.equal(3);

    container.destroy(false);
  }, 30000);

  it("shadow drawer applies the resolved shadow styles to the canvas", async () => {
    const container = await loadContainer({
        particles: {
          number: { value: 1 },
          effect: {
            type: "shadow",
            options: {
              shadow: { color: "#ff0000", blur: 7, offset: { x: 2, y: 3 } },
            },
          },
        },
      }),
      particle = firstParticle(container),
      drawer = container.effectDrawers.get("shadow"),
      { context } = createRecordingContext();

    drawer?.drawBefore?.({ context, particle } as any);

    expect(context.shadowBlur).to.equal(7);
    expect(context.shadowOffsetX).to.equal(2);
    expect(context.shadowOffsetY).to.equal(3);
    expect(context.shadowColor).to.be.a("string");
    expect(context.shadowColor.length).to.be.greaterThan(0);

    container.destroy(false);
  }, 30000);

  it("trail effect initializes history and scales lengths by the pixel ratio", async () => {
    const container = await loadContainer({
        particles: {
          number: { value: 1 },
          effect: {
            type: "trail",
            options: {
              trail: { length: 20, maxWidth: 6, minWidth: 2, fade: false, transform: true },
            },
          },
        },
      }),
      particle = firstParticle(container),
      ratio = container.retina.pixelRatio;

    expect(particle.trail).to.eql([]);
    expect(particle.trailLength).to.equal(20 * ratio);
    expect(particle.trailMaxWidth).to.equal(6 * ratio);
    expect(particle.trailMinWidth).to.equal(2 * ratio);
    expect(particle.trailFade).to.be.false;
    expect(particle.trailTransform).to.be.true;

    container.destroy(false);
  }, 30000);

  it("trail effect applies defaults when no trail options are provided", async () => {
    const container = await loadContainer({
        particles: {
          number: { value: 1 },
          effect: { type: "trail" },
        },
      }),
      particle = firstParticle(container),
      ratio = container.retina.pixelRatio;

    expect(particle.trailLength).to.equal(10 * ratio);
    expect(particle.trailMaxWidth).to.be.undefined;
    expect(particle.trailMinWidth).to.be.undefined;
    expect(particle.trailFade).to.be.true;
    expect(particle.trailTransform).to.be.false;

    container.destroy(false);
  }, 30000);

  it("particles effect stores spawn rate and quantity on the particle", async () => {
    const container = await loadContainer({
        particles: {
          number: { value: 1 },
          effect: {
            type: "particles",
            options: {
              particles: {
                spawn: {
                  rate: { delay: 0.1, quantity: 3 },
                  particles: { effect: { type: "none" } },
                },
              },
            },
          },
        },
      }),
      particle = firstParticle(container);

    expect(particle.particlesSpawnQuantity).to.equal(3);
    expect(particle.particlesSpawnRate).to.equal(0.1 * millisecondsToSeconds);
    expect(particle.particlesNextSpawn).to.be.a("number");
    expect(particle.particlesData).to.not.be.undefined;

    container.destroy(false);
  }, 30000);

  it("particles effect spawns the configured quantity once the delay elapses", async () => {
    const container = await loadContainer({
        particles: {
          number: { value: 1 },
          effect: {
            type: "particles",
            options: {
              particles: {
                spawn: {
                  rate: { delay: 0.1, quantity: 3 },
                  particles: { effect: { type: "none" } },
                },
              },
            },
          },
        },
      }),
      particle = firstParticle(container),
      drawer = container.effectDrawers.get("particles"),
      before = container.particles.count,
      { context } = createRecordingContext();

    particle.particlesNextSpawn = 1;

    drawer?.drawAfter?.({ particle, context } as any);

    expect(container.particles.count).to.equal(before + 3);

    container.destroy(false);
  }, 30000);
});
