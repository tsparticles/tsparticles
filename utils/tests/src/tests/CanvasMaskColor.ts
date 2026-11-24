import { describe, expect, it } from "vitest";
import type { CanvasPixelData } from "@tsparticles/canvas-utils";
import type { Container } from "@tsparticles/engine";
import { addParticlesFromCanvasPixels } from "../../../../plugins/canvasMask/src/utils.js";

describe("CanvasMask pixel color adoption", () => {
  const pixel = { a: 0.4, b: 12, g: 90, r: 230 },
    data: CanvasPixelData = {
      colorSpace: "display-p3",
      height: 1,
      pixels: [[pixel]],
      width: 1,
    };

  interface CapturedOptions {
    opacity?: { value?: unknown };
    paint?: { fill?: { color?: { value?: unknown } } };
  }

  it("passes source primaries to filters and avoids applying enabled pixel alpha twice", () => {
    const filterCalls: {
      colorSpace?: "display-p3" | "srgb";
      pixel: typeof pixel;
    }[] = [];
    let addedOptions: unknown;

    const container = {
      actualOptions: { particles: { number: { value: 1 } } },
      canvas: { size: { height: 100, width: 100 } },
      engine: { getRandomFn: () => () => 0 },
      particles: {
        addParticle: (_position: unknown, options: unknown): void => {
          addedOptions = options;
        },
      },
    } as unknown as Container;

    addParticlesFromCanvasPixels(
      container,
      data,
      { x: 50, y: 50 },
      1,
      { color: true, opacity: true },
      (value, colorSpace) => {
        filterCalls.push({ colorSpace, pixel: value });

        return true;
      },
    );

    expect(filterCalls).toEqual([{ colorSpace: "display-p3", pixel }]);
    const captured = addedOptions as CapturedOptions;

    expect(captured.paint?.fill?.color?.value).toEqual({
      ...pixel,
      a: 1,
      colorSpace: "display-p3",
    });
    expect(captured.opacity?.value).toBe(pixel.a);
  });

  it("retains pixel alpha in the adopted color when opacity override is disabled", () => {
    let addedOptions: unknown;

    const container = {
      actualOptions: { particles: { number: { value: 1 } } },
      canvas: { size: { height: 100, width: 100 } },
      engine: { getRandomFn: () => () => 0 },
      particles: {
        addParticle: (_position: unknown, options: unknown): void => {
          addedOptions = options;
        },
      },
    } as unknown as Container;

    addParticlesFromCanvasPixels(container, data, { x: 50, y: 50 }, 1, { color: true, opacity: false }, () => true);

    const captured = addedOptions as CapturedOptions;

    expect(captured.paint?.fill?.color?.value).toEqual({
      ...pixel,
      colorSpace: "display-p3",
    });
    expect(captured.opacity).toBeUndefined();
  });

  it("uses engine-seeded Fisher-Yates order and consumes n minus one random values", () => {
    const pixelData: CanvasPixelData = {
        height: 1,
        pixels: [[pixel, pixel, pixel, pixel]],
        width: 4,
      },
      positions: number[] = [],
      maximumRandomValue = 0.75,
      expectedPositions = Array.from({ length: pixelData.width }, (_, index) => pixelData.width - index - 1),
      expectedRandomCalls = pixelData.width - 1;
    let randomCalls = 0;

    const container = {
      actualOptions: { particles: { number: { value: 4 } } },
      canvas: { size: { height: 1, width: 4 } },
      engine: {
        getRandomFn: () => () => {
          randomCalls++;

          return maximumRandomValue;
        },
      },
      particles: {
        addParticle: (position: { x: number }): void => {
          positions.push(position.x);
        },
      },
    } as unknown as Container;

    addParticlesFromCanvasPixels(
      container,
      pixelData,
      { x: 50, y: 50 },
      1,
      { color: false, opacity: false },
      () => true,
    );

    expect(positions).toEqual(expectedPositions);
    expect(randomCalls).toBe(expectedRandomCalls);
  });
});
