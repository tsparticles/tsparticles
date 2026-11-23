/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Circle, Rectangle } from "../../../../engine/src/Core/Particles/Ranges.js";
import { describe, expect, it } from "vitest";

describe("spatial range intersection geometry", () => {
  it.each([
    [0, 0, 1, 1000, 0, 1, 1, false],
    [0, 0, 1, 0, 1000, 1, 1, false],
    [0, 0, 1, -1000, 0, 1, 1, false],
    [0, 0, 1, 0, -1000, 1, 1, false],
    [0, 0, 1, -2, -2, 1, 1, false],
    [0, 0, 1, 1, 1, 1, 1, false],
    [0, 0, 5, 3, 4, 10, 10, true],
    [0, 0, 5, -13, -14, 10, 10, true],
    [0, 0, 1, 1, 0, 2, 2, true],
    [0, 0, 1, -3, 0, 2, 2, true],
    [0, 0, 1, 0, 1, 2, 2, true],
    [0, 0, 1, 0, -3, 2, 2, true],
    [5, 5, 1, 0, 0, 10, 10, true],
    [0, 0, 10, 1, 1, 2, 2, true],
    [0, 0, 0, 0, 0, 0, 0, true],
    [0, 0, 1, 1, 0, 0, 0, true],
    [0, 0, 1, 2, 0, 0, 0, false],
    [0, 0, -1, 0, 0, 1, 1, false],
    [0, 0, 1, 0, 0, -1, 1, false],
    [0, 0, 1, 0, 0, 1, -1, false],
  ] as const)(
    "circle (%s,%s,r=%s) and rectangle (%s,%s,%s,%s) intersect: %s",
    (x, y, radius, rectX, rectY, width, height, expected) => {
      const circle = new Circle(x, y, radius),
        rectangle = new Rectangle(rectX, rectY, width, height);

      expect(circle.intersects(rectangle)).toBe(expected);
      expect(rectangle.intersects(circle)).toBe(expected);
    },
  );

  it("is translation invariant for separated and tangent shapes", () => {
    for (const offset of [-10_000, 0, 10_000]) {
      const circle = new Circle(offset, offset, 5),
        tangent = new Rectangle(offset + 3, offset + 4, 1, 1),
        outside = new Rectangle(offset + 4, offset + 4, 1, 1);

      expect(circle.intersects(tangent)).toBe(true);
      expect(circle.intersects(outside)).toBe(false);
    }
  });

  it("retains strict overlap for circle/circle and rectangle/rectangle", () => {
    expect(new Circle(0, 0, 1).intersects(new Circle(2, 0, 1))).toBe(false);
    expect(new Circle(0, 0, 1).intersects(new Circle(1, 0, 1))).toBe(true);
    expect(new Rectangle(0, 0, 1, 1).intersects(new Rectangle(1, 0, 1, 1))).toBe(false);
    expect(new Rectangle(0, 0, 2, 2).intersects(new Rectangle(1, 0, 1, 1))).toBe(true);
  });
});
