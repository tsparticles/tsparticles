/* eslint-disable */
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import {
  type Container,
  type IShapeDrawData,
  type IShapeDrawer,
  type Particle,
  doublePI,
  percentDenominator,
  setRandom,
  tsParticles,
} from "@tsparticles/engine";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { SegmentType } from "@tsparticles/path-utils";
import { loadCircleShape } from "@tsparticles/shape-circle";
import { loadSquareShape } from "@tsparticles/shape-square";
import { loadLineShape } from "@tsparticles/shape-line";
import { loadArrowShape } from "@tsparticles/shape-arrow";
import { loadStarShape } from "@tsparticles/shape-star";
import { loadPolygonShape } from "@tsparticles/shape-polygon";
import { loadRoundedPolygonShape } from "@tsparticles/shape-rounded-polygon";
import { loadRoundedRectShape } from "@tsparticles/shape-rounded-rect";
import { loadSquircleShape } from "@tsparticles/shape-squircle";
import { loadCogShape } from "@tsparticles/shape-cog";
import { loadHeartShape } from "@tsparticles/shape-heart";
import { loadInfinityShape } from "@tsparticles/shape-infinity";
import { loadSpiralShape } from "@tsparticles/shape-spiral";
import { loadRibbonShape } from "@tsparticles/shape-ribbon";
import { loadMatrixShape } from "@tsparticles/shape-matrix";
import { loadCardsShape } from "@tsparticles/shape-cards";
import { loadPathShape } from "@tsparticles/shape-path";
import { loadTextShape } from "@tsparticles/shape-text";
import { loadEmojiShape } from "@tsparticles/shape-emoji";
import { loadImageShape } from "@tsparticles/shape-image";

type Call = [string, ...unknown[]];

interface Recorder {
  calls: Call[];
  ctx: OffscreenCanvasRenderingContext2D;
}

function createRecorder(options: { roundRect?: boolean } = {}): Recorder {
  const calls: Call[] = [];
  const record =
    (name: string) =>
    (...args: unknown[]): void => {
      calls.push([name, ...args]);
    };

  const raw: Record<string, unknown> = {
    arc: record("arc"),
    arcTo: record("arcTo"),
    beginPath: record("beginPath"),
    bezierCurveTo: record("bezierCurveTo"),
    closePath: record("closePath"),
    drawImage: record("drawImage"),
    ellipse: record("ellipse"),
    fill: record("fill"),
    fillRect: record("fillRect"),
    fillText: record("fillText"),
    lineTo: record("lineTo"),
    measureText: () => ({ width: 10 }),
    moveTo: record("moveTo"),
    quadraticCurveTo: record("quadraticCurveTo"),
    rect: record("rect"),
    restore: record("restore"),
    rotate: record("rotate"),
    save: record("save"),
    scale: record("scale"),
    setLineDash: record("setLineDash"),
    stroke: record("stroke"),
    strokeText: record("strokeText"),
    translate: record("translate"),
    globalAlpha: 1,
    font: "",
    textAlign: "left",
    textBaseline: "alphabetic",
    fillStyle: "#000000",
    strokeStyle: "#000000",
    lineWidth: 1,
    lineJoin: "miter",
    lineCap: "butt",
    globalCompositeOperation: "source-over",
  };

  if (options.roundRect) {
    raw.roundRect = record("roundRect");
  }

  return { calls, ctx: raw as unknown as OffscreenCanvasRenderingContext2D };
}

function makeData(
  ctx: OffscreenCanvasRenderingContext2D,
  particle: unknown,
  radius: number,
  overrides: Record<string, unknown> = {},
): IShapeDrawData {
  return {
    context: ctx,
    delta: { value: 16, factor: 0.5 },
    drawPosition: { x: 0, y: 0 },
    drawRadius: radius,
    drawScale: 1,
    fill: true,
    opacity: 1,
    particle,
    pixelRatio: 1,
    position: { x: 0, y: 0 },
    radius,
    stroke: false,
    transformData: { a: 1, b: 0, c: 0, d: 1 },
    angle: 0,
    ...overrides,
  } as unknown as IShapeDrawData;
}

const nameOf = (call: Call): string => call[0];
const argsOf = (call: Call): unknown[] => call.slice(1);
const only = (calls: Call[], name: string): Call[] => calls.filter(c => nameOf(c) === name);

function expectArgs(actual: unknown[], expected: unknown[], eps = 1e-9): void {
  expect(actual.length, `argument count for [${expected.join(",")}]`).to.equal(expected.length);

  for (let i = 0; i < expected.length; i++) {
    const value = actual[i],
      target = expected[i];

    if (typeof value === "number" && typeof target === "number") {
      expect(value).to.be.closeTo(target, eps);
    } else {
      expect(value).to.equal(target);
    }
  }
}

