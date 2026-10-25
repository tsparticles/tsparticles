/* eslint-disable */
import { drawLine, getCanvasImageData } from "./index.js";
import { describe, expect, it } from "vitest";

function mockContext() {
  const calls: unknown[][] = [];

  return {
    calls,
    beginPath: (): void => {
      calls.push(["beginPath"]);
    },
    clearRect: (x: number, y: number, w: number, h: number): void => {
      calls.push(["clearRect", x, y, w, h]);
    },
    closePath: (): void => {
      calls.push(["closePath"]);
    },
    getImageData: (_x: number, _y: number, w: number, h: number) => ({
      data: new Uint8ClampedArray(w * h * 4).fill(255),
    }),
    lineTo: (x: number, y: number): void => {
      calls.push(["lineTo", x, y]);
    },
    moveTo: (x: number, y: number): void => {
      calls.push(["moveTo", x, y]);
    },
  };
}

describe("canvas-utils", () => {
  it("drawLine records a closed path", () => {
    const context = mockContext();

    drawLine(context as never, { x: 1, y: 2 }, { x: 3, y: 4 });

    expect(context.calls).to.deep.equal([["beginPath"], ["moveTo", 1, 2], ["lineTo", 3, 4], ["closePath"]]);
  });

  it("getCanvasImageData decodes pixels and clears the canvas", () => {
    const context = mockContext(),
      res = getCanvasImageData(context as never, { width: 2, height: 1 }, 4, true);

    expect(res.width).to.equal(2);
    expect(res.height).to.equal(1);
    expect(res.pixels[0]?.[0]).to.deep.equal({ r: 255, g: 255, b: 255, a: 1 });
    expect(context.calls.some(call => call[0] === "clearRect")).to.be.true;
  });
});
