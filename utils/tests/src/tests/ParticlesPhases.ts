/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
  type Container,
  EventType,
  type IContainerPlugin,
  type IParticleUpdater,
  LimitMode,
  type Particle,
  createEngine,
} from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

const delta = { value: 1000 / 60, factor: 1 };

async function loadPhaseContainer(factory: (container: Container) => IContainerPlugin, count = 2): Promise<Container> {
  const engine = createEngine();

  await engine.pluginManager.register(current => {
    current.pluginManager.addPlugin({
      id: "e6-phase-contract",
      getPlugin: container => Promise.resolve(factory(container)),
      needsPlugin: () => true,
      loadOptions: () => undefined,
    });
  });

  const container = await engine.load({
    id: "e6-phase-contract",
    element: createCustomCanvas(100, 100) as unknown as HTMLCanvasElement,
    options: {
      autoPlay: false,
      detectRetina: false,
      particles: { number: { value: count } },
    },
  });

  if (!container) {
    throw new Error("Phase test container missing");
  }

  return container;
}

describe("particle update phase contracts", () => {
  globalThis.window = TestWindow;

  for (const quantity of [
    Infinity,
    -Infinity,
    NaN,
    Number.MAX_VALUE,
    Number.MAX_SAFE_INTEGER + 1,
  ]) {
    it(`does not enter the push loop for invalid quantity ${quantity}`, async () => {
      const container = await loadPhaseContainer(() => ({}), 0),
        originalAdd = container.particles.addParticle.bind(container.particles);
      let calls = 0;

      container.particles.addParticle = () => {
        calls++;
        throw new Error("Invalid count entered particle allocation");
      };
      try {
        expect(() => {
          container.particles.push(quantity);
        }).not.toThrow();
        expect(calls).toBe(0);
      } finally {
        container.particles.addParticle = originalAdd;
        container.destroy(false);
      }
    });

    it(`does not enter initialization loops for invalid target ${quantity}`, async () => {
      const container = await loadPhaseContainer(() => ({}), 0),
        originalAdd = container.particles.addParticle.bind(container.particles);
      let calls = 0;

      container.particles.addParticle = () => {
        calls++;
        throw new Error("Invalid target entered particle allocation");
      };
      try {
        container.actualOptions.particles.number.value = quantity;
        await expect(container.particles.init()).resolves.toBeUndefined();
        expect(calls).toBe(0);
      } finally {
        container.particles.addParticle = originalAdd;
        container.destroy(false);
      }
    });
  }

  it("bounds remove-all work when removal listeners keep adding particles", async () => {
    const container = await loadPhaseContainer(() => ({}));
    let removed = 0;
    const onRemoved = (): void => {
      removed++;
      if (removed > 2) {
        throw new Error("Unbounded refill traversal");
      }
      container.particles.addParticle();
    };

    container.engine.addEventListener(EventType.particleRemoved, onRemoved);
    try {
      expect(() => {
        container.particles.removeQuantity(Infinity);
      }).not.toThrow();
      expect(removed).toBe(2);
      expect(container.particles.count).toBe(2);
    } finally {
      container.engine.removeEventListener(EventType.particleRemoved, onRemoved);
      container.destroy(false);
    }
  });

  it("preserves positive fractional push/removal behavior and ignores invalid indices", async () => {
    const container = await loadPhaseContainer(() => ({}), 0);

    try {
      container.particles.push(0.2);
      container.particles.push(1.2);
      expect(container.particles.count).toBe(3);
      container.particles.removeAt(0.5, 1);
      container.particles.removeAt(NaN, 1);
      expect(container.particles.count).toBe(3);
      container.particles.removeAt(0, 0.5);
      expect(container.particles.count).toBe(2);
    } finally {
      container.destroy(false);
    }
  });

  it("does not repeat destruction when clear follows an explicit destroy", async () => {
    const destroyed: number[] = [],
      container = await loadPhaseContainer(() => ({
        particleDestroyed: particle => {
          destroyed.push(particle.id);
        },
      })),
      first = container.particles.get(0),
      second = container.particles.get(1);

    try {
      if (!first || !second) {
        throw new Error("Cleanup particles missing");
      }
      first.destroy();
      container.particles.clear();
      expect(destroyed).toEqual([first.id, second.id]);
    } finally {
      container.destroy(false);
    }
  });

  it("does not repeat destruction when an initializer destroys and rejects its particle", async () => {
    let destroyed = 0;
    const container = await loadPhaseContainer(
      () => ({
        particleDestroyed: () => {
          destroyed++;
        },
      }),
      0,
    );

    try {
      expect(
        container.particles.addParticle(undefined, undefined, undefined, particle => {
          particle.destroy();

          return false;
        }),
      ).toBeUndefined();
      expect(destroyed).toBe(1);
    } finally {
      container.destroy(false);
    }
  });

  it("cleans up collision-immune particles before explicit removal and pool reuse", async () => {
    const destroyed: number[] = [],
      container = await loadPhaseContainer(() => ({
        particleDestroyed: particle => {
          destroyed.push(particle.id);
        },
      })),
      first = container.particles.get(0);

    try {
      if (!first) {
        throw new Error("Immune particle missing");
      }
      first.unbreakable = true;
      container.particles.remove(first, first.group);
      expect(first.destroyed).toBe(true);
      expect(destroyed).toEqual([first.id]);
      expect(container.particles.addParticle()).toBe(first);
      expect(first.destroyed).toBe(false);
      expect(first.unbreakable).toBe(false);
    } finally {
      container.destroy(false);
    }
  });

  it("does not leave duplicate grid entries when an earlier particle is recycled during phase one", async () => {
    let armed = false,
      changed = false,
      replacement: Particle | undefined;
    const container = await loadPhaseContainer(current => ({
        particleUpdate: particle => {
          if (armed && !changed && particle === current.particles.get(1)) {
            changed = true;
            const first = current.particles.get(0);

            if (!first) {
              throw new Error("Grid mutation particle missing");
            }
            current.particles.remove(first, first.group);
            replacement = current.particles.addParticle({ x: 1, y: 1 });
          }
        },
      })),
      second = container.particles.get(1);

    try {
      for (const p of container.particles.filter(() => true)) {
        p.position.x = 0;
        p.position.y = 0;
      }
      armed = true;
      container.particles.update(delta);
      const neighbors = container.particles.grid.queryRectangle({ x: -1000, y: -1000 }, { width: 2000, height: 2000 });

      expect(neighbors).toEqual([second, replacement]);
      expect(new Set(neighbors).size).toBe(2);
    } finally {
      container.destroy(false);
    }
  });

  it("does not skip a bulk-removal candidate when a listener removes an earlier entry", async () => {
    const container = await loadPhaseContainer(() => ({}), 4),
      particles = container.particles.filter(() => true);
    let changed = false;
    const onRemoved = (): void => {
      if (changed) {
        return;
      }
      changed = true;
      const first = particles[0];

      container.particles.remove(first, first.group);
    };

    container.engine.addEventListener(EventType.particleRemoved, onRemoved);
    try {
      container.particles.removeAt(1, 2);
      expect(container.particles.filter(() => true)).toEqual([particles[3]]);
    } finally {
      container.engine.removeEventListener(EventType.particleRemoved, onRemoved);
      container.destroy(false);
    }
  });

  it("does not exceed delete limits when removal listeners refill the freed slot", async () => {
    const container = await loadPhaseContainer(() => ({}), 0);
    let entered = false,
      replacement: Particle | undefined;
    const onRemoved = (): void => {
      if (entered) {
        return;
      }
      entered = true;
      replacement = container.particles.addParticle();
    };

    try {
      container.actualOptions.particles.number.limit.value = 1;
      container.actualOptions.particles.number.limit.mode = LimitMode.delete;
      container.particles.setDensity();
      expect(container.particles.addParticle()).toBeDefined();
      container.engine.addEventListener(EventType.particleRemoved, onRemoved);
      expect(container.particles.addParticle()).toBeUndefined();
      expect(entered).toBe(true);
      expect(container.particles.filter(() => true)).toEqual([replacement]);
    } finally {
      container.engine.removeEventListener(EventType.particleRemoved, onRemoved);
      container.destroy(false);
    }
  });

  it("reuses the uncommitted ID after a non-reentrant rejection", async () => {
    const container = await loadPhaseContainer(() => ({}), 0);

    try {
      expect(container.particles.addParticle(undefined, undefined, undefined, () => false)).toBeUndefined();
      expect(container.particles.addParticle()?.id).toBe(0);
    } finally {
      container.destroy(false);
    }
  });

  it("keeps insertion cells until the next update while query geometry stays live", async () => {
    let move = false;
    const container = await loadPhaseContainer(current => ({
        postUpdate: () => {
          const particle = current.particles.get(1);

          if (move && particle) {
            particle.position.x = current.particles.grid.cellSize * 3;
            move = false;
          }
        },
      })),
      particles = container.particles.filter(() => true),
      moved = particles[1],
      destination = { x: container.particles.grid.cellSize * 3, y: 0 };

    for (const particle of particles) {
      particle.position.x = particle.id;
      particle.position.y = 0;
    }
    try {
      move = true;
      container.particles.update(delta);
      expect(container.particles.grid.queryCircle(destination, 1)).not.toContain(moved);
      expect(container.particles.grid.queryCircle({ x: 0, y: 0 }, destination.x + 1)).toContain(moved);
      container.particles.update(delta);
      expect(container.particles.grid.queryCircle(destination, 1)).toEqual([moved]);
    } finally {
      container.destroy(false);
    }
  });

  it("draws the next particle after the current draw callback removes itself", async () => {
    const container = await loadPhaseContainer(() => ({}), 3),
      particles = container.particles.filter(() => true),
      drawn: number[] = [];

    for (const particle of particles) {
      particle.draw = () => {
        drawn.push(particle.id);
        if (particle === particles[0]) {
          container.particles.remove(particle);
        }
      };
    }
    try {
      container.particles.drawParticles(delta);
      expect(drawn).toEqual([0, 1, 2]);
    } finally {
      container.destroy(false);
    }
  });

  it("defers particles added during drawing until the next draw", async () => {
    const container = await loadPhaseContainer(() => ({})),
      drawn: number[] = [];
    let added = false;

    for (const particle of container.particles.filter(() => true)) {
      particle.draw = () => {
        drawn.push(particle.id);
        if (!added) {
          added = true;
          const next = container.particles.addParticle();

          if (next) {
            next.draw = () => {
              drawn.push(next.id);
            };
          }
        }
      };
    }
    try {
      container.particles.drawParticles(delta);
      expect(drawn).toEqual([0, 1]);
      drawn.length = 0;
      container.particles.drawParticles(delta);
      expect(drawn).toEqual([0, 1, 2]);
    } finally {
      container.destroy(false);
    }
  });

  it("does not draw a recycled replacement in the old draw snapshot", async () => {
    const container = await loadPhaseContainer(() => ({}), 3),
      particles = container.particles.filter(() => true),
      drawn: number[] = [],
      removed = particles[1];

    for (const particle of particles) {
      particle.draw = () => {
        drawn.push(particle.id);
        if (particle === particles[0]) {
          container.particles.remove(removed);
          const replacement = container.particles.addParticle();

          if (replacement) {
            replacement.draw = () => {
              drawn.push(replacement.id);
            };
          }
        }
      };
    }
    try {
      container.particles.drawParticles(delta);
      expect(drawn).toEqual([0, 2]);
    } finally {
      container.destroy(false);
    }
  });

  it("stops drawing the retired collection after clear and repopulation", async () => {
    const container = await loadPhaseContainer(() => ({}), 3),
      drawn: number[] = [];
    let cleared = false;

    for (const particle of container.particles.filter(() => true)) {
      particle.draw = () => {
        drawn.push(particle.id);
        if (!cleared) {
          cleared = true;
          container.particles.clear();
          container.particles.push(2);
          for (const replacement of container.particles.filter(() => true)) {
            replacement.draw = () => {
              drawn.push(replacement.id);
            };
          }
        }
      };
    }
    try {
      container.particles.drawParticles(delta);
      expect(drawn).toEqual([0]);
      drawn.length = 0;
      container.particles.drawParticles(delta);
      expect(drawn).toEqual([3, 4]);
    } finally {
      container.destroy(false);
    }
  });

  it("keeps the draw-start order when a draw callback migrates buckets", async () => {
    const container = await loadPhaseContainer(() => ({}), 3),
      particles = container.particles.filter(() => true),
      first = particles[0],
      second = particles[1],
      drawn: number[] = [];

    for (const particle of particles) {
      particle.position.z = particle === second ? 0 : 99;
      particle.draw = () => {
        drawn.push(particle.id);
        if (particle === first) {
          first.position.z = 0;
          second.position.z = 99;
          container.particles.update(delta);
        }
      };
    }
    container.particles.update(delta);
    try {
      container.particles.drawParticles(delta);
      expect(drawn).toEqual([0, 2, 1]);
    } finally {
      container.destroy(false);
    }
  });

  it("isolates nested draw snapshots and releases them after an exception", async () => {
    const container = await loadPhaseContainer(() => ({})),
      particles = container.particles.filter(() => true),
      drawn: string[] = [],
      failure = new Error("nested draw failure");
    let nested = false,
      fail = true;

    for (const particle of particles) {
      particle.draw = () => {
        drawn.push(`${nested ? "nested" : "outer"}:${particle.id}`);
        if (particle === particles[0] && !nested && fail) {
          nested = true;
          try {
            expect(() => {
              container.particles.drawParticles(delta);
            }).toThrow(failure);
          } finally {
            nested = false;
          }
        } else if (nested && fail) {
          fail = false;
          throw failure;
        }
      };
    }
    try {
      container.particles.drawParticles(delta);
      expect(drawn).toEqual(["outer:0", "nested:0", "outer:1"]);
      drawn.length = 0;
      container.particles.drawParticles(delta);
      expect(drawn).toEqual(["outer:0", "outer:1"]);
    } finally {
      container.destroy(false);
    }
  });

  it("preserves sorted draw order under repeated skewed depth changes", async () => {
    const container = await loadPhaseContainer(() => ({}), 100),
      particles = container.particles.filter(() => true),
      drawn: number[] = [];

    for (const particle of particles) {
      particle.draw = () => {
        drawn.push(particle.id);
      };
    }
    try {
      for (let frame = 0; frame < 6; frame++) {
        for (const particle of particles) {
          particle.position.z = particle.id < 50 && frame % 2 ? 0 : 99;
        }
        container.particles.update(delta);
        drawn.length = 0;
        container.particles.drawParticles(delta);
        expect(drawn).toEqual(particles.toSorted((a, b) => b.position.z - a.position.z || a.id - b.id).map(p => p.id));
      }
    } finally {
      container.destroy(false);
    }
  });

  it("reserves distinct IDs before a reentrant particle initializer commits", async () => {
    const container = await loadPhaseContainer(() => ({}), 0);
    let child: Particle | undefined;

    try {
      const parent = container.particles.addParticle(undefined, undefined, undefined, () => {
        child = container.particles.addParticle();

        return true;
      });

      expect(parent).toBeDefined();
      expect(child).toBeDefined();
      expect(parent?.id).not.toBe(child?.id);
      expect(container.particles.count).toBe(2);
      const drawn: number[] = [];

      if (parent) {
        parent.draw = () => {
          drawn.push(parent.id);
        };
      }
      if (child) {
        child.draw = () => {
          if (child) {
            drawn.push(child.id);
          }
        };
      }
      container.particles.drawParticles(delta);
      expect(drawn).toEqual([parent?.id, child?.id]);
    } finally {
      container.destroy(false);
    }
  });

  it("keeps committed child IDs when the enclosing initializer is rejected", async () => {
    const container = await loadPhaseContainer(() => ({}), 0);
    let child: Particle | undefined;

    try {
      expect(
        container.particles.addParticle(undefined, undefined, undefined, () => {
          child = container.particles.addParticle();

          return false;
        }),
      ).toBeUndefined();
      const next = container.particles.addParticle();

      expect(next).toBeDefined();
      expect(child).toBeDefined();
      expect(next?.id).toBeGreaterThan(child?.id ?? -1);
      expect(container.particles.count).toBe(2);
    } finally {
      container.destroy(false);
    }
  });

  it("rechecks wait limits after an initializer adds another particle", async () => {
    const container = await loadPhaseContainer(() => ({}), 0);
    let child: Particle | undefined;

    try {
      container.actualOptions.particles.number.limit.value = 1;
      container.actualOptions.particles.number.limit.mode = LimitMode.wait;
      container.particles.setDensity();
      const parent = container.particles.addParticle(undefined, undefined, undefined, () => {
        child = container.particles.addParticle();

        return true;
      });

      expect(parent).toBeUndefined();
      expect(container.particles.filter(() => true)).toEqual([child]);
    } finally {
      container.destroy(false);
    }
  });

  for (const phase of ["move", "updater"] as const) {
    it(`stops the old collection when a ${phase} callback clears and repopulates it`, async () => {
      let callback = (_particle: Particle): void => undefined;
      const container = await loadPhaseContainer(() => ({
          particleUpdate: particle => {
            if (phase === "move") {
              callback(particle);
            }
          },
        })),
        first = container.particles.get(0),
        visited: number[] = [];

      if (!first) {
        throw new Error("Clear test particle missing");
      }
      const firstId = first.id;
      let cleared = false,
        replacement: Particle | undefined;

      callback = particle => {
        visited.push(particle.id);
        if (!cleared) {
          cleared = true;
          container.particles.clear();
          replacement = container.particles.addParticle();
        }
      };
      if (phase === "updater") {
        container.particleUpdaters.push({
          init: () => undefined,
          isEnabled: () => true,
          update: particle => {
            callback(particle);
          },
        });
      }
      try {
        container.particles.update(delta);
        expect(visited).toEqual([firstId]);
        expect(container.particles.filter(() => true)).toEqual([replacement]);
        visited.length = 0;
        container.particles.update(delta);
        expect(visited).toEqual([replacement?.id]);
      } finally {
        container.destroy(false);
      }
    });

    it(`does not skip the next particle after current removal and reuse during ${phase}`, async () => {
      let callback = (_particle: Particle): void => undefined;
      const container = await loadPhaseContainer(() => ({
          particleUpdate: particle => {
            if (phase === "move") {
              callback(particle);
            }
          },
        })),
        visited: number[] = [],
        first = container.particles.get(0),
        second = container.particles.get(1);

      if (!first || !second) {
        throw new Error("Mutation particles missing");
      }

      const firstId = first.id,
        secondId = second.id;
      let replacement: Particle | undefined,
        changed = false;

      callback = particle => {
        visited.push(particle.id);
        if (!changed && particle === first) {
          changed = true;
          container.particles.remove(first, first.group);
          replacement = container.particles.addParticle();
        }
      };
      if (phase === "updater") {
        container.particleUpdaters.push({
          init: () => undefined,
          isEnabled: () => true,
          update: particle => {
            callback(particle);
          },
        });
      }

      try {
        container.particles.update(delta);
        expect(replacement).toBeDefined();
        expect(visited).toEqual([firstId, secondId, replacement?.id]);
        expect(container.particles.count).toBe(2);
      } finally {
        container.destroy(false);
      }
    });

    it(`does not skip survivors when a ${phase} hook removes both earlier and current entries`, async () => {
      let callback = (_particle: Particle): void => undefined;
      const container = await loadPhaseContainer(
          () => ({
            particleUpdate: particle => {
              if (phase === "move") {
                callback(particle);
              }
            },
          }),
          3,
        ),
        particles = container.particles.filter(() => true),
        visited: number[] = [];

      callback = particle => {
        visited.push(particle.id);
        if (particle === particles[1]) {
          for (const removed of particles.slice(0, 2)) {
            container.particles.remove(removed, removed.group);
          }
        }
      };
      if (phase === "updater") {
        container.particleUpdaters.push({
          init: () => undefined,
          isEnabled: () => true,
          update: particle => {
            callback(particle);
          },
        });
      }

      try {
        container.particles.update(delta);
        expect(visited).toEqual(particles.map(particle => particle.id));
        expect(container.particles.filter(() => true)).toEqual([particles[2]]);
      } finally {
        container.destroy(false);
      }
    });
  }

  it("does not run move hooks for an identity removed by a reset hook", async () => {
    let armed = false,
      changed = false,
      replacement: Particle | undefined;
    const visited: number[] = [],
      container = await loadPhaseContainer(current => ({
        particleReset: particle => {
          if (armed && !changed) {
            changed = true;
            current.particles.remove(particle, particle.group);
            replacement = current.particles.addParticle();
          }
        },
        particleUpdate: particle => {
          if (armed) {
            visited.push(particle.id);
          }
        },
      })),
      secondId = container.particles.get(1)?.id;

    try {
      armed = true;
      container.particles.update(delta);
      expect(visited).toEqual([secondId, replacement?.id]);
    } finally {
      container.destroy(false);
    }
  });

  it("keeps a queued identity recycled by an earlier particleRemoved listener", async () => {
    let armed = false,
      entered = false,
      replacement: Particle | undefined;
    const container = await loadPhaseContainer(() => ({
        particleUpdate: particle => {
          if (armed) {
            particle.destroy();
          }
        },
      })),
      second = container.particles.get(1),
      onRemoved = (): void => {
        if (entered || !second) {
          return;
        }
        entered = true;
        container.particles.remove(second, second.group);
        replacement = container.particles.addParticle();
      };

    container.engine.addEventListener(EventType.particleRemoved, onRemoved);
    try {
      armed = true;
      container.particles.update(delta);
      expect(entered).toBe(true);
      expect(replacement).toBe(second);
      expect(container.particles.filter(() => true)).toEqual([replacement]);
      expect(replacement?.destroyed).toBe(false);
    } finally {
      container.engine.removeEventListener(EventType.particleRemoved, onRemoved);
      container.destroy(false);
    }
  });

  it("does not remove a recycled identity queued for deferred removal before postUpdate", async () => {
    let armed = false,
      replacement: Particle | undefined;
    const container = await loadPhaseContainer(current => ({
      particleUpdate: particle => {
        if (armed && particle === current.particles.get(0)) {
          particle.destroy();
        }
      },
      postUpdate: () => {
        if (!armed) {
          return;
        }
        const first = current.particles.get(0);

        if (!first) {
          throw new Error("Deferred particle missing");
        }
        current.particles.remove(first, first.group);
        replacement = current.particles.addParticle();
      },
    }));

    try {
      armed = true;
      container.particles.update(delta);
      expect(replacement).toBeDefined();
      expect(container.particles.count).toBe(2);
      expect(container.particles.filter(() => true)).toContain(replacement);
      expect(replacement?.destroyed).toBe(false);
    } finally {
      container.destroy(false);
    }
  });

  it("keeps ID order at equal depth after bucket migration, removal and pool reuse", async () => {
    const container = await loadPhaseContainer(() => ({})),
      first = container.particles.get(0),
      second = container.particles.get(1),
      order: number[] = [];

    if (!first || !second) {
      container.destroy(false);
      throw new Error("Bucket test particles missing");
    }

    first.draw = () => {
      order.push(first.id);
    };
    second.draw = () => {
      order.push(second.id);
    };

    try {
      first.position.z = 0;
      second.position.z = 1;
      container.particles.update(delta);
      container.particles.drawParticles(delta);
      expect(order).toEqual([second.id, first.id]);

      order.length = 0;
      first.position.z = 1;
      container.particles.update(delta);
      container.particles.drawParticles(delta);
      expect(order).toEqual([first.id, second.id]);

      container.particles.remove(first, first.group);

      const reused = container.particles.addParticle();

      expect(reused).toBe(first);
      expect(reused?.id).toBeGreaterThan(second.id);
      first.position.z = 1;
      order.length = 0;
      container.particles.update(delta);
      container.particles.drawParticles(delta);
      expect(order).toEqual([second.id, first.id]);
    } finally {
      container.destroy(false);
    }
  });

  it("keeps reset/move, postUpdate, updater and interaction phases in order", async () => {
    const order: string[] = [],
      container = await loadPhaseContainer(() => ({
        update: () => order.push("update"),
        particleReset: particle => order.push(`reset:${particle.id}`),
        particleUpdate: particle => order.push(`move:${particle.id}`),
        postUpdate: () => order.push("postUpdate"),
        postParticleUpdate: particle => order.push(`interact:${particle.id}`),
      })),
      updater: IParticleUpdater = {
        init: () => undefined,
        isEnabled: () => true,
        update: particle => {
          order.push(`updater:${particle.id}`);
        },
      };

    container.particleUpdaters.push(updater);
    order.length = 0;

    try {
      const ids = container.particles.filter(() => true).map(p => p.id);

      container.particles.update(delta);
      expect(order).toEqual([
        "update",
        ...ids.flatMap(id => [`reset:${id}`, `move:${id}`]),
        "postUpdate",
        ...ids.flatMap(id => [`updater:${id}`, `interact:${id}`]),
      ]);
    } finally {
      container.destroy(false);
    }
  });

  it("removes phase-one destruction once after phase two and omits it from the grid", async () => {
    const order: string[] = [];
    let armed = false;
    const container = await loadPhaseContainer(current => ({
      particleUpdate: particle => {
        if (armed && particle === current.particles.get(0)) {
          particle.destroy();
        }
      },
      postUpdate: () => {
        if (!armed) {
          return;
        }

        order.push(`postUpdate:${current.particles.count}`);
        expect(
          current.particles.grid.queryRectangle({ x: -1000, y: -1000 }, { width: 2000, height: 2000 }),
        ).toHaveLength(1);
      },
      postParticleUpdate: particle => order.push(`interact:${particle.id}`),
      particleDestroyed: particle => order.push(`destroy:${particle.id}`),
    }));

    try {
      const first = container.particles.get(0),
        second = container.particles.get(1);

      expect(first).toBeDefined();
      expect(second).toBeDefined();
      armed = true;
      order.length = 0;
      container.particles.update(delta);

      expect(order).toEqual([
        `destroy:${first?.id}`,
        "postUpdate:2",
        `interact:${second?.id}`,
      ]);
      expect(container.particles.count).toBe(1);
      expect(container.particles.get(0)).toBe(second);
    } finally {
      container.destroy(false);
    }
  });

  it("recovers deferred removal after an update hook throws", async () => {
    const failure = new Error("phase failure");
    let armed = false,
      fail = true;
    const container = await loadPhaseContainer(current => ({
      particleUpdate: particle => {
        if (!armed) {
          return;
        }
        if (particle === current.particles.get(0)) {
          particle.destroy();
        } else if (fail) {
          throw failure;
        }
      },
    }));

    try {
      armed = true;
      expect(() => {
        container.particles.update(delta);
      }).toThrow(failure);
      expect(container.particles.count).toBe(2);
      fail = false;
      container.particles.update(delta);
      expect(container.particles.count).toBe(1);
      expect(container.particles.get(0)?.destroyed).toBe(false);
      container.particles.update(delta);
      expect(container.particles.count).toBe(0);
    } finally {
      container.destroy(false);
    }
  });

  it("preserves outer removals when a removal listener reenters update and throws", async () => {
    const failure = new Error("nested update failure");
    let armed = false,
      reentered = false,
      nested = false,
      removed = 0;
    const container = await loadPhaseContainer(() => ({
        update: () => {
          if (nested) {
            throw failure;
          }
        },
        particleUpdate: particle => {
          if (armed) {
            particle.destroy();
          }
        },
      })),
      onRemoved = (): void => {
        removed++;

        if (reentered) {
          return;
        }
        reentered = true;
        nested = true;

        try {
          expect(() => {
            container.particles.update(delta);
          }).toThrow(failure);
        } finally {
          nested = false;
        }
      };

    container.engine.addEventListener(EventType.particleRemoved, onRemoved);

    try {
      armed = true;
      container.particles.update(delta);
      expect(reentered).toBe(true);
      expect(removed).toBe(2);
      expect(container.particles.count).toBe(0);
      container.particles.update(delta);
    } finally {
      container.engine.removeEventListener(EventType.particleRemoved, onRemoved);
      container.destroy(false);
    }
  });
});
