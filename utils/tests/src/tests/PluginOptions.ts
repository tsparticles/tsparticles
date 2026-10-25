/* eslint-disable */
import { type Container, tsParticles } from "@tsparticles/engine";
import {
  Absorber,
  AbsorberLife,
  AbsorberSize,
  AbsorberSizeLimit,
  AbsorberSplit,
  loadAbsorbersPlugin,
} from "@tsparticles/plugin-absorbers";
import { loadBlendPlugin } from "@tsparticles/plugin-blend";
import { loadCanvasMaskPlugin } from "@tsparticles/plugin-canvas-mask";
import { loadEmittersPlugin } from "@tsparticles/plugin-emitters";
import { loadEmittersShapeSquare } from "@tsparticles/plugin-emitters-shape-square";
import { loadInfectionPlugin } from "@tsparticles/plugin-infection";
import { loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { loadManualParticlesPlugin } from "@tsparticles/plugin-manual-particles";
import { loadMotionPlugin } from "@tsparticles/plugin-motion";
import { loadMovePlugin } from "@tsparticles/plugin-move";
import { loadPoissonDiscPlugin } from "@tsparticles/plugin-poisson-disc";
import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask";
import { loadResponsivePlugin } from "@tsparticles/plugin-responsive";
import { loadSoundsPlugin } from "@tsparticles/plugin-sounds";
import { loadThemesPlugin } from "@tsparticles/plugin-themes";
import { loadTrailPlugin } from "@tsparticles/plugin-trail";
import { Zoom, loadZoomPlugin } from "@tsparticles/plugin-zoom";
import { beforeAll, describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

type AnyOptions = Record<string, any>;

let containerId = 0;

async function loadContainer(options: Record<string, unknown>): Promise<Container> {
  containerId += 1;

  const container = await tsParticles.load({
    id: `plugin-options-${containerId.toString()}`,
    options,
    autoPlay: false,
    element: createCustomCanvas(1920, 1080) as unknown as HTMLCanvasElement,
  });

  if (!container) {
    throw new Error("Test container not initialized");
  }

  return container;
}

function actual(container: Container): AnyOptions {
  return container.actualOptions as unknown as AnyOptions;
}

describe("Plugin options tests", async () => {
  globalThis.window = TestWindow;

  beforeAll(async () => {
    await loadInteractivityPlugin(tsParticles);
    await loadAbsorbersPlugin(tsParticles);
    await loadEmittersPlugin(tsParticles);
    await loadEmittersShapeSquare(tsParticles);
    await loadInfectionPlugin(tsParticles);
    await loadMovePlugin(tsParticles);
    await loadZoomPlugin(tsParticles);
    await loadTrailPlugin(tsParticles);
    await loadResponsivePlugin(tsParticles);
    await loadBlendPlugin(tsParticles);
    await loadMotionPlugin(tsParticles);
    await loadPolygonMaskPlugin(tsParticles);
    await loadCanvasMaskPlugin(tsParticles);
    await loadManualParticlesPlugin(tsParticles);
    await loadSoundsPlugin(tsParticles);
    await loadThemesPlugin(tsParticles);
    await loadPoissonDiscPlugin(tsParticles);

    const boot = await loadContainer({ autoPlay: false });

    boot.destroy(false);
  });

  it("Absorber class exposes defaults and merges partial data", () => {
    const absorber = new Absorber();

    expect(absorber.color.value).to.equal("#000000");
    expect(absorber.destroy).to.be.true;
    expect(absorber.draggable).to.be.false;
    expect(absorber.opacity).to.equal(1);
    expect(absorber.orbits).to.be.false;

    absorber.load({
      destroy: false,
      draggable: true,
      opacity: 0.5,
      position: { x: 10, y: 20 },
      size: { value: 80, density: 2 },
    });

    expect(absorber.destroy).to.be.false;
    expect(absorber.draggable).to.be.true;
    expect(absorber.opacity).to.equal(0.5);
    expect(absorber.position).to.deep.equal({ x: 10, y: 20 });
    expect(absorber.size.value).to.equal(80);
    expect(absorber.size.density).to.equal(2);

    absorber.load(undefined);

    expect(absorber.opacity).to.equal(0.5);
    expect(absorber.orbits).to.be.false;
  });

  it("AbsorberLife, AbsorberSize, AbsorberSizeLimit and AbsorberSplit expose defaults and merges", () => {
    const life = new AbsorberLife();

    expect(life.wait).to.be.false;
    expect(life.count).to.be.undefined;

    life.load({ count: 3, delay: 1, duration: 2, wait: true });

    expect(life.count).to.equal(3);
    expect(life.delay).to.equal(1);
    expect(life.duration).to.equal(2);
    expect(life.wait).to.be.true;

    const size = new AbsorberSize();

    expect(size.value).to.equal(50);
    expect(size.density).to.equal(5);
    expect(size.limit.mass).to.equal(0);
    expect(size.limit.radius).to.equal(0);

    size.load({ value: 70, density: 3, limit: 100 });

    expect(size.value).to.equal(70);
    expect(size.density).to.equal(3);
    expect(size.limit.radius).to.equal(100);

    const limit = new AbsorberSizeLimit();

    expect(limit.mass).to.equal(0);
    expect(limit.radius).to.equal(0);

    limit.load({ mass: 5, radius: 2 });

    expect(limit.mass).to.equal(5);
    expect(limit.radius).to.equal(2);

    const split = new AbsorberSplit();

    expect(split.enable).to.be.false;
    expect(split.quantity).to.equal(4);

    split.load({ enable: true, quantity: 7 });

    expect(split.enable).to.be.true;
    expect(split.quantity).to.equal(7);

    split.load(undefined);

    expect(split.quantity).to.equal(7);
  });

  it("Zoom class exposes defaults and merges partial data", () => {
    const zoom = new Zoom();

    expect(zoom.enable).to.be.false;
    expect(zoom.min).to.equal(0.1);
    expect(zoom.max).to.equal(5);

    zoom.load({ enable: true, min: 0.5, max: 3 });

    expect(zoom.enable).to.be.true;
    expect(zoom.min).to.equal(0.5);
    expect(zoom.max).to.equal(3);

    zoom.load(undefined);

    expect(zoom.max).to.equal(3);
  });

  it("absorbers options resolve through the container", async () => {
    const container = await loadContainer({
      autoPlay: false,
      absorbers: [
        {
          position: { x: 100, y: 100 },
          size: { value: 60 },
          opacity: 0.5,
          draggable: true,
        },
      ],
    });

    try {
      const options = actual(container);

      expect(options.absorbers.length).to.equal(1);
      expect(options.absorbers[0].opacity).to.equal(0.5);
      expect(options.absorbers[0].draggable).to.be.true;
      expect(options.absorbers[0].destroy).to.be.true;
      expect(options.absorbers[0].orbits).to.be.false;
    } finally {
      container.destroy(false);
    }
  });

  it("emitters options resolve through the container", async () => {
    const container = await loadContainer({
      autoPlay: false,
      emitters: [
        {
          autoPlay: false,
          position: { x: 100, y: 100 },
          size: { width: 40, height: 40, mode: "pixel" },
          draggable: true,
        },
      ],
    });

    try {
      const options = actual(container);

      expect(options.emitters.length).to.equal(1);
      expect(options.emitters[0].autoPlay).to.be.false;
      expect(options.emitters[0].draggable).to.be.true;
      expect(options.emitters[0].draw).to.be.false;
      expect(options.emitters[0].fill).to.be.true;
    } finally {
      container.destroy(false);
    }
  });

  it("polygon mask options resolve through the container", async () => {
    const container = await loadContainer({
      autoPlay: false,
      polygon: {
        enable: true,
        type: "inline",
        scale: 2,
        draw: { enable: true },
      },
    });

    try {
      const options = actual(container);

      expect(options.polygon.enable).to.be.true;
      expect(options.polygon.type).to.equal("inline");
      expect(options.polygon.scale).to.equal(2);
      expect(options.polygon.draw.enable).to.be.true;
      expect(options.polygon.inline.arrangement).to.equal("one-per-point");
      expect(options.polygon.move.radius).to.equal(10);
    } finally {
      container.destroy(false);
    }
  });

  it("canvas mask options resolve through the container", async () => {
    const container = await loadContainer({
      autoPlay: false,
      canvasMask: {
        enable: true,
        position: { x: 25, y: 25 },
        scale: 2,
        pixels: { offset: 8 },
        override: { opacity: true },
      },
    });

    try {
      const options = actual(container);

      expect(options.canvasMask.enable).to.be.true;
      expect(options.canvasMask.scale).to.equal(2);
      expect(options.canvasMask.position).to.deep.equal({ x: 25, y: 25 });
      expect(options.canvasMask.pixels.offset).to.equal(8);
      expect(options.canvasMask.override.color).to.be.true;
      expect(options.canvasMask.override.opacity).to.be.true;
    } finally {
      container.destroy(false);
    }
  });

  it("manual particles options resolve through the container", async () => {
    const container = await loadContainer({
      autoPlay: false,
      manualParticles: [
        {
          position: { x: 25, y: 25 },
          options: { paint: { color: "#123456" } },
        },
      ],
    });

    try {
      const options = actual(container);

      expect(options.manualParticles.length).to.equal(1);
      expect(options.manualParticles[0].position.x).to.equal(25);
      expect(options.manualParticles[0].position.y).to.equal(25);
      expect(options.manualParticles[0].position.mode).to.equal("percent");
    } finally {
      container.destroy(false);
    }
  });

  it("sounds options resolve through the container without audio", async () => {
    const container = await loadContainer({
      autoPlay: false,
      sounds: {
        enable: true,
        autoPlay: false,
        volume: { value: 50 },
      },
    });

    try {
      const options = actual(container);

      expect(options.sounds.enable).to.be.true;
      expect(options.sounds.autoPlay).to.be.false;
      expect(options.sounds.volume.value).to.equal(50);
      expect(options.sounds.volume.max).to.equal(100);
      expect(options.sounds.icons.enable).to.be.false;
    } finally {
      container.destroy(false);
    }
  });

  it("themes options resolve and the default theme is applied through the container", async () => {
    const container = await loadContainer({
      autoPlay: false,
      themes: [
        {
          name: "my-theme",
          default: { value: true, mode: "any" },
          options: { particles: { number: { value: 11 } } },
        },
      ],
    });

    try {
      const options = actual(container);

      expect(options.themes.length).to.equal(1);
      expect(options.themes[0].name).to.equal("my-theme");
      expect(options.themes[0].default.auto).to.be.false;
      expect(typeof options.setTheme).to.equal("function");
      expect(options.particles.number.value).to.equal(11);
    } finally {
      container.destroy(false);
    }
  });

  it("motion options resolve through the container", async () => {
    const container = await loadContainer({
      autoPlay: false,
      motion: { disable: false, reduce: { factor: 2 } },
    });

    try {
      const options = actual(container);

      expect(options.motion.disable).to.be.false;
      expect(options.motion.reduce.factor).to.equal(2);
      expect(options.motion.reduce.value).to.be.true;
    } finally {
      container.destroy(false);
    }
  });

  it("move options resolve through the container", async () => {
    const container = await loadContainer({
      autoPlay: false,
      particles: { move: { enable: true, speed: 5 } },
    });

    try {
      const options = actual(container);

      expect(options.particles.move.enable).to.be.true;
      expect(options.particles.move.speed).to.equal(5);
      expect(options.particles.move.direction).to.equal("none");
      expect(options.particles.move.random).to.be.false;
    } finally {
      container.destroy(false);
    }
  });

  it("zoom options resolve through the container", async () => {
    const container = await loadContainer({
      autoPlay: false,
      zoom: { enable: true, max: 4 },
    });

    try {
      const options = actual(container);

      expect(options.zoom.enable).to.be.true;
      expect(options.zoom.max).to.equal(4);
      expect(options.zoom.min).to.equal(0.1);
    } finally {
      container.destroy(false);
    }
  });

  it("trail options resolve through the container", async () => {
    const container = await loadContainer({
      autoPlay: false,
      trail: { length: 20 },
    });

    try {
      const options = actual(container);

      expect(options.trail.length).to.equal(20);
      expect(options.trail.enable).to.be.false;
      expect(options.trail.fill).to.not.be.undefined;
    } finally {
      container.destroy(false);
    }
  });

  it("responsive options resolve through the container", async () => {
    const container = await loadContainer({
      autoPlay: false,
      responsive: [{ maxWidth: 800 }, { maxWidth: 400 }],
    });

    try {
      const options = actual(container);

      expect(options.responsive.length).to.be.greaterThan(0);
      expect(options.responsive.some((r: AnyOptions) => r.maxWidth === 800)).to.be.true;
      expect(options.responsive.every((r: AnyOptions) => r.mode === "canvas")).to.be.true;
      expect(options.responsive[0].options).to.deep.equal({});
    } finally {
      container.destroy(false);
    }
  });

  it("blend particle options resolve through the container", async () => {
    const container = await loadContainer({
      autoPlay: false,
      particles: { blend: { mode: "lighter" } },
    });

    try {
      const options = actual(container);

      expect(options.particles.blend.mode).to.equal("lighter");
      expect(options.particles.blend.enable).to.be.false;
    } finally {
      container.destroy(false);
    }
  });

  it("interactivity options resolve through the container", async () => {
    const container = await loadContainer({
      autoPlay: false,
      interactivity: {
        detectsOn: "canvas",
        events: { onClick: { enable: true, mode: "push" } },
      },
    });

    try {
      const options = actual(container);

      expect(options.interactivity.detectsOn).to.equal("canvas");
      expect(options.interactivity.events.onClick.enable).to.be.true;
      expect(options.interactivity.events.onClick.mode).to.equal("push");
      expect(options.interactivity.events.onHover.enable).to.be.false;
    } finally {
      container.destroy(false);
    }
  });

  it("infection options resolve through the container", async () => {
    const container = await loadContainer({
      autoPlay: false,
      infection: { enable: true, infections: 3 },
    });

    try {
      const options = actual(container);

      expect(options.infection.enable).to.be.true;
      expect(options.infection.infections).to.equal(3);
      expect(options.infection.cure).to.be.false;
      expect(options.infection.delay).to.equal(0);
    } finally {
      container.destroy(false);
    }
  });

  it("poisson disc options resolve through the container", async () => {
    const container = await loadContainer({
      autoPlay: false,
      poisson: { enable: true, radius: 50, retries: 5 },
    });

    try {
      const options = actual(container);

      expect(options.poisson.enable).to.be.true;
      expect(options.poisson.radius).to.equal(50);
      expect(options.poisson.retries).to.equal(5);
      expect(options.poisson.dimensions).to.equal(2);
      expect(options.poisson.steps).to.equal(0);
    } finally {
      container.destroy(false);
    }
  });
});
