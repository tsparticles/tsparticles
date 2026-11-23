/* eslint-disable @typescript-eslint/no-magic-numbers */
import { describe, expect, it } from "vitest";
import type { Container } from "@tsparticles/engine";
import { InteractionManager } from "../../../../plugins/interactivity/src/InteractionManager.js";
import type { InteractivityPluginManager } from "../../../../plugins/interactivity/src/InteractivityPluginManagerTypes.js";
import { InteractorType } from "../../../../plugins/interactivity/src/Enums/InteractorType.js";
import { SpatialHashGrid } from "../../../../engine/src/Core/Particles/SpatialHashGrid.js";

function fixture(distances: number[], pixelRatio = 1): { grid: SpatialHashGrid; manager: InteractionManager } {
  const grid = new SpatialHashGrid(64),
    container = { particles: { grid }, retina: { pixelRatio } } as unknown as Container,
    manager = new InteractionManager({} as InteractivityPluginManager, container);

  manager.interactors = distances.map(maxDistance => ({
    maxDistance,
    type: InteractorType.particles,
    init: () => undefined,
  }));

  return { grid, manager };
}

describe("interactivity grid sizing", () => {
  it.each([[], [0], [-1], [NaN], [Infinity], [-Infinity]].map(distances => ({ distances })))(
    "retains valid cell size for distances $distances",
    ({ distances }) => {
      const { grid, manager } = fixture(distances);

      expect(() => {
        manager.updateMaxDistance();
      }).not.toThrow();
      grid.clear();
      expect(grid.cellSize).toBe(64);
    },
  );

  it("ignores nonfinite interactors and defers the largest valid Retina-scaled distance", () => {
    const { grid, manager } = fixture([Infinity, 20, NaN, 80, -1], 2);

    manager.updateMaxDistance();
    expect(grid.cellSize).toBe(64);
    grid.clear();
    expect(grid.cellSize).toBe(160);

    manager.interactors.length = 0;
    manager.updateMaxDistance();
    grid.clear();
    expect(grid.cellSize).toBe(160);
  });

  it.each([0, -1, NaN, Infinity, Number.MAX_VALUE])(
    "retains cell size for invalid or overflowing pixel ratio %s",
    pixelRatio => {
      const { grid, manager } = fixture([80], pixelRatio);

      expect(() => {
        manager.updateMaxDistance();
      }).not.toThrow();
      grid.clear();
      expect(grid.cellSize).toBe(64);
    },
  );
});
