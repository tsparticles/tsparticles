/* eslint-disable */
import { SegmentType } from "./SegmentType.js";
import { drawPath } from "./Utils.js";
import { describe, expect, it } from "vitest";

function mockContext() {
  const calls: unknown[][] = [];

  return {
    calls,
    arc: (...args: unknown[]): void => {
      calls.push(["arc", ...args]);
    },
    bezierCurveTo: (...args: unknown[]): void => {
      calls.push(["bezierCurveTo", ...args]);
    },
    ellipse: (...args: unknown[]): void => {
      calls.push(["ellipse", ...args]);
    },
    lineTo: (...args: unknown[]): void => {
      calls.push(["lineTo", ...args]);
    },
    moveTo: (...args: unknown[]): void => {
      calls.push(["moveTo", ...args]);
    },
    quadraticCurveTo: (...args: unknown[]): void => {
      calls.push(["quadraticCurveTo", ...args]);
    },
  };
}

describe("path-utils", () => {
  it("draws move/line segments scaled by radius", () => {
    const context = mockContext();

    drawPath(context as never, 2, {
      half: false,
      segments: [
        { type: SegmentType.move, values: [{ x: 1, y: 0 }] },
        { type: SegmentType.line, values: [{ x: 0, y: 1 }] },
      ],
    });

    expect(context.calls).to.deep.equal([
      ["moveTo", 2, 0],
      ["moveTo", 2, 0],
      ["lineTo", 0, 2],
    ]);
  });

  it("draws bezier and quadratic curves using all control points", () => {
    const context = mockContext();

    drawPath(context as never, 1, {
      half: false,
      segments: [
        {
          type: SegmentType.bezier,
          values: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 0, y: 1 },
          ],
        },
        {
          type: SegmentType.quadratic,
          values: [
            { x: 0, y: 0 },
            { x: 1, y: 1 },
            { x: 2, y: 2 },
          ],
        },
      ],
    });

    expect(context.calls[0]).to.deep.equal(["moveTo", 0, 0]);
    expect(context.calls[1]).to.deep.equal(["bezierCurveTo", 1, 0, 1, 1, 0, 1]);
    expect(context.calls[2]).to.deep.equal(["quadraticCurveTo", 1, 1, 2, 2]);
  });

  it("mirrors half paths across the y axis", () => {
    const context = mockContext();

    drawPath(context as never, 2, {
      half: true,
      segments: [
        { type: SegmentType.move, values: [{ x: 1, y: 0 }] },
        { type: SegmentType.line, values: [{ x: 2, y: 1 }] },
      ],
    });

    expect(context.calls).to.deep.equal([
      ["moveTo", 2, 0],
      ["moveTo", 2, 0],
      ["lineTo", 4, 2],
      ["lineTo", -4, 2],
    ]);
  });
});
