import { describe, expect, it } from "vitest";
import type { Particle } from "../../../../engine/src/Core/Particle.js";
import { SpatialHashGrid } from "../../../../engine/src/Core/Utils/SpatialHashGrid.js";

const cellSize = 64,
  sparseRadius = 10_000,
  outerRadius = 1_000;

function particleAt({ x, y }: { x: number; y: number }): Particle {
  return { getPosition: () => ({ x, y, z: 0 }) } as Particle;
}

describe("SpatialHashGrid", () => {
  it("preserves cell order, insertion order, and the output prefix for sparse queries", () => {
    const grid = new SpatialHashGrid(cellSize),
      prefix = particleAt({ x: 1, y: 1 }),
      first = particleAt({ x: -130, y: 70 }),
      second = particleAt({ x: -1, y: -70 }),
      third = particleAt({ x: -2, y: -71 }),
      fourth = particleAt({ x: -1, y: 70 }),
      fifth = particleAt({ x: 100, y: -200 }),
      outsideCircle = particleAt({ x: 8_000, y: 8_000 }),
      outside = particleAt({ x: 12_000, y: 12_000 }),
      out = [prefix];

    for (const particle of [fifth, fourth, second, outsideCircle, outside, third, first]) {
      grid.insert(particle);
    }

    expect(grid.queryCircle({ x: 0, y: 0 }, sparseRadius, undefined, out)).toBe(out);
    expect(out).toEqual([prefix, first, second, third, fourth, fifth]);
    expect(grid.queryRectangle({ x: -5_000, y: -5_000 }, { width: 10_000, height: 10_000 })).toEqual([
      first,
      second,
      third,
      fourth,
      fifth,
    ]);
  });

  it("keeps predicate traversal live and supports nested queries", () => {
    const grid = new SpatialHashGrid(cellSize),
      first = particleAt({ x: 0, y: 0 }),
      added = particleAt({ x: 640, y: 0 }),
      visited: Particle[] = [];

    grid.insert(first);

    const results = grid.queryCircle({ x: 0, y: 0 }, outerRadius, particle => {
      visited.push(particle);

      if (particle === first) {
        grid.insert(added);
        expect(grid.queryCircle({ x: 640, y: 0 }, 1)).toEqual([added]);
      }

      return particle === added;
    });

    expect(visited).toEqual([first, added]);
    expect(results).toEqual([added]);
  });

  it("leaves the output intact for nonfinite and unsafe cell bounds", () => {
    const grid = new SpatialHashGrid(1),
      particle = particleAt({ x: 0, y: 0 }),
      out = [particle];

    grid.insert(particle);

    expect(grid.queryCircle({ x: 0, y: 0 }, Infinity, undefined, out)).toBe(out);
    expect(grid.queryCircle({ x: 0, y: NaN }, 1, undefined, out)).toBe(out);
    expect(grid.queryCircle({ x: Number.MAX_SAFE_INTEGER + 1, y: 0 }, 0, undefined, out)).toBe(out);
    expect(out).toEqual([particle]);
  });
});
