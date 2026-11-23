/* eslint-disable */
import {
  AnimatableColor,
  AnimationOptions,
  AnimationValueWithRandom,
  Background,
  ColorAnimation,
  Fill,
  FullScreen,
  HDROptions,
  HdrMode,
  OklchAnimation,
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
  createEngine,
  loadProperty,
  loadRangeProperty,
  rangeColorToOklch,
} from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";
import { describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

const tsParticles = createEngine();

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

function collectObjects(value: unknown, objects = new Set<object>()): Set<object> {
  if (typeof value !== "object" || value === null || objects.has(value)) {
    return objects;
  }

  objects.add(value);

  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);

    if (descriptor && "value" in descriptor) {
      collectObjects(descriptor.value, objects);
    }
  }

  return objects;
}

describe("Options load tests", () => {
  globalThis.window = TestWindow;

  it("does not mutate caller-owned options while loading and refreshing particles", async () => {
    const sourceOptions = {
        autoPlay: false,
        detectRetina: false,
        particles: {
          groups: { one: { move: { drift: 2, speed: { max: 4, min: 2 } }, number: { value: 1 } } },
          move: { drift: 1, speed: 3 },
          number: { value: 1 },
        },
      },
      originalOptions = structuredClone(sourceOptions),
      container = await loadContainer(sourceOptions);

    container.particles.addParticle(undefined, { move: { speed: 5 } }, "one");
    await container.refresh();

    expect(sourceOptions).toEqual(originalOptions);

    container.destroy();
  });

  it("copies preset arrays instead of retaining caller-owned references", async () => {
    const container = await loadContainer({ particles: { number: { value: 0 } } }),
      presets: string[] = [];

    container.actualOptions.load({ preset: presets });

    expect(container.actualOptions.preset).toEqual([]);
    expect(container.actualOptions.preset).not.toBe(presets);

    presets.push("caller-change");

    expect(container.actualOptions.preset).toEqual([]);

    if (Array.isArray(container.actualOptions.preset)) {
      container.actualOptions.preset.push("options-change");
    }

    expect(presets).toEqual(["caller-change"]);

    container.destroy();
  });

  it("keeps nested particle options independent between live particles", async () => {
    const container = await loadContainer({
      particles: {
        move: { speed: 3 },
        number: { value: 0 },
        paint: [{ fill: { opacity: 0.5 }, stroke: { opacity: 0.75, width: { min: 1, max: 3 } } }],
        shape: { options: { circle: { particles: { move: { speed: 2 } } } } },
      },
    });
    const first = container.particles.addParticle(),
      second = container.particles.addParticle();

    expect(first).not.toBeUndefined();
    expect(second).not.toBeUndefined();
    expect(first?.options).not.toBe(second?.options);
    expect(first?.options.move).not.toBe(second?.options.move);
    expect(first?.options.paint).not.toBe(second?.options.paint);
    expect(first?.shapeData).not.toBe(second?.shapeData);

    if (first && second) {
      const firstPaint = Array.isArray(first.options.paint) ? first.options.paint[0] : first.options.paint,
        secondPaint = Array.isArray(second.options.paint) ? second.options.paint[0] : second.options.paint;

      expect(firstPaint).not.toBe(secondPaint);
      expect(firstPaint?.fill).not.toBe(secondPaint?.fill);
      expect(firstPaint?.stroke).not.toBe(secondPaint?.stroke);

      first.options.move.speed = 7;
      firstPaint?.fill?.load({ opacity: 0.2 });
      firstPaint?.stroke?.load({ width: 9 });
      if (first.shapeData?.particles?.move) {
        first.shapeData.particles.move.speed = 8;
      }

      expect(second.options.move.speed).toBe(2);
      expect(secondPaint?.fill?.opacity).toBe(0.5);
      expect(secondPaint?.stroke?.width).toEqual({ min: 1, max: 3 });
      expect(second.shapeData?.particles?.move?.speed).toBe(2);
    }

    container.destroy();
  });

  it("isolates every loaded particle option object across live particles", async () => {
    const engine = createEngine();

    await loadAll(engine);

    const container = await engine.load({
        id: "options-load-all-option-ownership",
        options: {
          autoPlay: false,
          detectRetina: false,
          particles: {
            number: { value: 0 },
            paint: [
              {
                fill: { color: { value: "oklch(65% 0.2 30)" }, opacity: 0.5 },
                stroke: { color: { value: "oklch(45% 0.15 250)" }, opacity: 0.75, width: { min: 1, max: 3 } },
              },
            ],
            shape: { options: { circle: { particles: { move: { speed: 2 } } } } },
          },
        },
        element: createCustomCanvas(800, 600) as unknown as HTMLCanvasElement,
      }),
      first = container?.particles.addParticle(),
      second = container?.particles.addParticle();

    expect(first).not.toBeUndefined();
    expect(second).not.toBeUndefined();

    if (first && second) {
      const firstObjects = collectObjects([first.options, first.shapeData, first.effectData]),
        secondObjects = collectObjects([second.options, second.shapeData, second.effectData]);

      for (const object of firstObjects) {
        expect(secondObjects.has(object)).toBe(false);
      }
    }

    container?.destroy();
  });

  it("resolves supported color syntaxes into canonical particle fill state", async () => {
    const engine = createEngine();

    await loadAll(engine);

    const container = await engine.load({
      id: "options-load-color-syntax-to-particle",
      options: {
        autoPlay: false,
        detectRetina: false,
        particles: { number: { value: 0 } },
      },
      element: createCustomCanvas(800, 600) as unknown as HTMLCanvasElement,
    });

    expect(container).not.toBeUndefined();

    if (!container) {
      return;
    }

    const inputs = [
      ["hex", "#ff0000"],
      ["named", "red"],
      ["RGB", "rgb(255, 0, 0)"],
      ["HSL", "hsl(0 100% 50%)"],
      ["HSV", "hsv(0°, 100%, 100%)"],
      ["HWB", "hwb(0 0% 0%)"],
      ["Lab", "lab(54.2943% 80.8192 69.8969)"],
      ["LCH", "lch(54.2943% 106.8519 40.855)"],
      ["OKLab", "oklab(0.627955 0.224863 0.125846)"],
      ["OKLCH", "oklch(62.7955% 0.2577 29.2339)"],
    ] as const;

    for (const [name, value] of inputs) {
      const expected = rangeColorToOklch(container.engine.pluginManager, value),
        particle = container.particles.addParticle(undefined, {
          paint: { color: { value }, fill: { enable: true } },
        }),
        actual = particle?.getFillColor();

      expect(expected, `${name} source resolves`).toBeDefined();
      expect(actual, `${name} particle fill`).toEqual(expected);
    }

    container.destroy();
  });

  it("copies shape and effect type arrays for the container and each particle", async () => {
    const sourceOptions = {
        particles: {
          effect: { type: ["trail", "orbit"] },
          number: { value: 0 },
          shape: { type: ["circle", "square"] },
        },
      },
      container = await loadContainer(sourceOptions),
      actualParticles = container.actualOptions.particles,
      first = container.particles.addParticle(),
      second = container.particles.addParticle();

    expect(actualParticles.effect.type).not.toBe(sourceOptions.particles.effect.type);
    expect(actualParticles.shape.type).not.toBe(sourceOptions.particles.shape.type);
    expect(first?.options.effect.type).not.toBe(second?.options.effect.type);
    expect(first?.options.shape.type).not.toBe(second?.options.shape.type);

    if (first && Array.isArray(first.options.effect.type) && Array.isArray(first.options.shape.type)) {
      first.options.effect.type[0] = "updated-effect";
      first.options.shape.type[0] = "updated-shape";
    }

    expect(second?.options.effect.type).toEqual(["trail", "orbit"]);
    expect(second?.options.shape.type).toEqual(["circle", "square"]);
    expect(actualParticles.effect.type).toEqual(["trail", "orbit"]);
    expect(actualParticles.shape.type).toEqual(["circle", "square"]);
    expect(sourceOptions.particles.effect.type).toEqual(["trail", "orbit"]);
    expect(sourceOptions.particles.shape.type).toEqual(["circle", "square"]);

    container.destroy();
  });

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

  it("OklchAnimation owns the three color channels", () => {
    const options = new OklchAnimation();

    expect(options.h).toBeInstanceOf(ColorAnimation);
    expect(options.c).toBeInstanceOf(ColorAnimation);
    expect(options.l).toBeInstanceOf(ColorAnimation);
    expect(options.h.sync).toBe(true);

    options.load({ h: { enable: true, offset: 30 }, c: { offset: 0.12 } });
    expect(options.h.enable).toBe(true);
    expect(options.h.offset).toBe(30);
    expect(options.c.offset).toBe(0.12);
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

  it("copies nested color objects and arrays when loading OptionsColor", () => {
    const value = [{ oklch: { a: 0.75, c: 0.2, h: 30, l: 70 } }, "red"],
      options = new OptionsColor();

    options.load({ value });

    expect(options.value).not.toBe(value);

    if (Array.isArray(options.value) && typeof options.value[0] === "object" && "oklch" in options.value[0]) {
      expect(options.value[0]).not.toBe(value[0]);
      expect(options.value[0].oklch).not.toBe(value[0].oklch);
      value[0].oklch.c = 0.3;

      expect(options.value[0].oklch.c).toBe(0.2);

      options.value[0].oklch.h = 60;

      expect(value[0].oklch.h).toBe(30);
    } else {
      throw new Error("Expected OptionsColor to retain an OKLCH object in its value array");
    }
  });

  it("isolates explicit color objects in loaded particle options", async () => {
    const color = { oklch: { a: 0.75, c: 0.2, h: 30, l: 70 } },
      container = await loadContainer({
        particles: {
          number: { value: 0 },
          paint: { color: { value: color } },
        },
      }),
      configuredPaint = container.actualOptions.particles.paint,
      paint = Array.isArray(configuredPaint) ? configuredPaint[0] : configuredPaint,
      configuredColor = paint.color.value as { oklch?: { c: number; h: number } };

    expect(configuredColor).not.toBe(color);
    expect(configuredColor.oklch).not.toBe(color.oklch);

    color.oklch.c = 0.3;

    expect(configuredColor.oklch?.c).toBe(0.2);

    if (configuredColor.oklch) {
      configuredColor.oklch.h = 60;
    }

    expect(color.oklch.h).toBe(30);

    container.destroy();
  });

  it("AnimatableColor keeps the animation channel and color value", () => {
    const options = new AnimatableColor();

    expect(options.value).toBe("");
    expect(options.animation).toBeInstanceOf(OklchAnimation);

    options.load({
      value: "#123",
      animation: {
        c: { enable: true, max: 0.16, min: 0.04, speed: 0.02 },
        h: { enable: true, max: 300, min: 60, speed: 12 },
        l: { enable: true, max: 82, min: 38, speed: 3 },
      },
    });
    expect(options.value).toBe("#123");
    expect(options.animation.h.enable).toBe(true);
    expect(options.animation.h.min).toBe(60);
    expect(options.animation.h.max).toBe(300);
    expect(options.animation.h.speed).toBe(12);
    expect(options.animation.c.min).toBe(0.04);
    expect(options.animation.c.max).toBe(0.16);
    expect(options.animation.c.speed).toBe(0.02);
    expect(options.animation.l.min).toBe(38);
    expect(options.animation.l.max).toBe(82);
    expect(options.animation.l.speed).toBe(3);

    const copy = AnimatableColor.create(options, "#f00");

    expect(copy.value).toBe("#f00");
    expect(copy.animation.h.sync).toBe(true);
  });

  it("rejects legacy HSL animation with a migration hint", () => {
    const options = new AnimatableColor();

    expect(() => options.load({ animation: { s: { enable: true } } as never })).toThrow("animation.s");
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

  it.each([0, -1, NaN, Infinity, -Infinity])(
    "rejects invalid render depth %s before allocating layers",
    async value => {
      const container = await loadContainer();

      try {
        expect(() => container.options.load({ zLayers: value })).toThrow(RangeError);
        expect(container.options.zLayers).toBe(100);
      } finally {
        container.destroy(false);
      }
    },
  );

  it("preserves positive fractional render depth", async () => {
    const container = await loadContainer();

    try {
      container.options.load({ zLayers: 10.5 });
      expect(container.options.zLayers).toBe(10.5);
    } finally {
      container.destroy(false);
    }
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

  it("uses the selected group's shape options when creating a grouped particle", async () => {
    const container = await loadContainer({
      particles: {
        number: { value: 0 },
        shape: { type: "circle" },
        effect: { type: "baseEffect" },
        groups: {
          squareGroup: {
            effect: { type: "groupEffect" },
            number: { value: 0 },
            shape: { type: "square" },
          },
        },
      },
    });

    const groupOptions = container.actualOptions.particles.groups.squareGroup,
      particle = container.particles.addParticle(undefined, groupOptions, "squareGroup");

    expect(particle?.group).toBe("squareGroup");
    expect(particle?.shape).toBe("square");
    expect(particle?.effect).toBe("groupEffect");

    container.destroy(false);
  });

  it("resolves grouped shape and effect types with shape data layered after effect data", async () => {
    const container = await loadContainer({
        particles: {
          effect: {
            close: true,
            options: {
              baseEffect: { close: true },
              groupEffect: {
                close: false,
                particles: {
                  move: { drift: 0.8, speed: 4 },
                },
              },
            },
            type: "baseEffect",
          },
          groups: {
            grouped: {
              effect: { type: "groupEffect" },
              move: { drift: 0.3, speed: 2 },
              number: { value: 0 },
              shape: { type: "square" },
            },
          },
          number: { value: 0 },
          move: { drift: 0.1, speed: 1 },
          shape: {
            close: true,
            options: {
              square: {
                close: false,
                particles: { move: { speed: 5 } },
              },
            },
            type: "circle",
          },
        },
      }),
      groupOptions = container.actualOptions.particles.groups.grouped,
      groupedParticle = container.particles.addParticle(undefined, groupOptions, "grouped"),
      explicitParticle = container.particles.addParticle(undefined, {
        effect: { type: "baseEffect" },
        shape: { type: "circle" },
      });

    expect(groupedParticle?.shape).toBe("square");
    expect(groupedParticle?.effect).toBe("groupEffect");
    expect(groupedParticle?.shapeClose).toBe(false);
    expect(groupedParticle?.effectClose).toBe(false);
    expect(groupedParticle?.options.move.speed).toBe(5);
    expect(groupedParticle?.options.move.drift).toBe(0.8);

    expect(explicitParticle?.shape).toBe("circle");
    expect(explicitParticle?.effect).toBe("baseEffect");
    expect(explicitParticle?.shapeClose).toBe(true);
    expect(explicitParticle?.effectClose).toBe(true);

    container.destroy(false);
  });

  it("clears a particle's random index when reusing it from the pool", async () => {
    const container = await loadContainer({ particles: { number: { value: 0 } } }),
      first = container.particles.addParticle();

    expect(first).not.toBeUndefined();

    if (first) {
      first.randomIndexData = 3;
      container.particles.remove(first);

      const reused = container.particles.addParticle();

      expect(reused).toBe(first);
      expect(reused?.randomIndexData).toBeUndefined();
    }

    container.destroy(false);
  });

  it("unknown option keys are tolerated without throwing", async () => {
    const container = await loadContainer({ autoPlay: false, unknownFlag: true, particles: { unknown: 1 } });

    expect(container.options).toBeDefined();

    container.destroy(false);
  });
});