function unitPolygon(sides: number, radius: number): { x: number; y: number }[] {
  const step = doublePI / sides,
    isOdd = sides % 2 !== 0,
    baseAngle = (-Math.PI + (isOdd ? 0 : step)) * 0.5,
    result: { x: number; y: number }[] = [];

  for (let i = 0; i < sides; i++) {
    const angle = baseAngle + i * step;

    result.push({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius });
  }

  return result;
}

let containerId = 0;
const nextId = (prefix: string): string => `${prefix}-${String(containerId++)}`;

const originalToString = (globalThis as { OffscreenCanvas?: { prototype: Record<string, unknown> } }).OffscreenCanvas
  ?.prototype;

if (originalToString && typeof originalToString["transferToImageBitmap"] !== "function") {
  originalToString["transferToImageBitmap"] = function transferToImageBitmap(this: unknown): unknown {
    return this;
  };
}

describe("ShapeGeometry", async () => {
  globalThis.window = TestWindow;

  let featureContainer: Container | undefined;

  beforeAll(() => {
    setRandom();
  });

  const registry = tsParticles.pluginManager.initializers.shapes;

  await loadCircleShape(tsParticles);
  await loadSquareShape(tsParticles);
  await loadLineShape(tsParticles);
  await loadArrowShape(tsParticles);
  await loadStarShape(tsParticles);
  await loadPolygonShape(tsParticles);
  await loadRoundedPolygonShape(tsParticles);
  await loadRoundedRectShape(tsParticles);
  await loadSquircleShape(tsParticles);
  await loadCogShape(tsParticles);
  await loadInfinityShape(tsParticles);
  await loadSpiralShape(tsParticles);
  await loadRibbonShape(tsParticles);
  await loadMatrixShape(tsParticles);
  await loadCardsShape(tsParticles);
  await loadPathShape(tsParticles);
  await loadTextShape(tsParticles);
  await loadEmojiShape(tsParticles);
  await loadImageShape(tsParticles);
  await loadHeartShape(tsParticles);

  const boot = await tsParticles.load({
    id: nextId("shape-geometry-boot"),
    options: {},
    autoPlay: false,
    element: createCustomCanvas(64, 64) as unknown as HTMLCanvasElement,
  });

  boot?.destroy(false);

  featureContainer = (await tsParticles.load({
    id: nextId("shape-geometry-feature"),
    options: {
      particles: {
        move: { enable: false },
        number: { value: 0 },
      },
    },
    autoPlay: false,
    element: createCustomCanvas(400, 400) as unknown as HTMLCanvasElement,
  })) as Container | undefined;

  const container = featureContainer as Container;

  const getDrawer = async (key: string): Promise<IShapeDrawer> => {
    const initializer = registry.get(key);

    if (!initializer) {
      throw new Error(`shape ${key} not registered`);
    }

    return initializer(container);
  };

  const circle = (await getDrawer("circle")) as IShapeDrawer;
  const square = await getDrawer("square");
  const line = await getDrawer("line");
  const arrow = (await getDrawer("arrow")) as IShapeDrawer<{
    bodyHeightFactor?: number;
    headWidthFactor?: number;
    heightFactor?: number;
    shapeData?: unknown;
  }>;
  const star = (await getDrawer("star")) as IShapeDrawer<{
    shapeData?: { sides?: number; inset?: number };
    sides?: number;
    starInset?: number;
  }>;
  const polygon = await getDrawer("polygon");
  const triangle = await getDrawer("triangle");
  const roundedPolygon = (await getDrawer("rounded-polygon")) as IShapeDrawer<{
    borderRadius?: number;
    sides?: number;
    shapeData?: { radius?: number; sides?: number };
  }>;
  const roundedRect = (await getDrawer("rounded-rect")) as IShapeDrawer<{
    borderRadius?: number;
    shapeData?: { radius?: number };
  }>;
  const squircle = (await getDrawer("squircle")) as IShapeDrawer<{
    shapeData?: { exponent?: number; steps?: number };
    squircleExponent?: number;
    squircleSteps?: number;
  }>;
  const cog = (await getDrawer("cog")) as IShapeDrawer<{
    cogHoleRadius?: number;
    cogInnerRadius?: number;
    cogInnerTaper?: number;
    cogNotches?: number;
    cogOuterTaper?: number;
    shapeData?: unknown;
  }>;
  const heart = await getDrawer("heart");
  const infinity = await getDrawer("infinity");
  const spiral = (await getDrawer("spiral")) as IShapeDrawer<{
    shapeData?: { innerRadius?: number; lineSpacing?: number; widthFactor?: number };
    spiralInnerRadius?: number;
    spiralLineSpacing?: number;
    spiralWidthFactor?: number;
  }>;
  const ribbon = (await getDrawer("ribbon")) as IShapeDrawer;
  const matrix = (await getDrawer("matrix")) as IShapeDrawer<{ shapeData?: { interval?: unknown } }>;
  const card = (await getDrawer("card")) as IShapeDrawer<{
    cardData?: { suit: string; value: string };
    shapeData?: { suit: string; value: string };
    isShowingBack?: () => boolean;
  }>;
  const diamonds = await getDrawer("diamonds");
  const spades = await getDrawer("spades");
  const clubs = await getDrawer("clubs");
  const hearts = await getDrawer("hearts");
  const path = (await getDrawer("path")) as IShapeDrawer<{
    pathData?: unknown;
    shapeData?: unknown;
  }>;
  const text = (await getDrawer("text")) as IShapeDrawer<{
    maxTextLength?: number;
    shapeData?: { font?: string; style?: string; value?: string; weight?: string };
    textLines?: string[];
  }>;
  const emoji = (await getDrawer("emoji")) as IShapeDrawer<{
    emojiDataKey?: string;
    shapeData?: { font?: string; value?: string };
    size?: { value: number };
  }>;
  const image = (await getDrawer("image")) as IShapeDrawer<{
    image?: { element?: unknown; ratio?: number };
    shapeData?: unknown;
  }>;

  describe("circle", () => {
    it("reports 12 sides and records one arc at the origin with the draw radius", async () => {
      expect(circle.getSidesCount?.({} as Particle)).to.equal(12);

      const { calls, ctx } = createRecorder(),
        particle = { circleRange: { min: 0, max: Math.PI } };

      circle.draw(makeData(ctx, particle, 10));

      expect(calls.length).to.equal(1);
      expect(nameOf(calls[0])).to.equal("arc");
      expectArgs(argsOf(calls[0]), [0, 0, 10, 0, Math.PI, false]);
    });

    it("particleInit maps a scalar and an object angle into circleRange and draw uses it", () => {
      const scalar = { shapeData: { angle: 90 } } as { circleRange?: { min: number; max: number }; shapeData: unknown },
        object = { shapeData: { angle: { min: 0, max: 180 } } } as {
          circleRange?: { min: number; max: number };
          shapeData: unknown;
        },
        empty = {} as { circleRange?: { min: number; max: number } };

      circle.particleInit?.(container, scalar as unknown as Particle);
      circle.particleInit?.(container, object as unknown as Particle);
      circle.particleInit?.(container, empty as unknown as Particle);

      expect(scalar.circleRange).to.eql({ min: 0, max: Math.PI / 2 });
      expect(object.circleRange?.min).to.be.closeTo(0, 1e-9);
      expect(object.circleRange?.max).to.be.closeTo(Math.PI, 1e-9);
      expect(empty.circleRange?.min).to.be.closeTo(0, 1e-9);
      expect(empty.circleRange?.max).to.be.closeTo(doublePI, 1e-9);

      const { calls, ctx } = createRecorder();

      circle.draw(makeData(ctx, empty, 10));

      expectArgs(argsOf(calls[0]), [0, 0, 10, 0, doublePI, false]);
    });
  });

  describe("square", () => {
    it("records a rect centered on the origin with side radius*sqrt(2)", () => {
      const { calls, ctx } = createRecorder();

      square.draw(makeData(ctx, {}, 10));

      expect(square.getSidesCount?.({} as Particle)).to.equal(4);
      expect(calls.length).to.equal(1);
      expect(nameOf(calls[0])).to.equal("rect");

      const fixedRadius = 10 * Math.SQRT1_2;

      expectArgs(argsOf(calls[0]), [-fixedRadius, -fixedRadius, fixedRadius * 2, fixedRadius * 2]);
    });
  });

  describe("line", () => {
    it("records a horizontal segment spanning the full width", () => {
      const { calls, ctx } = createRecorder();

      line.draw(makeData(ctx, {}, 10));

      expect(line.getSidesCount?.({} as Particle)).to.equal(1);
      expect(calls.map(nameOf)).to.eql(["moveTo", "lineTo"]);
      expectArgs(argsOf(calls[0]), [-10, 0]);
      expectArgs(argsOf(calls[1]), [10, 0]);
    });
  });

  describe("arrow", () => {
    it("particleInit resolves default factors and draw records eight segments", () => {
      const particle = {} as {
        bodyHeightFactor?: number;
        headWidthFactor?: number;
        heightFactor?: number;
      };

      arrow.particleInit?.(container, particle as unknown as Particle);

      expect(particle.heightFactor).to.equal(0.5);
      expect(particle.headWidthFactor).to.equal(0.2);
      expect(particle.bodyHeightFactor).to.equal(0.5);

      const { calls, ctx } = createRecorder();

      arrow.draw(makeData(ctx, particle, 10));

      const lineTos = only(calls, "lineTo");

      expect(only(calls, "moveTo").length).to.equal(1);
      expect(lineTos.length).to.equal(8);
      expectArgs(argsOf(calls[0]), [-10, 0]);
      expectArgs(argsOf(lineTos[0]), [-10, -2.5]);
      expectArgs(argsOf(lineTos[1]), [6, -2.5]);
      expectArgs(argsOf(lineTos[2]), [6, -5]);
      expectArgs(argsOf(lineTos[3]), [14, 0]);
      expectArgs(argsOf(lineTos[7]), [-10, 0]);
    });

    it("honours custom factors from the particle", () => {
      const { calls, ctx } = createRecorder(),
        particle = { heightFactor: 2, headWidthFactor: 0.5, bodyHeightFactor: 1 };

      arrow.draw(makeData(ctx, particle, 10));

      const lineTos = only(calls, "lineTo");

      expectArgs(argsOf(lineTos[0]), [-10, -20]);
      expectArgs(argsOf(lineTos[1]), [0, -20]);
      expectArgs(argsOf(lineTos[2]), [0, -20]);
      expectArgs(argsOf(lineTos[3]), [20, 0]);
    });
  });

  describe("star", () => {
    it("defaults to 5 sides and reads a per-particle override", () => {
      expect(star.getSidesCount?.({} as Particle)).to.equal(5);
      expect(star.getSidesCount?.({ shapeData: { sides: 8 } } as unknown as Particle)).to.equal(8);
      expect(star.getSidesCount?.({ shapeData: { sides: 3.4 } } as unknown as Particle)).to.equal(3);
    });

    it("particleInit sets the inset and draw records two rotations per side", () => {
      const particle = { sides: 5, shapeData: { inset: 2 } } as {
        sides: number;
        starInset?: number;
        shapeData: unknown;
      };

      star.particleInit?.(container, particle as unknown as Particle);

      expect(particle.starInset).to.equal(2);

      const { calls, ctx } = createRecorder();

      star.draw(makeData(ctx, particle, 10));

      const lineTos = only(calls, "lineTo");

      expect(only(calls, "rotate").length).to.equal(10);
      expect(lineTos.length).to.equal(10);
      expectArgs(argsOf(calls[0]), [0, -10]);
      expectArgs(argsOf(lineTos[0]), [0, -20]);
      expectArgs(argsOf(lineTos[1]), [0, -10]);
    });
  });

  describe("polygon", () => {
    it("defaults to 5 sides and places vertices at the documented angles", () => {
      expect(polygon.getSidesCount?.({} as Particle)).to.equal(5);
      expect(polygon.getSidesCount?.({ shapeData: { sides: 6 } } as unknown as Particle)).to.equal(6);

      const { calls, ctx } = createRecorder(),
        particle = { sides: 5 };

      polygon.draw(makeData(ctx, particle, 10));

      const expected = unitPolygon(5, 10),
        lineTos = only(calls, "lineTo"),
        move = only(calls, "moveTo")[0];

      expectArgs(argsOf(move), [expected[0].x, expected[0].y]);
      expect(lineTos.length).to.equal(4);
      expect(only(calls, "closePath").length).to.equal(1);

      for (let i = 0; i < lineTos.length; i++) {
        expectArgs(argsOf(lineTos[i]), [expected[i + 1].x, expected[i + 1].y]);
        expect(Math.hypot(argsOf(lineTos[i])[0], argsOf(lineTos[i])[1])).to.be.closeTo(10, 1e-9);
      }
    });

    it("the triangle drawer always reports 3 sides and draws three vertices", () => {
      expect(triangle.getSidesCount?.({} as Particle)).to.equal(3);

      const { calls, ctx } = createRecorder();

      triangle.draw(makeData(ctx, { sides: 3 }, 10));

      const expected = unitPolygon(3, 10),
        lineTos = only(calls, "lineTo"),
        move = only(calls, "moveTo")[0];

      expectArgs(argsOf(move), [expected[0].x, expected[0].y]);
      expect(lineTos.length).to.equal(2);
      expectArgs(argsOf(lineTos[1]), [expected[2].x, expected[2].y]);
    });
  });

  describe("rounded-polygon", () => {
    it("defaults to 5 sides and particleInit derives the border radius", () => {
      expect(roundedPolygon.getSidesCount?.({} as Particle)).to.equal(5);
      expect(roundedPolygon.getSidesCount?.({ shapeData: { sides: 7 } } as unknown as Particle)).to.equal(7);

      const particle = { shapeData: { radius: 5 } } as { borderRadius?: number; shapeData: unknown };

      roundedPolygon.particleInit?.(container, particle as unknown as Particle);

      expect(particle.borderRadius).to.equal(5);
    });

    it("draws the polygon path with one arcTo per vertex", () => {
      const { calls, ctx } = createRecorder(),
        particle = { sides: 5, borderRadius: 4 };

      roundedPolygon.draw(makeData(ctx, particle, 10));

      expect(only(calls, "moveTo").length).to.equal(1);
      expect(only(calls, "arcTo").length).to.equal(5);
      expectArgs(argsOf(calls[0]), [
        (10 + 10 * Math.cos((2 * Math.PI) / 5)) / 2,
        (10 * Math.sin((2 * Math.PI) / 5)) / 2,
      ]);
    });
  });

  describe("rounded-rect", () => {
    it("falls back to a quadratic path bounded by the fixed radius", () => {
      const { calls, ctx } = createRecorder(),
        particle = { borderRadius: 3 };

      expect("roundRect" in (ctx as object)).to.be.false;

      roundedRect.draw(makeData(ctx, particle, 10));

      const fixedRadius = 10 * Math.SQRT1_2,
        lineTos = only(calls, "lineTo"),
        quads = only(calls, "quadraticCurveTo");

      expect(only(calls, "moveTo").length).to.equal(1);
      expect(lineTos.length).to.equal(4);
      expect(quads.length).to.equal(4);
      expectArgs(argsOf(calls[0]), [-fixedRadius + 3, -fixedRadius]);

      for (const call of [...lineTos, ...quads]) {
        for (const value of argsOf(call)) {
          expect(Math.abs(value as number)).to.be.at.most(fixedRadius + 1e-9);
        }
      }
    });

    it("uses roundRect when the context provides it and particleInit resolves the radius", () => {
      const { calls, ctx } = createRecorder({ roundRect: true });

      expect("roundRect" in (ctx as object)).to.be.true;

      roundedRect.draw(makeData(ctx, { borderRadius: 3 }, 10));

      const fixedRadius = 10 * Math.SQRT1_2;

      expect(calls.length).to.equal(1);
      expect(nameOf(calls[0])).to.equal("roundRect");
      expectArgs(argsOf(calls[0]), [-fixedRadius, -fixedRadius, fixedRadius * 2, fixedRadius * 2, 3]);

      const particle = { shapeData: { radius: 6 } } as { borderRadius?: number; shapeData: unknown };

      roundedRect.particleInit?.(container, particle as unknown as Particle);

      expect(particle.borderRadius).to.equal(6);
    });
  });

  describe("squircle", () => {
    it("particleInit picks the default exponent and steps", () => {
      const particle = {} as {
        shapeData?: unknown;
        squircleExponent?: number;
        squircleSteps?: number;
      };

      squircle.particleInit?.(container, particle as unknown as Particle);

      expect(particle.squircleExponent).to.equal(4);
      expect(particle.squircleSteps).to.equal(64);
    });

    it("draw records steps vertices scaled into the unit square and bounded by the radius", () => {
      const { calls, ctx } = createRecorder(),
        particle = { squircleExponent: 4, squircleSteps: 8 };

      squircle.draw(makeData(ctx, particle, 10));

      const lineTos = only(calls, "lineTo"),
        expected = Math.pow(Math.cos(Math.PI / 4), 2 / 4);

      expectArgs(argsOf(calls.find(c => nameOf(c) === "scale") as Call), [10, 10]);
      expectArgs(argsOf(calls.find(c => nameOf(c) === "moveTo") as Call), [1, 0]);
      expect(lineTos.length).to.equal(8);
      expectArgs(argsOf(lineTos[0]), [expected, expected]);

      for (const call of lineTos) {
        const [x, y] = argsOf(call) as number[];

        expect(Math.abs(x)).to.be.at.most(1 + 1e-9);
        expect(Math.abs(y)).to.be.at.most(1 + 1e-9);
      }
    });
  });

  describe("cog", () => {
    it("particleInit sets defaults and draw alternates inner and outer radii", () => {
      const particle = {} as {
        cogHoleRadius?: number;
        cogInnerRadius?: number;
        cogInnerTaper?: number;
        cogNotches?: number;
        cogOuterTaper?: number;
        shapeData?: unknown;
      };

      cog.particleInit?.(container, particle as unknown as Particle);

      expect(particle.cogHoleRadius).to.equal(44);
      expect(particle.cogInnerRadius).to.equal(72);
      expect(particle.cogInnerTaper).to.equal(35);
      expect(particle.cogNotches).to.equal(7);
      expect(particle.cogOuterTaper).to.equal(50);

      const { calls, ctx } = createRecorder();

      cog.draw(makeData(ctx, particle, 10));

      const lineTos = only(calls, "lineTo");

      expect(lineTos.length).to.equal(2 * 7 * 2);

      const innerRadius = (10 * 72) / percentDenominator;

      expect(Math.hypot(argsOf(lineTos[0])[0], argsOf(lineTos[0])[1])).to.be.closeTo(10, 1e-9);
      expect(Math.hypot(argsOf(lineTos[1])[0], argsOf(lineTos[1])[1])).to.be.closeTo(innerRadius, 1e-9);
    });

    it("afterDraw carves the hole with an arc at the computed radius", () => {
      const { calls, ctx } = createRecorder(),
        particle = {
          cogHoleRadius: 44,
          cogInnerRadius: 72,
          cogInnerTaper: 35,
          cogNotches: 7,
          cogOuterTaper: 50,
        };

      cog.afterDraw?.(makeData(ctx, particle, 10));

      const holeRadius = (10 * 44) / percentDenominator,
        arcs = only(calls, "arc");

      expect(arcs.length).to.equal(1);
      expectArgs(argsOf(arcs[0]), [0, 0, holeRadius, 0, doublePI]);
      expect(only(calls, "fill").length).to.equal(1);
    });
  });

  describe("heart", () => {
    it("records six quadratics and two lines bounded by the radius and mirrored on x=0", () => {
      const { calls, ctx } = createRecorder();

      heart.draw(makeData(ctx, {}, 10));

      expect(only(calls, "quadraticCurveTo").length).to.equal(6);
      expect(only(calls, "lineTo").length).to.equal(2);
      expectArgs(argsOf(calls[0]), [-10, -5]);

      const points: { x: number; y: number }[] = [];

      for (const call of calls) {
        const values = argsOf(call);

        if (nameOf(call) === "quadraticCurveTo") {
          points.push({ x: values[0], y: values[1] }, { x: values[2], y: values[3] });
        } else if (nameOf(call) === "lineTo" || nameOf(call) === "moveTo") {
          points.push({ x: values[0], y: values[1] });
        }
      }

      for (const point of points) {
        expect(Math.abs(point.x)).to.be.at.most(10 + 1e-9);
        expect(point.y).to.be.at.least(-10 - 1e-9);
        expect(point.y).to.be.at.most(10 + 1e-9);

        const mirror = points.some(other => Math.abs(other.x + point.x) < 1e-9 && Math.abs(other.y - point.y) < 1e-9);

        expect(mirror, `missing mirror for ${JSON.stringify(point)}`).to.be.true;
      }
    });
  });

  describe("infinity", () => {
    it("records two mirrored bezier loops controlled by 0.55*radius", () => {
      const { calls, ctx } = createRecorder();

      infinity.draw(makeData(ctx, {}, 20));

      const beziers = only(calls, "bezierCurveTo"),
        loop = 20 * 0.55;

      expect(only(calls, "moveTo").length).to.equal(2);
      expect(beziers.length).to.equal(2);
      expectArgs(argsOf(beziers[0]), [loop, -20, loop, 20, 0, 0]);
      expectArgs(argsOf(beziers[1]), [-loop, -20, -loop, 20, 0, 0]);
    });
  });

  describe("spiral", () => {
    it("particleInit picks the defaults and draw records one point per spiral step", () => {
      const particle = {} as {
        shapeData?: unknown;
        spiralInnerRadius?: number;
        spiralLineSpacing?: number;
        spiralWidthFactor?: number;
      };

      spiral.particleInit?.(container, particle as unknown as Particle);

      expect(particle.spiralInnerRadius).to.equal(1);
      expect(particle.spiralLineSpacing).to.equal(1);
      expect(particle.spiralWidthFactor).to.equal(10);

      const { calls, ctx } = createRecorder();

      spiral.draw(makeData(ctx, { spiralInnerRadius: 1, spiralLineSpacing: 1, spiralWidthFactor: 10 }, 10));

      const lineTos = only(calls, "lineTo"),
        first = { x: Math.cos(0.1) * 1.1, y: Math.sin(0.1) * 1.1 };

      expect(lineTos.length).to.equal(90);
      expectArgs(argsOf(lineTos[0]), [1, 0]);
      expectArgs(argsOf(lineTos[1]), [first.x, first.y]);

      for (const call of lineTos) {
        const [x, y] = argsOf(call);

        expect(Math.hypot(x, y)).to.be.at.most(10 + 1e-9);
      }
    });

    it("a larger spacing reduces the number of recorded points", () => {
      const { calls, ctx } = createRecorder();

      spiral.draw(makeData(ctx, { spiralInnerRadius: 2, spiralLineSpacing: 2, spiralWidthFactor: 10 }, 10));

      expect(only(calls, "lineTo").length).to.equal(40);
    });
  });

  describe("ribbon", () => {
    it("creates the ribbon state and records filled polygon segments", async () => {
      const { calls, ctx } = createRecorder(),
        fakeContainer = {
          canvas: { size: { width: 400, height: 400 } },
          hdr: false,
          hdrMode: "standard",
          peakNits: 400,
        } as unknown as Container,
        ribbonInitializer = registry.get("ribbon"),
        ribbonDrawer = (await ribbonInitializer?.(fakeContainer)) as IShapeDrawer,
        particle = {
          options: { move: { enable: false } },
          position: { x: 200, y: 200 },
          shapeData: { count: 12 },
          velocity: { angle: 0 },
        };

      setRandom(() => 0.5);

      ribbonDrawer.draw(makeData(ctx, particle, 8));

      expect(only(calls, "beginPath").length).to.be.greaterThan(0);
      expect(only(calls, "fill").length).to.be.greaterThan(0);
      expect(ribbonDrawer.getSidesCount?.(particle as unknown as Particle)).to.be.at.least(12);

      expect(fakeContainer.canvas.size.width).to.equal(400);
      expect(ribbon).to.not.be.undefined;
    });
  });

  describe("matrix", () => {
    afterEach(() => {
      setRandom();
    });

    it("records a bold font and the first matrix glyph at the origin", () => {
      setRandom(() => 0);

      const { calls, ctx } = createRecorder();

      matrix.draw(makeData(ctx, {}, 10));

      const texts = only(calls, "fillText");

      expect((ctx as { font: string }).font).to.equal('bold 20px "Courier New", Courier, monospace');
      expect(texts.length).to.equal(1);
      expect(texts[0][1]).to.equal("ア");
      expectArgs(argsOf(texts[0]).slice(1), [0, 0]);
    });

    it("stroke-only data records strokeText instead of fillText", () => {
      setRandom(() => 0);

      const { calls, ctx } = createRecorder();

      matrix.draw(makeData(ctx, {}, 10, { fill: false, stroke: true }));

      expect(only(calls, "fillText").length).to.equal(0);
      expect(only(calls, "strokeText").length).to.equal(1);
    });
  });

  describe("cards", () => {
    it("each suit drawer records its path's bezier segments", () => {
      const cases: [{ draw: IShapeDrawer["draw"] }, number][] = [
        [diamonds, 4],
        [hearts, 6],
        [spades, 10],
        [clubs, 12],
      ];

      for (const [drawer, expected] of cases) {
        const { calls, ctx } = createRecorder();

        expect(() => drawer.draw(makeData(ctx, {}, 10)), `drawer with ${String(expected)} beziers`).to.not.throw();
        expect(only(calls, "moveTo").length, "moveTo count").to.equal(1);
        expect(only(calls, "bezierCurveTo").length, "bezier count").to.equal(expected);
      }
    });

    it("card.particleInit deep-copies suit and value into cardData", () => {
      const particle = { shapeData: { suit: "hearts", value: "A" } } as {
        cardData?: { suit: string; value: string };
        shapeData?: unknown;
      };

      card.particleInit?.(container, particle as unknown as Particle);

      expect(particle.cardData).to.eql({ suit: "hearts", value: "A" });
      expect(particle.cardData).to.not.equal(particle.shapeData);

      const empty = {} as { cardData?: unknown };

      card.particleInit?.(container, empty as unknown as Particle);
      expect(empty.cardData).to.be.undefined;
    });

    it("card.draw renders the cached card image at the computed size", () => {
      const { calls, ctx } = createRecorder(),
        particle = {
          cardData: { suit: "hearts", value: "A" },
          isShowingBack: () => false,
        };

      expect(() => card.draw(makeData(ctx, particle, 30))).to.not.throw();

      const images = only(calls, "drawImage");

      expect(images.length).to.equal(1);
      expectArgs(argsOf(images[0]).slice(1), [-20, -30, 40, 60]);
    });
  });

  describe("path", () => {
    it("draw records the parsed moveTo and lineTo calls scaled by the radius", () => {
      const { calls, ctx } = createRecorder(),
        particle = {
          pathData: {
            half: false,
            segments: [
              { type: SegmentType.move, values: [{ x: 0, y: 0 }] },
              { type: SegmentType.line, values: [{ x: 1, y: 0 }] },
              { type: SegmentType.line, values: [{ x: 1, y: 1 }] },
            ],
          },
        };

      path.draw(makeData(ctx, particle, 10));

      const lineTos = only(calls, "lineTo");

      expect(only(calls, "moveTo").length).to.equal(2);
      expect(lineTos.length).to.equal(2);
      expectArgs(argsOf(lineTos[0]), [10, 0]);
      expectArgs(argsOf(lineTos[1]), [10, 10]);
    });

    it("particleInit deep-copies the shape data into pathData", () => {
      const shapeData = {
          half: false,
          segments: [{ type: SegmentType.line, values: [{ x: 0.5, y: 0.5 }] }],
        },
        particle = { shapeData } as { pathData?: unknown; shapeData: unknown };

      path.particleInit?.(container, particle as unknown as Particle);

      expect(particle.pathData).to.eql(shapeData);
      expect(particle.pathData).to.not.equal(shapeData);
    });
  });

  describe("text", () => {
    it("draw records the composed font and the fillText position for a single line", () => {
      const { calls, ctx } = createRecorder(),
        particle = { shapeData: { font: "Arial", style: "italic", value: "Hi", weight: "700" } };

      text.draw(makeData(ctx, particle, 10));

      const texts = only(calls, "fillText");

      expect((ctx as { font: string }).font).to.equal('italic 700 10px "Arial"');
      expect(texts.length).to.equal(1);
      expect(texts[0][1]).to.equal("Hi");
      expectArgs(argsOf(texts[0]).slice(1), [-10, 5]);
    });

    it("multiline text shrinks the font and records one fillText per line", () => {
      const { calls, ctx } = createRecorder(),
        particle = { shapeData: { value: "AB\nCD" } };

      text.draw(makeData(ctx, particle, 10));

      const texts = only(calls, "fillText");

      expect((ctx as { font: string }).font).to.equal(' 400 5px "Verdana"');
      expect(texts.length).to.equal(2);
      expectArgs(argsOf(texts[0]).slice(1), [-5, 2.5]);
      expectArgs(argsOf(texts[1]).slice(1), [-5, 7.5]);
    });

    it("particleInit splits the value and computes the maximum line length", () => {
      const particle = { randomIndexData: 0, shape: "text", shapeData: { value: "abc" } } as {
        maxTextLength?: number;
        randomIndexData: number;
        shape: string;
        shapeData: unknown;
        textLines?: string[];
      };

      text.particleInit?.(container, particle as unknown as Particle);

      expect(particle.textLines).to.eql(["abc"]);
      expect(particle.maxTextLength).to.equal(3);
    });
  });

  describe("emoji", () => {
    it("particleInit resolves the emoji key and draw records the drawImage call", () => {
      const particle = { randomIndexData: 0, shapeData: { value: "😀" }, size: { value: 10 } } as {
        emojiDataKey?: string;
        randomIndexData: number;
        shapeData: unknown;
        size: { value: number };
      };

      emoji.particleInit?.(container, particle as unknown as Particle);

      expect(particle.emojiDataKey).to.contain("😀");

      const { calls, ctx } = createRecorder();

      emoji.draw(makeData(ctx, { emojiDataKey: particle.emojiDataKey }, 10));

      const images = only(calls, "drawImage");

      expect(images.length).to.equal(1);
      expectArgs(argsOf(images[0]).slice(1), [-10, -10, 20, 20]);
    });

    it("draw is a no-op when the particle has no resolved emoji key", () => {
      const { calls, ctx } = createRecorder();

      emoji.draw(makeData(ctx, {}, 10));

      expect(calls.length).to.equal(0);
    });
  });

  describe("image", () => {
    it("reports 12 sides and records a ratio-corrected drawImage call", () => {
      expect(image.getSidesCount?.({} as Particle)).to.equal(12);

      const { calls, ctx } = createRecorder(),
        element = {},
        particle = { image: { element, ratio: 2 } };

      image.draw(makeData(ctx, particle, 10, { opacity: 0.5 }));

      const images = only(calls, "drawImage");

      expect(images.length).to.equal(1);
      expect(images[0][1]).to.equal(element);
      expectArgs(argsOf(images[0]).slice(1), [-10, -10, 20, 10]);

      const { calls: emptyCalls, ctx: emptyCtx } = createRecorder();

      image.draw(makeData(emptyCtx, {}, 10));
      expect(emptyCalls.length).to.equal(0);
    });

    it("registers both image aliases and particleInit tolerates an unloaded image", () => {
      expect(registry.has("image")).to.be.true;
      expect(registry.has("images")).to.be.true;

      const particle = {
        getFillColor: () => undefined,
        shape: "image",
        shapeData: { height: 10, name: "missing", replaceColor: false, src: "missing.png", width: 10 },
      };

      expect(() => image.particleInit?.(container, particle as unknown as Particle)).to.not.throw();
    });
  });
});
