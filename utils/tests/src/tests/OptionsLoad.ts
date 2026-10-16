/* eslint-disable */
import {
  AnimationOptions,
  AnimationValueWithRandom,
  AnimatableColor,
  Background,
  ColorAnimation,
  Fill,
  FullScreen,
  HDROptions,
  HdrMode,
  HslAnimation,
  LimitMode,
  Move,
  MoveAngle,
  MoveCenter,
  MoveDirection,
  MoveGravity,
  MovePath,
  OptionsColor,
  OutMode,
  OutModes,
  Paint,
  ParticlesBounce,
  ParticlesBounceFactor,
  ParticlesDensity,
  ParticlesNumber,
  ParticlesNumberLimit,
  PixelMode,
  RangedAnimationOptions,
  RangedAnimationValueWithRandom,
  ResizeEvent,
  Shape,
  Spin,
  Stroke,
  ValueWithRandom,
  ZIndex,
  loadProperty,
  loadRangeProperty,
  tsParticles,
} from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

interface TestPropertyTarget {
  value?: unknown;
}

interface TestRangeTarget {
  value?: unknown;
}

let containerId = 0;

/**
 * Loads a throwaway container for tests that need the real Options/ParticlesOptions instances.
 * @param options - the particles options to load
 * @returns the loaded container
 */
async function loadContainer(options: Record<string, unknown> = {}) {
  containerId += 1;

  const container = await tsParticles.load({
    id: `options-load-${containerId.toString()}`,
    options,
    autoPlay: false,
    element: createCustomCanvas(800, 600) as unknown as HTMLCanvasElement,
  });

  if (!container) {
    throw new Error("Test container not initialized");
  }

  return container;
}

