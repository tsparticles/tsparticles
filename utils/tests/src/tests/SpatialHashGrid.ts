import { describe, expect, it } from "vitest";
import type { Particle } from "../../../../engine/src/Core/Particles/Particle.js";
import { SpatialHashGrid } from "../../../../engine/src/Core/Particles/SpatialHashGrid.js";

const cellSize = 64,
  largeCellSize = 1_024,
  resizedCellSize = 32,
  sparseRadius = 10_000,
  outerRadius = 1_000;

function particleAt({ x, y }: { x: number; y: number }): Particle {
  return { getPosition: () => ({ x, y, z: 0 }) } as Particle;
}

describe("SpatialHashGrid", () => {
  it("matches independent geometric fixtures in dense and sparse scans", () => {
    const positions = [
        { x: -64, y: 0 },
        { x: 0, y: -64 },
        { x: 0, y: 0 },
        { x: 0, y: 64 },
        { x: 64, y: 0 },
        { x: 64, y: 64 },
        { x: -65, y: 0 },
        { x: 65, y: 0 },
      ],
      particles = positions.map(particleAt);

    for (const size of [1, cellSize, largeCellSize]) {
      const grid = new SpatialHashGrid(size),
        ordered = particles.toSorted((a, b) => {
          const first = a.getPosition(),
            second = b.getPosition();

          return (
            Math.floor(first.x / size) - Math.floor(second.x / size) ||
            Math.floor(first.y / size) - Math.floor(second.y / size)
          );
        });

      for (const particle of particles) {
        grid.insert(particle);
      }

      // Expected membership does not call the engine's range or distance helpers.
      expect(grid.queryCircle({ x: 0, y: 0 }, cellSize)).toEqual(
        ordered.filter((particle) => {
          const { x, y } = particle.getPosition();

          return x * x + y * y <= cellSize * cellSize;
        }),
      );
      expect(
        grid.queryRectangle(
          { x: -cellSize, y: -cellSize },
          { width: 128, height: 128 },
        ),
      ).toEqual(
        ordered.filter((particle) => {
          const { x, y } = particle.getPosition();

          return (
            x >= -cellSize && x <= cellSize && y >= -cellSize && y <= cellSize
          );
        }),
      );
    }
  });

  it("applies the latest requested cell size only at clear and releases old membership", () => {
    const grid = new SpatialHashGrid(cellSize),
      particle = particleAt({ x: -65, y: 64 });

    grid.insert(particle);
    grid.cellSize = 16;
    grid.cellSize = resizedCellSize;

    expect(grid.cellSize).toBe(cellSize);
    expect(grid.queryCircle({ x: -65, y: 64 }, 0)).toEqual([particle]);

    grid.clear();

    expect(grid.cellSize).toBe(resizedCellSize);
    expect(grid.queryCircle({ x: -65, y: 64 }, 0)).toEqual([]);

    grid.insert(particle);
    expect(grid.queryCircle({ x: -65, y: 64 }, 0)).toEqual([particle]);
    grid.clear();
    expect(grid.cellSize).toBe(resizedCellSize);
  });

  it("keeps insertion-time cells but reads live positions until the next rebuild", () => {
    const grid = new SpatialHashGrid(cellSize),
      position = { x: 1, y: 1, z: 0 },
      particle = { getPosition: () => position } as Particle;

    grid.insert(particle);
    position.x = 2;
    expect(grid.queryCircle({ x: 1, y: 1 }, 0)).toEqual([]);
    expect(grid.queryCircle({ x: 2, y: 1 }, 0)).toEqual([particle]);

    position.x = 640;
    expect(grid.queryCircle({ x: 640, y: 1 }, 0)).toEqual([]);
    expect(grid.queryCircle({ x: 0, y: 0 }, outerRadius)).toEqual([particle]);

    grid.clear();
    grid.insert(particle);
    expect(grid.queryCircle({ x: 640, y: 1 }, 0)).toEqual([particle]);
  });

  it("visits particles appended to the current cell and skips cells cleared by a predicate", () => {
    const grid = new SpatialHashGrid(cellSize),
      first = particleAt({ x: 0, y: 0 }),
      sameCell = particleAt({ x: 1, y: 0 }),
      laterCell = particleAt({ x: 640, y: 0 }),
      visited: Particle[] = [];

    grid.insert(first);
    grid.insert(laterCell);

    expect(
      grid.queryCircle({ x: 0, y: 0 }, outerRadius, (particle) => {
        visited.push(particle);

        if (particle === first) {
          grid.insert(sameCell);
        } else if (particle === sameCell) {
          grid.clear();
        }

        return true;
      }),
    ).toEqual([first, sameCell]);
    expect(visited).toEqual([first, sameCell]);
    expect(grid.queryCircle({ x: 0, y: 0 }, outerRadius)).toEqual([]);
  });

  it("runs the predicate before the live geometric check", () => {
    const grid = new SpatialHashGrid(cellSize),
      position = { x: 2, y: 0, z: 0 },
      particle = { getPosition: () => position } as Particle;

    grid.insert(particle);

    expect(
      grid.queryCircle({ x: 0, y: 0 }, 1, () => {
        position.x = 0;

        return true;
      }),
    ).toEqual([particle]);
  });

  it("keeps retained outputs independent across nested queries and grid clears", () => {
    const grid = new SpatialHashGrid(cellSize),
      other = new SpatialHashGrid(cellSize),
      particle = particleAt({ x: 0, y: 0 });

    grid.insert(particle);

    const retained = grid.queryCircle({ x: 0, y: 0 }, 1),
      out = [particle];

    expect(
      grid.queryRectangle(
        { x: 0, y: 0 },
        { width: 1, height: 1 },
        () => {
          expect(grid.queryCircle({ x: 0, y: 0 }, 1)).toEqual([particle]);

          return true;
        },
        out,
      ),
    ).toBe(out);
    expect(out).toEqual([particle, particle]);
    expect(other.queryCircle({ x: 0, y: 0 }, 1)).toEqual([]);
    grid.clear();
    expect(retained).toEqual([particle]);
    expect(out).toEqual([particle, particle]);
  });

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

    for (const particle of [
      fifth,
      fourth,
      second,
      outsideCircle,
      outside,
      third,
      first,
    ]) {
      grid.insert(particle);
    }

    expect(grid.queryCircle({ x: 0, y: 0 }, sparseRadius, undefined, out)).toBe(
      out,
    );
    expect(out).toEqual([prefix, first, second, third, fourth, fifth]);
    expect(
      grid.queryRectangle(
        { x: -5_000, y: -5_000 },
        { width: 10_000, height: 10_000 },
      ),
    ).toEqual([first, second, third, fourth, fifth]);
  });

  it("keeps predicate traversal live and supports nested queries", () => {
    const grid = new SpatialHashGrid(cellSize),
      first = particleAt({ x: 0, y: 0 }),
      added = particleAt({ x: 640, y: 0 }),
      visited: Particle[] = [];

    grid.insert(first);

    const results = grid.queryCircle(
      { x: 0, y: 0 },
      outerRadius,
      (particle) => {
        visited.push(particle);

        if (particle === first) {
          grid.insert(added);
          expect(grid.queryCircle({ x: 640, y: 0 }, 1)).toEqual([added]);
        }

        return particle === added;
      },
    );

    expect(visited).toEqual([first, added]);
    expect(results).toEqual([added]);
  });

  it("leaves the output intact for nonfinite and unsafe cell bounds", () => {
    const grid = new SpatialHashGrid(1),
      particle = particleAt({ x: 0, y: 0 }),
      out = [particle];

    grid.insert(particle);

    expect(grid.queryCircle({ x: 0, y: 0 }, Infinity, undefined, out)).toBe(
      out,
    );
    expect(grid.queryCircle({ x: 0, y: NaN }, 1, undefined, out)).toBe(out);
    expect(
      grid.queryCircle(
        { x: Number.MAX_SAFE_INTEGER + 1, y: 0 },
        0,
        undefined,
        out,
      ),
    ).toBe(out);
    expect(out).toEqual([particle]);
  });
});
