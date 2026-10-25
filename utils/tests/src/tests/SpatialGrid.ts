/* eslint-disable @typescript-eslint/no-magic-numbers,@typescript-eslint/no-unused-expressions */
import { Circle, type Particle, Rectangle, tsParticles } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

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

describe("SpatialGrid nested queries", () => {
  globalThis.window = TestWindow as unknown as Window & typeof globalThis;
  for (const shape of ["circle", "rectangle"] as const) {
    it(`preserves the outer ${shape} through repeated nested queries`, async () => {
      const container = await tsParticles.load({
        id: `nested-grid-${shape}`,
        element: createCustomCanvas(100, 100) as unknown as HTMLCanvasElement,
        options: { autoPlay: false, particles: { number: { value: 0 } } },
      });

      if (!container) {
        throw new Error("Test container was not initialized");
      }

      try {
        const grid = container.particles.grid,
          particles = [0, 1, 2].map(x => ({ getPosition: () => ({ x, y: 0 }) }) as Particle);

        for (const particle of particles) {
          grid.insert(particle);
        }

        const nested = (): boolean => {
            grid.queryCircle({ x: 0, y: 0 }, 10, () => {
              grid.queryCircle({ x: 1000, y: 1000 }, 1);

              return true;
            });
            grid.queryRectangle({ x: 0, y: 0 }, { width: 10, height: 10 }, () => {
              grid.queryRectangle({ x: 1000, y: 1000 }, { width: 1, height: 1 });

              return true;
            });

            return true;
          },
          failure = new Error("filter failed"),
          throwFromFilter = (): boolean => {
            throw failure;
          };

        for (let repeat = 0; repeat < 2; repeat++) {
          const result =
            shape === "circle"
              ? grid.queryCircle({ x: 0, y: 0 }, 10, nested)
              : grid.queryRectangle({ x: 0, y: 0 }, { width: 10, height: 10 }, nested);

          expect(result).to.eql(particles);
        }
        expect(() => grid.queryCircle({ x: 0, y: 0 }, 10, throwFromFilter)).to.throw(failure);
        expect(() => grid.queryRectangle({ x: 0, y: 0 }, { width: 10, height: 10 }, throwFromFilter)).to.throw(failure);
        expect(grid.queryCircle({ x: 0, y: 0 }, 10)).to.eql(particles);
        expect(grid.queryRectangle({ x: 0, y: 0 }, { width: 10, height: 10 })).to.eql(particles);
      } finally {
        container.destroy(false);
      }
    });
  }
});
