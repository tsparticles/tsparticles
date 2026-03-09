/* eslint-disable @typescript-eslint/no-magic-numbers,@typescript-eslint/no-unused-expressions */
import { Circle, Rectangle } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";

describe("SpatialGrid tests", () => {
  describe("Rectangle (0, 0, 50, 50) tests", () => {
    const rect1 = new Rectangle(0, 0, 50, 50);

    it("should intersect with a (40, 40, 10, 10) rectangle", () => {
      const rect2 = new Rectangle(40, 40, 10, 10);

      expect(rect1.intersects(rect2)).to.be.true;
      expect(rect2.intersects(rect1)).to.be.true;
    });

    it("should intersect with a (40, 40, 10) Circle", () => {
      const circle2 = new Circle(40, 40, 10);

      expect(rect1.intersects(circle2)).to.be.true;
      expect(circle2.intersects(rect1)).to.be.true;
    });

    it("should intersect with a (40, 40, 20) Circle", () => {
      const circle2 = new Circle(40, 40, 20);

      expect(rect1.intersects(circle2)).to.be.true;
      expect(circle2.intersects(rect1)).to.be.true;
    });
  });

  describe("Circle (0, 0, 30) tests", () => {
    const circle1 = new Circle(0, 0, 30);

    it("should intersect with a (10, 10, 20, 20) rectangle", () => {
      const rect2 = new Rectangle(10, 10, 20, 20);

      expect(circle1.intersects(rect2)).to.be.true;
      expect(rect2.intersects(circle1)).to.be.true;
    });

    it("should intersect with a (10, 10, 20) Circle", () => {
      const circle2 = new Circle(10, 10, 20);

      expect(circle1.intersects(circle2)).to.be.true;
      expect(circle2.intersects(circle1)).to.be.true;
    });
  });

  describe("Circle (776, 352, 200)", () => {
    const circle1 = new Circle(776, 352, 200);

    it("should intersect with a (-634, -190, 1143, 3807) rectangle", () => {
      const rect2 = new Rectangle(-634, -190, 1143, 3807);

      expect(circle1.intersects(rect2)).to.be.true;
      expect(rect2.intersects(circle1)).to.be.true;
    });
  });
});
