/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { Container, Particle } from "@tsparticles/engine";
import { describe, expect, it, vi } from "vitest";
import { ExternalInteractorBase } from "../../../../plugins/interactivity/src/BaseClasses/ExternalInteractorBase.js";
import { InteractionManager } from "../../../../plugins/interactivity/src/InteractionManager.js";
import type { InteractivityPluginManager } from "../../../../plugins/interactivity/src/InteractivityPluginManagerTypes.js";
import { InteractorType } from "../../../../plugins/interactivity/src/Enums/InteractorType.js";
import { SpatialHashGrid } from "../../../../engine/src/Core/Particles/SpatialHashGrid.js";

function fixture(distances: number[], pixelRatio = 1): { grid: SpatialHashGrid; manager: InteractionManager } {
  const grid = new SpatialHashGrid(64),
    container = {
      particles: { grid },
      plugins: [],
      retina: { pixelRatio },
    } as unknown as Container,
    manager = new InteractionManager({} as InteractivityPluginManager, container);

  manager.interactors = distances.map(maxDistance => ({
    maxDistance,
    type: InteractorType.particles,
    init: () => undefined,
  }));

  return { grid, manager };
}

describe("interactivity grid sizing", () => {
  it("skips stateless hooks and checks live enablement for custom resets", () => {
    const { manager } = fixture([]),
      particle = {} as Particle,
      delta = { value: 16, factor: 1 },
      stateless = {
        type: InteractorType.external,
        maxDistance: 0,
        init: vi.fn(),
        // eslint-disable-next-line @typescript-eslint/unbound-method -- the default hook has no receiver state
        clear: ExternalInteractorBase.prototype.clear,
        isEnabled: vi.fn(() => true),
        // eslint-disable-next-line @typescript-eslint/unbound-method -- the default hook has no receiver state
        reset: ExternalInteractorBase.prototype.reset,
      },
      reset = vi.fn(),
      stateful = {
        ...stateless,
        init() {
          this.reset = reset;
        },
        clear: vi.fn(),
        isEnabled: vi.fn(() => false),
      };

    manager.interactors = [stateless, stateful];
    manager.init();
    manager.reset(particle);
    expect(stateless.init).toHaveBeenCalledOnce();
    expect(stateless.isEnabled).not.toHaveBeenCalled();
    expect(reset).not.toHaveBeenCalled();
    manager.particlesInteract(particle, delta);
    expect(stateful.clear).toHaveBeenCalledExactlyOnceWith(particle, delta);

    stateful.isEnabled.mockReturnValue(true);
    manager.reset(particle);
    expect(reset).toHaveBeenCalledExactlyOnceWith(manager.interactivityData, particle);
  });

  it.each(
    [[], [0], [-1], [NaN], [Infinity], [-Infinity]].map(distances => ({
      distances,
    })),
  )("retains valid cell size for distances $distances", ({ distances }) => {
    const { grid, manager } = fixture(distances);

    expect(() => {
      manager.updateMaxDistance();
    }).not.toThrow();
    grid.clear();
    expect(grid.cellSize).toBe(64);
  });

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
