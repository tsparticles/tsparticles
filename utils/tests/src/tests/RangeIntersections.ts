/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
  Circle,
  Rectangle,
} from "../../../../engine/src/Core/Particles/Ranges.js";
import { describe, expect, it } from "vitest";

describe("circle and rectangle intersections", () => {
  it.each([
    {
      label: "far below the rectangle",
      x: 5,
      y: 100,
      radius: 1,
      expected: false,
    },
    {
      label: "far beside the rectangle",
      x: 100,
      y: 5,
      radius: 1,
      expected: false,
    },
    {
      label: "outside the rounded corner",
      x: 11,
      y: 11,
      radius: 1,
      expected: false,
    },
    { label: "inside the rectangle", x: 5, y: 5, radius: 1, expected: true },
    {
      label: "overlapping its left edge",
      x: -0.5,
      y: 5,
      radius: 1,
      expected: true,
    },
    {
      label: "overlapping its corner",
      x: 10.5,
      y: 10.5,
      radius: 1,
      expected: true,
    },
    { label: "tangent to its edge", x: 11, y: 5, radius: 1, expected: true },
    { label: "a point inside", x: 5, y: 5, radius: 0, expected: true },
  ])("$label", ({ x, y, radius, expected }) => {
    const rectangle = new Rectangle(0, 0, 10, 10),
      circle = new Circle(x, y, radius);

    expect(circle.intersects(rectangle)).toBe(expected);
    expect(rectangle.intersects(circle)).toBe(expected);
  });
});
