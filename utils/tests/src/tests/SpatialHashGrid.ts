import { describe, expect, it } from "vitest";
import type { Particle } from "../../../../engine/src/Core/Particles/Particle.js";
import { SpatialHashGrid } from "../../../../engine/src/Core/Particles/SpatialHashGrid.js";

const cellSize = 64,
  largeCellSize = 1_024,
  resizedCellSize = 32,
  hugeRadius = 1_000_000,
  sparseRadius = 10_000,
  outerRadius = 1_000;

function particleAt({ x, y }: { x: number; y: number }): Particle {
  return { getPosition: () => ({ x, y, z: 0 }) } as Particle;
}

describe("SpatialHashGrid", () => {
  it("does not skip neighbors or return an old entry after removal and reinsertion from a predicate", () => {
    const grid = new SpatialHashGrid(cellSize),
      first = particleAt({ x: 0, y: 0 }),
      second = particleAt({ x: 1, y: 0 }),
      visited: Particle[] = [];
    let changed = false;

    grid.insert(first);
    grid.insert(second);
    expect(
      grid.queryCircle({ x: 0, y: 0 }, cellSize, (p) => {
        visited.push(p);
        if (!changed && p === first) {
          changed = true;
          grid.remove(first);
          grid.insert(first);
        }

        return true;
      }),
    ).toEqual([second, first]);
    expect(visited).toEqual([first, second, first]);
  });

  it("removes references from a current cell retained across a nested clear", () => {
    const grid = new SpatialHashGrid(cellSize),
      first = particleAt({ x: 0, y: 0 }),
      second = particleAt({ x: 1, y: 0 });

    grid.insert(first);
    grid.insert(second);
    expect(
      grid.queryCircle({ x: 0, y: 0 }, cellSize, (p) => {
        if (p === first) {
          grid.clear();
          grid.remove(second);
        }

        return true;
      }),
    ).toEqual([first]);
  });

  it("invalidates all active cells when their collection is retired", () => {
    const grid = new SpatialHashGrid(cellSize),
      first = particleAt({ x: 0, y: 0 }),
      second = particleAt({ x: 1, y: 0 });

    grid.insert(first);
    grid.insert(second);
    expect(
      grid.queryCircle({ x: 0, y: 0 }, cellSize, () => {
        expect(
          grid.queryCircle({ x: 0, y: 0 }, cellSize, () => {
            grid.clear(true);
            grid.insert(particleAt({ x: cellSize, y: 0 }));

            return true;
          }),
        ).toEqual([]);

        return true;
      }),
    ).toEqual([]);
    grid.clear();
    grid.insert(first);
    expect(grid.queryCircle({ x: 0, y: 0 }, cellSize)).toEqual([first]);
  });

  it("filters destroyed entries after allowing the predicate to observe their live state", () => {
    const grid = new SpatialHashGrid(cellSize),
      particle = particleAt({ x: 0, y: 0 });

    grid.insert(particle);
    particle.destroyed = true;
    expect(grid.queryCircle({ x: 0, y: 0 }, cellSize)).toEqual([]);
    expect(
      grid.queryCircle({ x: 0, y: 0 }, cellSize, (p) => {
        p.destroyed = false;

        return true;
      }),
    ).toEqual([particle]);
  });

  it("does not return a particle removed from inside getPosition without a predicate", () => {
    const grid = new SpatialHashGrid(cellSize);
    let armed = false;
    const particle = {
      getPosition: () => {
        if (armed) {
          grid.remove(particle);
        }

        return { x: 0, y: 0, z: 0 };
      },
    } as Particle;

    grid.insert(particle);
    armed = true;
    expect(grid.queryCircle({ x: 0, y: 0 }, cellSize)).toEqual([]);
  });

  it("keeps sparse predicate traversal live, ordered, and independent of empty coordinate area", () => {
    const grid = new SpatialHashGrid(cellSize),
      first = particleAt({ x: -64, y: 0 }),
      sameCell = particleAt({ x: -63, y: 0 }),
      earlier = particleAt({ x: -128, y: 0 }),
      futureY = particleAt({ x: -64, y: 64 }),
      futureX = particleAt({ x: 64, y: -64 }),
      distant = particleAt({ x: 640, y: 640 }),
      visited: Particle[] = [];

    grid.insert(distant);
    grid.insert(first);

    const result = grid.queryCircle({ x: 0, y: 0 }, hugeRadius, (particle) => {
      visited.push(particle);

      if (particle === first) {
        grid.insert(futureX);
        grid.insert(futureY);
        grid.insert(earlier);
        grid.insert(sameCell);
        expect(grid.queryCircle({ x: 64, y: -64 }, 0)).toEqual([futureX]);
      }

      return true;
    });

    expect(visited).toEqual([first, sameCell, futureY, futureX, distant]);
    expect(result).toEqual(visited);
  });

  it("rechecks future occupied cells after a predicate clears and resizes the grid", () => {
    const grid = new SpatialHashGrid(cellSize),
      first = particleAt({ x: 0, y: 0 }),
      stale = particleAt({ x: 640, y: 0 }),
      replacement = particleAt({ x: 128, y: 0 }),
      out = [stale];

    grid.insert(first);
    grid.insert(stale);

    expect(
      grid.queryCircle(
        { x: 0, y: 0 },
        sparseRadius,
        (particle) => {
          if (particle === first) {
            grid.cellSize = resizedCellSize;
            grid.clear();
            grid.insert(replacement);
          }

          return true;
        },
        out,
      ),
    ).toBe(out);
    expect(out).toEqual([stale, first, replacement]);
  });

  it("keeps the remaining scan order when a callback makes the grid dense", () => {
    const columns = 10,
      grid = new SpatialHashGrid(1),
      first = particleAt({ x: 0, y: 0 }),
      added = Array.from({ length: 128 }, (_, index) =>
        particleAt({
          x: (index + 1) % columns,
          y: Math.floor((index + 1) / columns),
        }),
      ),
      expected = [first, ...added].toSorted((a, b) => {
        const posA = a.getPosition(),
          posB = b.getPosition();

        return posA.x - posB.x || posA.y - posB.y;
      });

    grid.insert(first);

    expect(
      grid.queryRectangle(
        { x: 0, y: 0 },
        { width: 100, height: 100 },
        (particle) => {
          if (particle === first) {
            for (const item of added.toReversed()) {
              grid.insert(item);
            }
          }

          return true;
        },
      ),
    ).toEqual(expected);
  });

  it.each([0, -1, NaN, Infinity, -Infinity])(
    "rejects invalid cell size %s without corrupting pending state",
    (value) => {
      expect(() => new SpatialHashGrid(value)).toThrow(RangeError);

      const grid = new SpatialHashGrid(cellSize),
        particle = particleAt({ x: 1, y: 1 });

      grid.insert(particle);
      grid.cellSize = resizedCellSize;

      expect(() => {
        grid.cellSize = value;
      }).toThrow(RangeError);
      expect(grid.cellSize).toBe(cellSize);
      expect(grid.queryCircle({ x: 1, y: 1 }, 0)).toEqual([particle]);
      grid.clear();
      expect(grid.cellSize).toBe(resizedCellSize);
    },
  );

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
