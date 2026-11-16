/* eslint-disable */
import {
  type Container,
  type ISourceOptions,
  OutMode,
  OutModeDirection,
  createEngine,
  defaultAlpha,
  defaultTransform,
  double,
  half,
  millisecondsToSeconds,
  originPoint,
} from "@tsparticles/engine";
import { beforeAll, describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { loadBubbleEffect } from "@tsparticles/effect-bubble";
import { loadFilterEffect } from "@tsparticles/effect-filter";
import { loadHexColorPlugin } from "@tsparticles/plugin-hex-color";
import { loadParticlesEffect } from "@tsparticles/effect-particles";
import { loadShadowEffect } from "@tsparticles/effect-shadow";
import { loadTrailEffect } from "@tsparticles/effect-trail";

const tsParticles = createEngine();

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
  const record: any = { path: [], strokes: [], transforms: [], transformStack: [] },
    context: any = {
      arc: (x: number, y: number, radius: number): void => {
        record.arc = { x, y, radius };
      },
      beginPath: (): void => {
        record.path = [];
      },
      closePath: (): void => {},
      fill: (): void => {},
      save: (): void => {
        record.transformStack.push([...context.transform]);
      },
      restore: (): void => {
        context.transform = record.transformStack.pop();
      },
      setTransform: (...transform: number[]): void => {
        record.transforms.push(transform);
        context.transform = transform;
      },
      moveTo: (x: number, y: number): void => {
        record.path.push(["moveTo", x, y]);
      },
      quadraticCurveTo: (...coordinates: number[]): void => {
        record.path.push(["quadraticCurveTo", ...coordinates]);
      },
      stroke: (): void => {
        record.strokes.push({
          path: [...record.path],
          transform: [...context.transform],
          globalAlpha: context.globalAlpha,
          lineWidth: context.lineWidth,
          strokeStyle: context.strokeStyle,
        });
      },
      transform: [
        defaultTransform.a,
        defaultTransform.b,
        defaultTransform.c,
        defaultTransform.d,
        0,
        0,
      ],
      lineWidth: 0,
      lineCap: "",
      lineJoin: "",
      globalAlpha: 1,
      fillStyle: "",
      filter: "",
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: "",
    };

  return { context, record };
}

/**
 * Draws the pre-optimization trail algorithm for comparison tests.
 * @param context - The recording canvas context
 * @param trail - The ordered trail steps to draw
 * @param particle - The particle properties used for drawing
 * @param drawRadius - The particle radius
 * @param drawScale - The draw scale
 * @param pixelRatio - The canvas pixel ratio
 */
function drawOriginalTrail(
  context: any,
  trail: any[],
  particle: any,
  drawRadius: number,
  drawScale: number,
  pixelRatio: number,
): void {
  const diameter = drawRadius * double,
    pathLength = particle.trailLength * drawScale + drawRadius,
    trailLength = Math.min(trail.length, pathLength);

  context.save();

  context.lineCap = "butt";
  context.lineJoin = "round";

  for (let i = trailLength - 2; i > 0; i--) {
    const previousStep = trail[i + 1],
      step = trail[i],
      nextStep = trail[i - 1];

    if (!previousStep || !step || !nextStep || step.break || previousStep.break || nextStep.break) {
      continue;
    }

    const { position: previousPosition } = previousStep,
      { position } = step,
      { position: nextPosition } = nextStep,
      stepTransformData = particle.trailTransform ? (step.transformData ?? defaultTransform) : defaultTransform;

    context.setTransform(
      stepTransformData.a,
      stepTransformData.b,
      stepTransformData.c,
      stepTransformData.d,
      position.x,
      position.y,
    );

    const startX = (previousPosition.x + position.x) * half - position.x,
      startY = (previousPosition.y + position.y) * half - position.y,
      endX = (position.x + nextPosition.x) * half - position.x,
      endY = (position.y + nextPosition.y) * half - position.y,
      width = Math.max((i / trailLength) * diameter, pixelRatio, (particle.trailMinWidth ?? -1) * drawScale),
      oldAlpha = context.globalAlpha;

    context.beginPath();
    context.moveTo(startX, startY);
    context.quadraticCurveTo(originPoint.x, originPoint.y, endX, endY);

    context.globalAlpha = particle.trailFade ? i / trailLength : defaultAlpha;
    context.lineWidth = particle.trailMaxWidth ? Math.min(width, particle.trailMaxWidth * drawScale) : width;
    context.strokeStyle = step.color;
    context.stroke();

    context.globalAlpha = oldAlpha;
  }

  context.restore();
}

