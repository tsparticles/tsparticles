import { type Container, displayP3ToOklch, half } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import type { CanvasPixelData } from "../../../../plugins/emittersShapes/canvas/src/types.js";
import { EmittersCanvasShape } from "../../../../plugins/emittersShapes/canvas/src/EmittersCanvasShape.js";
import { EmittersCanvasShapeOptions } from "../../../../plugins/emittersShapes/canvas/src/Options/Classes/EmittersCanvasShapeOptions.js";
import { sampledPixelToOklcha } from "../../../../plugins/emitters/src/PixelColorUtils.js";

describe("canvas emitter sampled color", () => {
  it("retains source primaries through filtering and canonical color adoption", () => {
    const pixel = { a: half, b: 0, g: 0, r: 255 },
      pixelData: CanvasPixelData = { colorSpace: "display-p3", height: 1, pixels: [[pixel]], width: 1 },
      filterCalls: { colorSpace?: "display-p3" | "srgb"; pixel: typeof pixel }[] = [],
      options = new EmittersCanvasShapeOptions();

    options.filter = (value, colorSpace) => {
      filterCalls.push({ colorSpace, pixel: value });

      return true;
    };

    const shape = new EmittersCanvasShape({} as Container, { x: 50, y: 50 }, { height: 1, width: 1 }, true, options);

    shape.pixelData = pixelData;

    const spawnData = shape.randomPosition(() => half);

    expect(filterCalls).toEqual([{ colorSpace: "display-p3", pixel }]);
    expect(spawnData).toEqual({
      color: pixel,
      colorSpace: "display-p3",
      opacity: half,
      position: { x: 49.5, y: 49.5 },
    });
    expect(sampledPixelToOklcha(spawnData?.color, spawnData?.colorSpace)).toEqual({
      ...displayP3ToOklch(pixel),
      a: 1,
    });
  });
});