describe("Options load tests", () => {
  globalThis.window = TestWindow;

  it("loadProperty keeps defaults on undefined and sets primitives/objects otherwise", () => {
    const target: TestPropertyTarget = { value: "default" };

    loadProperty(target, "value", undefined);
    expect(target.value).toBe("default");

    loadProperty(target, "value", 42);
    expect(target.value).toBe(42);

    loadProperty(target, "value", null);
    expect(target.value).toBe(null);

    const object = { a: 1 };

    loadProperty(target, "value", object);
    expect(target.value).toBe(object);
  });

  it("loadRangeProperty converts values with setRangeValue and ignores undefined", () => {
    const target: TestRangeTarget = { value: 3 };

    loadRangeProperty(target, "value", undefined);
    expect(target.value).toBe(3);

    loadRangeProperty(target, "value", 5);
    expect(target.value).toBe(5);

    loadRangeProperty(target, "value", { min: 1, max: 9 });
    expect(target.value).toStrictEqual({ min: 1, max: 9 });
  });

  it("ValueWithRandom defaults to zero and loads a range", () => {
    const options = new ValueWithRandom();

    expect(options.value).toBe(0);

    options.load({ value: 10 });
    expect(options.value).toBe(10);

    options.load({ value: { min: 2, max: 8 } });
    expect(options.value).toStrictEqual({ min: 2, max: 8 });

    options.load(undefined);
    expect(options.value).toStrictEqual({ min: 2, max: 8 });
  });

  it("AnimationValueWithRandom owns an AnimationOptions instance", () => {
    const options = new AnimationValueWithRandom();

    expect(options.value).toBe(0);
    expect(options.animation).toBeInstanceOf(AnimationOptions);
    expect(options.animation.enable).toBe(false);
    expect(options.animation.speed).toBe(1);

    options.load({ value: 4, animation: { enable: true, speed: 3 } });
    expect(options.value).toBe(4);
    expect(options.animation.enable).toBe(true);
    expect(options.animation.speed).toBe(3);
    expect(options.animation.sync).toBe(false);
  });

  it("RangedAnimationValueWithRandom uses a RangedAnimationOptions instance", () => {
    const options = new RangedAnimationValueWithRandom();

    expect(options.animation).toBeInstanceOf(RangedAnimationOptions);
    expect(options.animation.mode).toBe("auto");
    expect(options.animation.startValue).toBe("random");
  });

  it("AnimationOptions loads defaults and merges partial data", () => {
    const options = new AnimationOptions();

    expect(options.count).toBe(0);
    expect(options.decay).toBe(0);
    expect(options.delay).toBe(0);
    expect(options.enable).toBe(false);
    expect(options.speed).toBe(1);
    expect(options.sync).toBe(false);

    options.load({ enable: true, speed: 7, sync: true });
    expect(options.enable).toBe(true);
    expect(options.speed).toBe(7);
    expect(options.sync).toBe(true);
    expect(options.decay).toBe(0);

    options.load(null);
    expect(options.speed).toBe(7);
  });

  it("RangedAnimationOptions adds mode and startValue", () => {
    const options = new RangedAnimationOptions();

    expect(options.mode).toBe("auto");
    expect(options.startValue).toBe("random");

    options.load({ mode: "increase", startValue: "min", enable: true });
    expect(options.mode).toBe("increase");
    expect(options.startValue).toBe("min");
    expect(options.enable).toBe(true);
  });

  it("ColorAnimation defaults sync to true and stores min/max from the constructor", () => {
    const options = new ColorAnimation(0, 360);

    expect(options.min).toBe(0);
    expect(options.max).toBe(360);
    expect(options.sync).toBe(true);
    expect(options.offset).toBe(0);
    expect(options.enable).toBe(false);

    options.load({ max: 100, min: 10, offset: 5, enable: true });
    expect(options.max).toBe(100);
    expect(options.min).toBe(10);
    expect(options.offset).toBe(5);
    expect(options.enable).toBe(true);
  });

  it("HslAnimation owns the three color channels", () => {
    const options = new HslAnimation();

    expect(options.h).toBeInstanceOf(ColorAnimation);
    expect(options.s).toBeInstanceOf(ColorAnimation);
    expect(options.l).toBeInstanceOf(ColorAnimation);
    expect(options.h.sync).toBe(true);

    options.load({ h: { enable: true, offset: 30 }, s: { offset: 12 } });
    expect(options.h.enable).toBe(true);
    expect(options.h.offset).toBe(30);
    expect(options.s.offset).toBe(12);
    expect(options.l.offset).toBe(0);
  });

  it("OptionsColor defaults to an empty string and copies/loads values", () => {
    const options = new OptionsColor();

    expect(options.value).toBe("");

    options.load({ value: "#fff" });
    expect(options.value).toBe("#fff");

    const copy = OptionsColor.create(options, { value: "#000" });

    expect(copy).toBeInstanceOf(OptionsColor);
    expect(options.value).toBe("#fff");
    expect(copy.value).toBe("#000");

    options.load(undefined);
    expect(options.value).toBe("#fff");
  });

  it("AnimatableColor keeps the animation channel and color value", () => {
    const options = new AnimatableColor();

    expect(options.value).toBe("");
    expect(options.animation).toBeInstanceOf(HslAnimation);

    options.load({ value: "#123", animation: { h: { enable: true } } });
    expect(options.value).toBe("#123");
    expect(options.animation.h.enable).toBe(true);

    const copy = AnimatableColor.create(options, "#f00");

    expect(copy.value).toBe("#f00");
  });

  it("Background defaults and merge semantics", () => {
    const options = new Background();

    expect(options.color.value).toBe("");
    expect(options.image).toBe("");
    expect(options.opacity).toBe(1);
    expect(options.position).toBe("");
    expect(options.repeat).toBe("");
    expect(options.size).toBe("");

    options.load({ color: "#0d47a1", image: "img.png", opacity: 0.5 });
    expect(options.color.value).toBe("#0d47a1");
    expect(options.image).toBe("img.png");
    expect(options.opacity).toBe(0.5);
    expect(options.position).toBe("");
  });

  it("FullScreen defaults and merge semantics", () => {
    const options = new FullScreen();

    expect(options.enable).toBe(true);
    expect(options.zIndex).toBe(0);

    options.load({ enable: false, zIndex: 10 });
    expect(options.enable).toBe(false);
    expect(options.zIndex).toBe(10);
  });

  it("HDROptions defaults and merge semantics", () => {
    const options = new HDROptions();

    expect(options.enable).toBe(true);
    expect(options.mode).toBe(HdrMode.standard);
    expect(options.peakNits).toBe(400);

    options.load({ enable: false, mode: HdrMode.natural, peakNits: 1000 });
    expect(options.enable).toBe(false);
    expect(options.mode).toBe(HdrMode.natural);
    expect(options.peakNits).toBe(1000);
  });

  it("ResizeEvent defaults and merge semantics", () => {
    const options = new ResizeEvent();

    expect(options.delay).toBe(0.5);
    expect(options.enable).toBe(true);

    options.load({ delay: 1, enable: false });
    expect(options.delay).toBe(1);
    expect(options.enable).toBe(false);
  });

  it("ParticlesNumber defaults and partial merge", () => {
    const options = new ParticlesNumber();

    expect(options.value).toBe(0);
    expect(options.density).toBeInstanceOf(ParticlesDensity);
    expect(options.limit).toBeInstanceOf(ParticlesNumberLimit);

    options.load({ value: 80 });
    expect(options.value).toBe(80);
    expect(options.density.enable).toBe(false);
    expect(options.limit.value).toBe(0);
  });

  it("ParticlesDensity defaults and merge semantics", () => {
    const options = new ParticlesDensity();

    expect(options.enable).toBe(false);
    expect(options.width).toBe(1920);
    expect(options.height).toBe(1080);

    options.load({ enable: true, width: 800 });
    expect(options.enable).toBe(true);
    expect(options.width).toBe(800);
    expect(options.height).toBe(1080);
  });

  it("ParticlesNumberLimit defaults and merge semantics", () => {
    const options = new ParticlesNumberLimit();

    expect(options.mode).toBe(LimitMode.delete);
    expect(options.value).toBe(0);

    options.load({ mode: LimitMode.wait, value: 100 });
    expect(options.mode).toBe(LimitMode.wait);
    expect(options.value).toBe(100);
  });

  it("Move defaults and partial merge", () => {
    const options = new Move();

    expect(options.enable).toBe(false);
    expect(options.speed).toBe(2);
    expect(options.direction).toBe(MoveDirection.none);
    expect(options.random).toBe(false);
    expect(options.straight).toBe(false);
    expect(options.vibrate).toBe(false);
    expect(options.warp).toBe(false);
    expect(options.decay).toBe(0);
    expect(options.drift).toBe(0);
    expect(options.outModes).toBeInstanceOf(OutModes);
    expect(options.outModes.default).toBe(OutMode.out);

    options.load({ enable: true, speed: 20, random: false, outModes: OutMode.destroy });
    expect(options.enable).toBe(true);
    expect(options.speed).toBe(20);
    expect(options.outModes.default).toBe(OutMode.destroy);
    expect(options.direction).toBe(MoveDirection.none);
  });

  it("MoveAngle defaults and merge semantics", () => {
    const options = new MoveAngle();

    expect(options.value).toBe(90);
    expect(options.offset).toBe(0);

    options.load({ value: 180, offset: 15 });
    expect(options.value).toBe(180);
    expect(options.offset).toBe(15);
  });

  it("MoveCenter defaults and merge semantics", () => {
    const options = new MoveCenter();

    expect(options.x).toBe(50);
    expect(options.y).toBe(50);
    expect(options.radius).toBe(0);
    expect(options.mode).toBe(PixelMode.percent);

    options.load({ x: 10, radius: 5, mode: PixelMode.precise });
    expect(options.x).toBe(10);
    expect(options.radius).toBe(5);
    expect(options.mode).toBe(PixelMode.precise);
    expect(options.y).toBe(50);
  });

  it("MoveGravity defaults and merge semantics", () => {
    const options = new MoveGravity();

    expect(options.acceleration).toBe(9.81);
    expect(options.enable).toBe(false);
    expect(options.inverse).toBe(false);
    expect(options.maxSpeed).toBe(50);

    options.load({ enable: true, acceleration: 2, inverse: true });
    expect(options.enable).toBe(true);
    expect(options.acceleration).toBe(2);
    expect(options.inverse).toBe(true);
    expect(options.maxSpeed).toBe(50);
  });

  it("MovePath defaults and merge semantics", () => {
    const options = new MovePath();

    expect(options.clamp).toBe(true);
    expect(options.enable).toBe(false);
    expect(options.generator).toBe(undefined);
    expect(options.delay).toBeInstanceOf(ValueWithRandom);
    expect(options.options).toStrictEqual({});

    options.load({ enable: true, generator: "simplex-noise", options: { seed: 1 } });
    expect(options.enable).toBe(true);
    expect(options.generator).toBe("simplex-noise");
    expect(options.options).toStrictEqual({ seed: 1 });
    expect(options.clamp).toBe(true);
  });

  it("OutModes defaults and per-edge fallback to default", () => {
    const options = new OutModes();

    expect(options.default).toBe(OutMode.out);

    options.load({ default: OutMode.bounce, top: OutMode.destroy });
    expect(options.default).toBe(OutMode.bounce);
    expect(options.top).toBe(OutMode.destroy);
    expect(options.bottom).toBe(OutMode.bounce);
    expect(options.left).toBe(OutMode.bounce);
    expect(options.right).toBe(OutMode.bounce);
  });

  it("Spin defaults and merge semantics", () => {
    const options = new Spin();

    expect(options.acceleration).toBe(0);
    expect(options.enable).toBe(false);
    expect(options.position).toBe(undefined);

    options.load({ enable: true, acceleration: 4, position: { x: 1, y: 2 } });
    expect(options.enable).toBe(true);
    expect(options.acceleration).toBe(4);
    expect(options.position).toStrictEqual({ x: 1, y: 2 });
  });

  it("Paint defaults and lazy fill/stroke creation", () => {
    const options = new Paint();

    expect(options.color).toBe(undefined);
    expect(options.fill).toBe(undefined);
    expect(options.stroke).toBe(undefined);

    options.load({ color: "#fff", fill: { enable: true } });
    expect(options.color).toBeInstanceOf(AnimatableColor);
    expect(options.color?.value).toBe("#fff");
    expect(options.fill).toBeInstanceOf(Fill);
    expect(options.fill?.enable).toBe(true);
    expect(options.stroke).toBe(undefined);
  });

  it("Fill defaults and merge semantics", () => {
    const options = new Fill();

    expect(options.enable).toBe(true);
    expect(options.opacity).toBe(1);
    expect(options.color).toBe(undefined);

    options.load({ color: "#000", opacity: 0.4 });
    expect(options.color).toBeInstanceOf(AnimatableColor);
    expect(options.color?.value).toBe("#000");
    expect(options.opacity).toBe(0.4);
    expect(options.enable).toBe(true);
  });

  it("Stroke defaults and merge semantics", () => {
    const options = new Stroke();

    expect(options.width).toBe(0);
    expect(options.opacity).toBe(undefined);
    expect(options.color).toBe(undefined);

    options.load({ color: "#fff", width: 2, opacity: 0.5 });
    expect(options.color?.value).toBe("#fff");
    expect(options.width).toBe(2);
    expect(options.opacity).toBe(0.5);
  });

  it("Shape defaults and nested options merge", () => {
    const options = new Shape();

    expect(options.close).toBe(true);
    expect(options.type).toBe("circle");
    expect(options.options).toStrictEqual({});

    options.load({ type: "star", close: false, options: { star: { sides: 7 } } });
    expect(options.type).toBe("star");
    expect(options.close).toBe(false);
    expect(options.options).toStrictEqual({ star: { sides: 7 } });

    options.load({ options: { star: { innerRadius: 2 } } });
    expect(options.options).toStrictEqual({ star: { sides: 7, innerRadius: 2 } });
    expect(options.type).toBe("star");
  });

  it("Effect-like shape data is exposed through Shape instead", () => {
    const options = new Shape();

    expect(options.close).toBe(true);
    expect(options.options).toStrictEqual({});
  });

  it("ParticlesBounce owns horizontal/vertical factors defaulting to 1", () => {
    const options = new ParticlesBounce();

    expect(options.horizontal).toBeInstanceOf(ParticlesBounceFactor);
    expect(options.vertical).toBeInstanceOf(ParticlesBounceFactor);
    expect(options.horizontal.value).toBe(1);
    expect(options.vertical.value).toBe(1);

    options.load({ horizontal: { value: 0.5 } });
    expect(options.horizontal.value).toBe(0.5);
    expect(options.vertical.value).toBe(1);
  });

  it("ZIndex defaults and merge semantics", () => {
    const options = new ZIndex();

    expect(options.value).toBe(0);
    expect(options.opacityRate).toBe(1);
    expect(options.sizeRate).toBe(1);
    expect(options.velocityRate).toBe(1);

    options.load({ value: 10, opacityRate: 2, velocityRate: 0.5 });
    expect(options.value).toBe(10);
    expect(options.opacityRate).toBe(2);
    expect(options.velocityRate).toBe(0.5);
    expect(options.sizeRate).toBe(1);
  });

  it("Options loads defaults and partial data through the container", async () => {
    const container = await loadContainer(),
      options = container.options;

    expect(options.autoPlay).toBe(true);
    expect(options.clear).toBe(true);
    expect(options.detectRetina).toBe(true);
    expect(options.fpsLimit).toBe(120);
    expect(options.pauseOnBlur).toBe(true);
    expect(options.pauseOnOutsideViewport).toBe(true);
    expect(options.smooth).toBe(false);
    expect(options.zLayers).toBe(100);
    expect(options.delay).toBe(0);
    expect(options.duration).toBe(0);

    options.load({ fpsLimit: 60, smooth: true, zLayers: 50 });

    expect(options.fpsLimit).toBe(60);
    expect(options.smooth).toBe(true);
    expect(options.zLayers).toBe(50);
    expect(options.detectRetina).toBe(true);

    container.destroy(false);
  });

  it("Options accepts boolean hdr and fullScreen shorthand", async () => {
    const container = await loadContainer({ autoPlay: false, hdr: true, fullScreen: true }),
      options = container.options;

    expect(options.hdr.enable).toBe(true);
    expect(options.fullScreen.enable).toBe(true);

    container.destroy(false);
  });

  it("ParticlesOptions loads defaults and partial nested data", async () => {
    const container = await loadContainer(),
      particles = container.options.particles;

    expect(particles.reduceDuplicates).toBe(false);
    expect(particles.number.value).toBe(0);
    expect(particles.move.enable).toBe(false);
    expect(particles.shape.type).toBe("circle");
    expect(particles.paint).toBeInstanceOf(Paint);

    const paint = particles.paint as Paint;

    expect(paint.color?.value).toBe("#fff");
    expect(paint.fill?.enable).toBe(true);

    particles.load({ number: { value: 50 }, move: { enable: true, speed: 5 }, shape: { type: "star" } });

    expect(particles.number.value).toBe(50);
    expect(particles.move.enable).toBe(true);
    expect(particles.move.speed).toBe(5);
    expect(particles.shape.type).toBe("star");
    expect(particles.number.density.enable).toBe(false);

    container.destroy(false);
  });

  it("ParticlesOptions groups deep-extend their own options", async () => {
    const container = await loadContainer(),
      particles = container.options.particles;

    particles.load({ groups: { g1: { number: { value: 10 }, shape: { type: "square" } } } });

    expect(particles.groups.g1).toBeDefined();
    expect(particles.groups.g1.number?.value).toBe(10);
    expect(particles.groups.g1.shape?.type).toBe("square");

    particles.load({ groups: { g1: { move: { enable: true } } } });

    expect(particles.groups.g1.number?.value).toBe(10);
    expect(particles.groups.g1.move?.enable).toBe(true);

    container.destroy(false);
  });

  it("unknown option keys are tolerated without throwing", async () => {
    const container = await loadContainer({ autoPlay: false, unknownFlag: true, particles: { unknown: 1 } });

    expect(container.options).toBeDefined();

    container.destroy(false);
  });
});