/**
 * Resolves a recorded path through the transform active for its stroke.
 * @param stroke - The recorded stroke
 * @returns The path in absolute canvas coordinates with its styling
 */
function resolveRecordedStroke(stroke: any): any {
  const [a, b, c, d, e, f] = stroke.transform,
    transformPoint = (x: number, y: number): number[] => [a * x + c * y + e, b * x + d * y + f],
    path = stroke.path.map(([operation, ...coordinates]: [string, ...number[]]) => {
      const points: number[][] = [];

      for (let i = 0; i < coordinates.length; i += 2) {
        points.push(transformPoint(coordinates[i], coordinates[i + 1]));
      }

      return [operation, ...points.flat()];
    });

  return {
    path,
    globalAlpha: stroke.globalAlpha,
    lineWidth: stroke.lineWidth,
    strokeStyle: stroke.strokeStyle,
  };
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

  it("trail effect initializes zero widths and suppresses strokes for zero maxWidth", async () => {
    const container = await loadContainer({
        particles: {
          number: { value: 1 },
          effect: {
            type: "trail",
            options: {
              trail: { length: 10, maxWidth: 0, minWidth: 0 },
            },
          },
        },
      }),
      particle = firstParticle(container),
      drawer = container.effectDrawers.get("trail"),
      { context, record } = createRecordingContext();

    expect(particle.trailMaxWidth).to.equal(0);
    expect(particle.trailMinWidth).to.equal(0);

    particle.trail = [0, 10].map(x => ({
      break: false,
      color: "#000000",
      position: { x, y: x },
    }));
    particle.trailLength = 10;

    drawer?.drawAfter?.({
      context,
      drawPosition: { x: 20, y: 20 },
      drawRadius: 2,
      drawScale: 1,
      particle,
      transformData: { a: 1, b: 0, c: 0, d: 1 },
    } as any);

    expect(record.strokes).to.have.length(0);

    container.destroy(false);
  }, 30000);

  it("trail drawer uses one transform for default trails and per-step transforms when enabled", async () => {
    const container = await loadContainer({ particles: { number: { value: 1 }, effect: { type: "trail" } } });

    try {
      const particle = firstParticle(container),
        drawer = container.effectDrawers.get("trail"),
        trail = [10, 20, 30, 40].map(x => ({
          break: false,
          color: "#000000",
          position: { x, y: x },
          transformData: { a: 1, b: 0, c: 0, d: 1 },
        }));

      particle.trail = trail;
      particle.trailLength = 20;
      particle.trailTransform = false;

      const { context: defaultContext, record: defaultRecord } = createRecordingContext();

      drawer?.drawAfter?.({
        context: defaultContext,
        drawPosition: { x: 50, y: 50 },
        drawRadius: 2,
        drawScale: 1,
        particle,
        transformData: { a: 1, b: 0, c: 0, d: 1 },
      } as any);

      expect(defaultRecord.transforms).to.have.length(1);
      expect(defaultRecord.strokes).to.have.length(3);
      expect(defaultRecord.strokes[0].path[0][1]).to.equal(45);

      particle.trail = trail.slice(0, 4);
      particle.trailTransform = true;

      const { context: transformedContext, record: transformedRecord } = createRecordingContext();

      drawer?.drawAfter?.({
        context: transformedContext,
        drawPosition: { x: 50, y: 50 },
        drawRadius: 2,
        drawScale: 1,
        particle,
        transformData: { a: 1, b: 0, c: 0, d: 1 },
      } as any);

      expect(transformedRecord.transforms).to.have.length(3);
      expect(transformedRecord.strokes).to.have.length(3);
      expect(transformedRecord.strokes[0].path[0][1]).to.equal(5);
    } finally {
      container.destroy(false);
    }
  }, 30000);

  it("default-transform trails match the original per-segment transform geometry and styling", async () => {
    const container = await loadContainer({ particles: { number: { value: 1 }, effect: { type: "trail" } } });

    try {
      const particle = firstParticle(container),
        drawer = container.effectDrawers.get("trail"),
        originalTrail = [10, 20, 30, 40].map(x => ({
          break: false,
          color: "#123456",
          position: { x, y: x * 2 },
          transformData: { a: 1, b: 0, c: 0, d: 1 },
        })),
        drawPosition = { x: 50, y: 45 },
        drawRadius = 5,
        drawScale = 1,
        trailLength = 20,
        trailFade = true,
        trailMinWidth = 1.5,
        trailMaxWidth = 3.5,
        transformData = { a: 1, b: 0, c: 0, d: 1 },
        { context: optimizedContext, record: optimizedRecord } = createRecordingContext(),
        { context: originalContext, record: originalRecord } = createRecordingContext();

      const initialTransform = [0.8, 0.1, 0.2, 1.2, 3, 4];

      optimizedContext.transform = initialTransform;
      originalContext.transform = initialTransform;
      optimizedContext.globalAlpha = originalContext.globalAlpha = 0.73;
      particle.trail = originalTrail.map(step => ({ ...step, position: { ...step.position } }));
      particle.trailLength = trailLength;
      particle.trailFade = trailFade;
      particle.trailMinWidth = trailMinWidth;
      particle.trailMaxWidth = trailMaxWidth;
      particle.trailTransform = false;

      drawer?.drawAfter?.({
        context: optimizedContext,
        drawPosition,
        drawRadius,
        drawScale,
        particle,
        transformData,
      } as any);

      const referenceTrail = [
        ...originalTrail,
        {
          break: false,
          color: originalContext.fillStyle,
          position: drawPosition,
          transformData,
        },
      ];

      drawOriginalTrail(originalContext, referenceTrail, particle, drawRadius, drawScale, container.retina.pixelRatio);

      expect(optimizedRecord.strokes.map(resolveRecordedStroke)).to.eql(
        originalRecord.strokes.map(resolveRecordedStroke),
      );
      expect(optimizedContext.transform).to.eql(initialTransform);
    } finally {
      container.destroy(false);
    }
  }, 30000);

  it("trail drawer trims excess history and draws only the configured trail length", async () => {
    const container = await loadContainer({ particles: { number: { value: 1 }, effect: { type: "trail" } } });

    try {
      const particle = firstParticle(container),
        drawer = container.effectDrawers.get("trail");

      particle.trail = [];
      particle.trailLength = 10;
      particle.trailTransform = false;
      particle.trailFade = true;

      const { context, record } = createRecordingContext();

      for (let i = 0; i < 100; i++) {
        const strokeCount = record.strokes.length;

        drawer?.drawAfter?.({
          context,
          drawPosition: { x: i, y: i },
          drawRadius: 0,
          drawScale: 1,
          particle,
          transformData: { a: 1, b: 0, c: 0, d: 1 },
        } as any);

        expect(particle.trail.length).to.be.at.most(Math.floor(particle.trailLength));

        if (i === 99) {
          expect(record.strokes.length - strokeCount).to.equal(8);
          expect(record.strokes[strokeCount].path[0][1]).to.equal(98.5);
        }
      }

      expect(particle.trail).to.have.length(10);

      particle.trail = [];
      particle.trailLength = 2;
      const { context: shortContext, record: shortRecord } = createRecordingContext();

      for (let i = 0; i < 12; i++) {
        drawer?.drawAfter?.({
          context: shortContext,
          drawPosition: { x: i, y: i },
          drawRadius: 0,
          drawScale: 1,
          particle,
          transformData: { a: 1, b: 0, c: 0, d: 1 },
        } as any);

        expect(particle.trail.length).to.be.at.most(2);
      }

      expect(particle.trail).to.have.length(2);
      expect(shortRecord.strokes).to.be.empty;

      particle.trail = [];
      particle.trailLength = 3;

      for (let i = 0; i < 3; i++) {
        drawer?.drawAfter?.({
          context: shortContext,
          drawPosition: { x: i, y: i },
          drawRadius: 0,
          drawScale: 1,
          particle,
          transformData: { a: 1, b: 0, c: 0, d: 1 },
        } as any);
      }

      expect(shortRecord.strokes).to.have.length(1);
    } finally {
      container.destroy(false);
    }
  }, 30000);

  it("trail bounds include broken steps, apply changing radius at read time, and reset on particle reuse", async () => {
    const container = await loadContainer({ particles: { number: { value: 1 }, effect: { type: "trail" } } });

    try {
      const particle = firstParticle(container),
        drawer = container.effectDrawers.get("trail"),
        { context } = createRecordingContext(),
        bounds = {
          canvasSize: { width: 100, height: 100 },
          direction: OutModeDirection.right,
          outMode: OutMode.out,
          particle,
          radius: 1,
        };

      particle.position.x = 210;
      particle.position.y = 50;
      particle.trailLength = 4;
      particle.trailTransform = false;
      particle.trail = [
        { break: true, color: "#000000", position: { x: 50, y: 50 } },
        { break: false, color: "#000000", position: { x: 200, y: 50 } },
        { break: false, color: "#000000", position: { x: 201, y: 50 } },
      ];

      drawer?.drawAfter?.({
        context,
        drawPosition: { x: 202, y: 50 },
        drawRadius: 0,
        drawScale: 1,
        particle,
        transformData: { a: 1, b: 0, c: 0, d: 1 },
      } as any);

      expect(drawer?.isInsideCanvas?.(bounds)).to.be.true;
      expect(
        drawer?.isInsideCanvas?.({
          ...bounds,
          outMode: OutMode.bounce,
        }),
      ).to.be.false;
      expect(
        drawer?.isInsideCanvas?.({
          ...bounds,
          outMode: OutMode.split,
        }),
      ).to.be.false;

      particle.trail = [{ break: false, color: "#000000", position: { x: 110, y: 50 } }];
      particle.position.x = 110;

      expect(drawer?.isInsideCanvas?.(bounds)).to.be.false;
      expect(drawer?.isInsideCanvas?.({ ...bounds, radius: 20 })).to.be.true;

      drawer?.particleInit?.(container, particle);

      expect(particle.trail).to.be.empty;
      particle.position.x = 210;
      expect(drawer?.isInsideCanvas?.(bounds)).to.be.false;
    } finally {
      container.destroy(false);
    }
  }, 30000);

  it("trail out-mode direction checks account for trail bounds except for bounce and split", async () => {
    const container = await loadContainer({ particles: { number: { value: 1 }, effect: { type: "trail" } } });

    try {
      const particle = firstParticle(container),
        drawer = container.effectDrawers.get("trail"),
        canvasSize = { width: 100, height: 100 },
        radius = 5,
        directions = [
          { direction: OutModeDirection.bottom, x: 50, y: 106 },
          { direction: OutModeDirection.left, x: -6, y: 50 },
          { direction: OutModeDirection.right, x: 106, y: 50 },
          { direction: OutModeDirection.top, x: 50, y: -6 },
        ];

      particle.trail = [
        {
          break: false,
          color: "#000000",
          position: { x: 50, y: 50 },
        },
      ];

      for (const { direction, x, y } of directions) {
        particle.position.x = x;
        particle.position.y = y;
        particle.offset.x = 0;
        particle.offset.y = 0;

        for (const outMode of Object.values(OutMode)) {
          const inside = drawer?.isInsideCanvas?.({ canvasSize, direction, outMode, particle, radius });

          expect(inside, `${outMode} ${direction}`).to.equal(
            outMode === OutMode.bounce || outMode === OutMode.split ? false : true,
          );
        }
      }
    } finally {
      container.destroy(false);
    }
  }, 30000);

  it("uses the particle head bounds for trail bounce checks", async () => {
    const container = await loadContainer({
        particles: {
          number: { value: 1 },
          effect: { type: "trail" },
        },
      }),
      particle = firstParticle(container),
      canvasWidth = container.canvas.size.width,
      radius = particle.getRadius(),
      drawer = container.effectDrawers.get("trail"),
      bounds = {
        canvasSize: container.canvas.size,
        direction: OutModeDirection.right,
        particle,
        radius,
      };

    try {
      particle.position.x = canvasWidth + radius + 1;
      particle.trail = [
        {
          break: false,
          color: "#000000",
          position: { x: canvasWidth - 1, y: particle.position.y },
        },
      ];

      expect(drawer?.isInsideCanvas?.({ ...bounds, outMode: OutMode.bounce })).to.be.false;
      expect(drawer?.isInsideCanvas?.({ ...bounds, outMode: OutMode.out })).to.be.true;
    } finally {
      container.destroy(false);
    }
  }, 30000);

  it("uses offset-aware positions for trail bounce and split checks in every direction", async () => {
    const container = await loadContainer({
      particles: {
        number: { value: 1 },
        effect: { type: "trail" },
      },
    });

    try {
      const particle = firstParticle(container),
        canvasWidth = container.canvas.size.width,
        canvasHeight = container.canvas.size.height,
        radius = particle.getRadius(),
        drawer = container.effectDrawers.get("trail"),
        insideCanvasSize = { width: 100, height: 100 },
        directions = [
          {
            direction: OutModeDirection.bottom,
            x: canvasWidth / 2,
            y: canvasHeight - radius - 1,
            offsetX: 0,
            offsetY: 3,
          },
          {
            direction: OutModeDirection.left,
            x: radius + 1,
            y: canvasHeight / 2,
            offsetX: -(radius + 2),
            offsetY: 0,
          },
          {
            direction: OutModeDirection.right,
            x: canvasWidth - radius - 1,
            y: canvasHeight / 2,
            offsetX: 3,
            offsetY: 0,
          },
          {
            direction: OutModeDirection.top,
            x: canvasWidth / 2,
            y: radius + 1,
            offsetX: 0,
            offsetY: -(radius + 2),
          },
        ];

      for (const outMode of [OutMode.bounce, OutMode.split]) {
        for (const { direction, x, y, offsetX, offsetY } of directions) {
          particle.position.x = x;
          particle.position.y = y;
          particle.offset.x = offsetX;
          particle.offset.y = offsetY;

          expect(
            drawer?.isInsideCanvas?.({
              canvasSize: container.canvas.size,
              direction,
              outMode,
              particle,
              radius,
            }),
          ).to.be.false;

          particle.position.x = insideCanvasSize.width / 2;
          particle.position.y = insideCanvasSize.height / 2;
          particle.offset.x = 0;
          particle.offset.y = 0;

          expect(
            drawer?.isInsideCanvas?.({
              canvasSize: insideCanvasSize,
              direction,
              outMode,
              particle,
              radius,
            }),
          ).to.be.true;
        }
      }
    } finally {
      container.destroy();
    }
  }, 30000);

  it("uses offsets for directionless trail bounce and split bounds", async () => {
    const container = await loadContainer({ particles: { number: { value: 1 }, effect: { type: "trail" } } });

    try {
      const particle = firstParticle(container),
        drawer = container.effectDrawers.get("trail"),
        radius = particle.getRadius();

      particle.position.x = container.canvas.size.width / 2;
      particle.position.y = container.canvas.size.height / 2;
      particle.offset.x = container.canvas.size.width + radius + 1;
      for (const outMode of [OutMode.bounce, OutMode.split]) {
        expect(drawer?.isInsideCanvas?.({ canvasSize: container.canvas.size, particle, radius, outMode })).to.be.false;
      }
      expect(drawer?.isInsideCanvas?.({ canvasSize: container.canvas.size, particle, radius, outMode: OutMode.out })).to
        .be.true;
    } finally {
      container.destroy();
    }
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
