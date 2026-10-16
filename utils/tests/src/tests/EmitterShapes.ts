/* eslint-disable */
import { describe, expect, it, beforeAll } from "vitest";
import { tsParticles, type Container } from "@tsparticles/engine";
import { loadEmittersPlugin } from "@tsparticles/plugin-emitters";
import { loadEmittersShapeSquare } from "@tsparticles/plugin-emitters-shape-square";
import { loadEmittersShapeCircle } from "@tsparticles/plugin-emitters-shape-circle";
import { loadEmittersShapePolygon } from "@tsparticles/plugin-emitters-shape-polygon";
import { loadEmittersShapePath } from "@tsparticles/plugin-emitters-shape-path";
import { loadEmittersShapeCanvas } from "@tsparticles/plugin-emitters-shape-canvas";
import { loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

interface Coords {
  x: number;
  y: number;
}

interface Dims {
  width: number;
  height: number;
}

interface RandomPositionData {
  position: Coords;
}

interface ShapeLike {
  position: Coords;
  size: Dims;
  init(): Promise<void>;
  draw(context: OffscreenCanvasRenderingContext2D): void;
  randomPosition(): RandomPositionData | null;
  resize(position: Coords, size: Dims): void;
}

interface GeneratorLike {
  generate(container: Container, position: Coords, size: Dims, fill: boolean, options: unknown): ShapeLike;
}

interface ShapeManagerLike {
  getShapeGenerator(name: string): GeneratorLike | undefined;
}

type Call = [string, ...unknown[]];

class TestPath2D {
  moveTo(..._args: unknown[]): void {}
  lineTo(..._args: unknown[]): void {}
  closePath(): void {}
  arc(..._args: unknown[]): void {}
  rect(..._args: unknown[]): void {}
}

function createRecordingContext(): { calls: Call[]; context: OffscreenCanvasRenderingContext2D } {
  const calls: Call[] = [];
  const record =
    (name: string) =>
    (...args: unknown[]): void => {
      calls.push([name, ...args]);
    };
  const raw: Record<string, unknown> = {
    beginPath: record("beginPath"),
    closePath: record("closePath"),
    ellipse: record("ellipse"),
    arc: record("arc"),
    lineTo: record("lineTo"),
    moveTo: record("moveTo"),
    rect: record("rect"),
    fill: record("fill"),
    stroke: record("stroke"),
  };

  return { calls, context: raw as unknown as OffscreenCanvasRenderingContext2D };
}

const pathOperations = new Set(["beginPath", "moveTo", "lineTo", "closePath", "rect", "ellipse", "arc"]);

const pathOperationsOf = (calls: Call[]): Call[] => calls.filter(call => pathOperations.has(call[0]));

const position: Coords = { x: 100, y: 100 };
const size: Dims = { width: 40, height: 40 };
const minBound = 80;
const maxBound = 120;
const expectedCircleRadius = 20;
const expectedSquareRect: Call = ["rect", 80, 80, 40, 40];
const expectedCircleEllipse: Call = [
  "ellipse",
  100,
  100,
  expectedCircleRadius,
  expectedCircleRadius,
  0,
  0,
  Math.PI * 2,
];

let containerId = 0;
const nextId = (prefix: string): string => `${prefix}-${String(containerId++)}`;

function assertFiniteWithinBounds(random: RandomPositionData | null, label: string): void {
  expect(random, `${label} random position`).to.not.be.null;

  const coordinates = random?.position;

  expect(Number.isFinite(coordinates?.x), `${label} x finite`).to.be.true;
  expect(Number.isFinite(coordinates?.y), `${label} y finite`).to.be.true;
  expect(coordinates?.x, `${label} x min`).to.be.at.least(minBound);
  expect(coordinates?.x, `${label} x max`).to.be.at.most(maxBound);
  expect(coordinates?.y, `${label} y min`).to.be.at.least(minBound);
  expect(coordinates?.y, `${label} y max`).to.be.at.most(maxBound);
}

describe("Emitter shapes", async () => {
  globalThis.window = TestWindow;
  (globalThis as unknown as { Path2D: unknown }).Path2D = TestPath2D;

  let featureContainer: Container | undefined;

  const getGenerator = (name: string): GeneratorLike => {
    const manager = (tsParticles.pluginManager as unknown as { emitterShapeManager?: ShapeManagerLike })
        .emitterShapeManager,
      generator = manager?.getShapeGenerator(name);

    if (!generator) {
      throw new Error(`emitter shape generator ${name} not registered`);
    }

    return generator;
  };

  const generateShape = (name: string, fill: boolean, options: unknown): ShapeLike =>
    getGenerator(name).generate(featureContainer as Container, { ...position }, { ...size }, fill, options);

  beforeAll(async () => {
    await loadInteractivityPlugin(tsParticles);
    await loadEmittersPlugin(tsParticles);
    await loadEmittersShapeSquare(tsParticles);
    await loadEmittersShapeCircle(tsParticles);
    await loadEmittersShapePolygon(tsParticles);
    await loadEmittersShapePath(tsParticles);
    await loadEmittersShapeCanvas(tsParticles);

    const boot = await tsParticles.load({
      id: nextId("emitter-shapes-boot"),
      options: {},
      autoPlay: false,
      element: createCustomCanvas(64, 64) as unknown as HTMLCanvasElement,
    });

    boot?.destroy(false);

    featureContainer = (await tsParticles.load({
      id: nextId("emitter-shapes-feature"),
      options: {
        particles: {
          move: { enable: false },
          number: { value: 0 },
        },
      },
      autoPlay: false,
      element: createCustomCanvas(400, 400) as unknown as HTMLCanvasElement,
    })) as Container | undefined;
  });

  it("registers all five emitter shape generators retrievable by name", () => {
    for (const name of ["square", "circle", "polygon", "path", "canvas"]) {
      expect(getGenerator(name), `generator ${name}`).to.not.be.undefined;
    }
  }, 30000);

  describe("square", () => {
    it("[exact] draw records one rect centered at (100,100)", async () => {
      const shape = generateShape("square", true, {});

      await shape.init();

      const { calls, context } = createRecordingContext();

      shape.draw(context);

      expect(calls).to.deep.equal([expectedSquareRect]);
    }, 30000);

    it("[exact] randomPosition stays within the 40x40 fill bounds", async () => {
      const shape = generateShape("square", true, {});

      await shape.init();

      assertFiniteWithinBounds(shape.randomPosition(), "square");
    }, 30000);

    it("[exact] resize updates position and size", async () => {
      const shape = generateShape("square", true, {});

      await shape.init();

      shape.resize({ x: 5, y: 5 }, { width: 10, height: 10 });

      expect(shape.position).to.deep.equal({ x: 5, y: 5 });
      expect(shape.size).to.deep.equal({ width: 10, height: 10 });
    }, 30000);
  });

  describe("circle", () => {
    it("[exact] draw records one ellipse centered at (100,100) with size-derived radii", async () => {
      const shape = generateShape("circle", true, {});

      await shape.init();

      const { calls, context } = createRecordingContext();

      shape.draw(context);

      expect(calls).to.deep.equal([expectedCircleEllipse]);
    }, 30000);

    it("[exact] randomPosition stays within the 40x40 fill bounds", async () => {
      const shape = generateShape("circle", true, {});

      await shape.init();

      assertFiniteWithinBounds(shape.randomPosition(), "circle");
    }, 30000);

    it("[exact] resize updates position and size", async () => {
      const shape = generateShape("circle", true, {});

      await shape.init();

      shape.resize({ x: 5, y: 5 }, { width: 10, height: 10 });

      expect(shape.position).to.deep.equal({ x: 5, y: 5 });
      expect(shape.size).to.deep.equal({ width: 10, height: 10 });
    }, 30000);
  });

  describe("polygon", () => {
    it("[exact] draw traces five vertices derived from the configured sides", async () => {
      const shape = generateShape("polygon", true, { sides: 5, angle: 0 });

      await shape.init();

      const { calls, context } = createRecordingContext();

      shape.draw(context);

      const moveTo = calls.filter(call => call[0] === "moveTo"),
        lineTo = calls.filter(call => call[0] === "lineTo"),
        closePath = calls.filter(call => call[0] === "closePath");

      expect(moveTo.length).to.equal(1);
      expect(lineTo.length).to.equal(4);
      expect(closePath.length).to.equal(1);
      expect(moveTo[0]).to.deep.equal(["moveTo", 120, 100]);

      for (const call of [...moveTo, ...lineTo]) {
        const x = call[1] as number,
          y = call[2] as number;

        expect(x).to.be.at.least(minBound);
        expect(x).to.be.at.most(maxBound);
        expect(y).to.be.at.least(minBound);
        expect(y).to.be.at.most(maxBound);
      }
    }, 30000);

    it("[exact] randomPosition stays within the polygon bounds", async () => {
      const shape = generateShape("polygon", true, { sides: 5, angle: 0 });

      await shape.init();

      assertFiniteWithinBounds(shape.randomPosition(), "polygon");
    }, 30000);

    it("[exact] resize updates position, size and rebuilds the polygon", async () => {
      const shape = generateShape("polygon", true, { sides: 5, angle: 0 });

      await shape.init();

      shape.resize({ x: 5, y: 5 }, { width: 10, height: 10 });

      expect(shape.position).to.deep.equal({ x: 5, y: 5 });
      expect(shape.size).to.deep.equal({ width: 10, height: 10 });
    }, 30000);
  });

  describe("path", () => {
    const pathOptions = {
      points: [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
        { x: 100, y: 100 },
        { x: 0, y: 100 },
      ],
    };

    it("[exact] draw records the parsed percent points scaled into the shape bounds", async () => {
      const shape = generateShape("path", true, pathOptions);

      await shape.init();

      const { calls, context } = createRecordingContext();

      shape.draw(context);

      expect(calls).to.deep.equal([
        ["moveTo", 80, 80],
        ["lineTo", 120, 80],
        ["lineTo", 120, 120],
        ["lineTo", 80, 120],
        ["closePath"],
      ]);
    }, 30000);

    it("[structural] randomPosition returns null when the test Path2D cannot be hit-tested", async () => {
      const shape = generateShape("path", true, pathOptions);

      await shape.init();

      expect(shape.randomPosition()).to.be.null;
    }, 30000);

    it("[exact] resize updates position and size", async () => {
      const shape = generateShape("path", true, pathOptions);

      await shape.init();

      shape.resize({ x: 5, y: 5 }, { width: 10, height: 10 });

      expect(shape.position).to.deep.equal({ x: 5, y: 5 });
      expect(shape.size).to.deep.equal({ width: 10, height: 10 });
    }, 30000);
  });

  describe("canvas", () => {
    it("[exact] draw is the base no-op and records zero path operations", async () => {
      const shape = generateShape("canvas", true, {});

      await shape.init();

      const { calls, context } = createRecordingContext();

      shape.draw(context);

      expect(pathOperationsOf(calls).length).to.equal(0);
    }, 30000);

    it("[structural] randomPosition returns null when the default empty text yields no pixels", async () => {
      const shape = generateShape("canvas", true, {});

      await shape.init();

      expect(shape.randomPosition()).to.be.null;
    }, 30000);

    it("[exact] resize updates position and size", async () => {
      const shape = generateShape("canvas", true, {});

      await shape.init();

      shape.resize({ x: 5, y: 5 }, { width: 10, height: 10 });

      expect(shape.position).to.deep.equal({ x: 5, y: 5 });
      expect(shape.size).to.deep.equal({ width: 10, height: 10 });
    }, 30000);
  });
});
