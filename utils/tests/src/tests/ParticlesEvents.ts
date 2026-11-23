/* eslint-disable @typescript-eslint/no-magic-numbers,@typescript-eslint/no-unused-expressions,@typescript-eslint/require-await,one-var */
import {
  type Container,
  type CustomEventArgs,
  EventType,
  type IEffectDrawer,
  type IParticleUpdater,
  type IPlugin,
  type ISourceOptions,
  LimitMode,
  type Particle,
  createEngine,
} from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { loadCircleShape } from "@tsparticles/shape-circle";

const tsParticles = createEngine();

const width = 1920,
  height = 1080;

/**
 * Loads a fresh container with the given options and a deterministic canvas size.
 * Fresh containers are used so the emitted events can be attributed to a single
 * container and never leak across tests.
 * @param id - The container id
 * @param options - The options to load
 * @returns the loaded container
 */
async function loadContainer(id: string, options: ISourceOptions): Promise<Container> {
  const container = await tsParticles.load({
    id,
    options,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment
    element: createCustomCanvas(width, height) as any,
  });

  if (!container) {
    throw new Error(`Error test container ${id} not initialized`);
  }

  return container;
}

describe("ParticleEvents", async () => {
  globalThis.window = TestWindow;

  it("T19 - should dispatch particleAdded with the added particle payload", async () => {
    const fresh = await loadContainer("test-events-added", {
      detectRetina: false,
      autoPlay: false,
      particles: {
        number: {
          value: 0,
        },
      },
    });

    const added: Particle[] = [];

    const onAdded = (args?: CustomEventArgs): void => {
      if (args?.container === fresh) {
        added.push((args.data as { particle: Particle }).particle);
      }
    };

    tsParticles.addEventListener(EventType.particleAdded, onAdded);

    try {
      const particle = fresh.particles.addParticle(undefined, undefined, "g1");

      expect(particle).to.be.not.undefined;

      if (particle) {
        expect(added).to.have.length(1);
        expect(added[0]).to.equal(particle);
        expect(added[0].group).to.equal("g1");
      }

      added.length = 0;
      await fresh.reset({
        particles: {
          number: {
            value: 5,
          },
          groups: {
            g1: {
              number: {
                value: 2,
              },
            },
          },
        },
      });

      expect(added).to.have.length(5);
      expect(added.filter(t => t.group === "g1")).to.have.length(2);
      expect(added.filter(t => t.group === undefined)).to.have.length(3);
    } finally {
      tsParticles.removeEventListener(EventType.particleAdded, onAdded);
      fresh.destroy(false);
    }
  });

  it("T20 - should dispatch particleRemoved for each removal but not on clear", async () => {
    const fresh = await loadContainer("test-events-removed", {
      detectRetina: false,
      autoPlay: false,
      particles: {
        number: {
          value: 5,
        },
      },
    });

    const destroyed: Particle[] = [],
      removed: Particle[] = [];

    const onRemoved = (args?: CustomEventArgs): void => {
      if (args?.container === fresh) {
        removed.push((args.data as { particle: Particle }).particle);
      }
    };

    const onDestroyed = (args?: CustomEventArgs): void => {
      if (args?.container === fresh) {
        destroyed.push((args.data as { particle: Particle }).particle);
      }
    };

    tsParticles.addEventListener(EventType.particleRemoved, onRemoved);
    tsParticles.addEventListener(EventType.particleDestroyed, onDestroyed);

    try {
      const all = fresh.particles.filter(() => true);

      fresh.particles.remove(all[0]);
      expect(removed).to.have.length(1);
      expect(removed[0]).to.equal(all[0]);

      removed.length = 0;
      fresh.particles.removeAt(1, 2);
      expect(removed).to.have.length(2);

      removed.length = 0;
      fresh.particles.removeQuantity(1);
      expect(removed).to.have.length(1);

      removed.length = 0;
      const remaining = fresh.particles.filter(() => true);

      destroyed.length = 0;
      fresh.particles.clear();

      // clear() destroys and pools particles without dispatching removal events.
      expect(removed).to.have.length(0);
      expect(destroyed).to.eql(remaining);
      expect(remaining[0]?.destroyed).to.be.true;
      expect(fresh.particles.count).to.equal(0);
    } finally {
      tsParticles.removeEventListener(EventType.particleRemoved, onRemoved);
      tsParticles.removeEventListener(EventType.particleDestroyed, onDestroyed);
      fresh.destroy(false);
    }
  });

  it("returns an added particle when a particleAdded listener throws", async () => {
    const fresh = await loadContainer("test-events-added-error", {
      detectRetina: false,
      autoPlay: false,
      particles: { number: { value: 0 } },
    });
    const added: Particle[] = [],
      onAdded = (args?: CustomEventArgs): void => {
        if (args?.container === fresh) {
          added.push((args.data as { particle: Particle }).particle);
          throw new Error("particleAdded listener failed");
        }
      };

    tsParticles.addEventListener(EventType.particleAdded, onAdded);

    try {
      const particle = fresh.particles.addParticle();

      expect(particle).toBeDefined();
      expect(fresh.particles.count).toBe(1);
      expect(added).toEqual([particle]);

      if (particle) {
        fresh.particles.remove(particle);

        const reused = fresh.particles.addParticle();

        expect(reused).toBe(particle);
        expect(fresh.particles.count).toBe(1);
      }
    } finally {
      tsParticles.removeEventListener(EventType.particleAdded, onAdded);
      fresh.destroy(false);
    }
  });

  it("continues clearing particles when one destroy hook throws", async () => {
    const fresh = await loadContainer("test-events-clear-error", {
        detectRetina: false,
        autoPlay: false,
        particles: { number: { value: 2 } },
      }),
      particles = fresh.particles.filter(() => true),
      destroyed: Particle[] = [];

    const updater: IParticleUpdater = {
      init: () => undefined,
      isEnabled: () => false,
      particleDestroyed: particle => {
        destroyed.push(particle);

        if (particle === particles[0]) {
          throw new Error("destroy hook failed");
        }
      },
      update: () => undefined,
    };

    fresh.particleUpdaters.push(updater);

    try {
      fresh.particles.clear();

      expect(destroyed).to.eql(particles);
      expect(particles.every(particle => particle.destroyed)).to.be.true;
      expect(fresh.particles.count).to.equal(0);
    } finally {
      fresh.particleUpdaters.splice(fresh.particleUpdaters.indexOf(updater), 1);
      fresh.destroy(false);
    }
  });

  it("T21 - should fire one event per particle added or removed in a batch", async () => {
    const fresh = await loadContainer("test-events-batch", {
      detectRetina: false,
      autoPlay: false,
      particles: {
        number: {
          value: 0,
          limit: {
            mode: LimitMode.wait,
          },
        },
        groups: {
          g1: {
            number: {
              value: 0,
              limit: {
                value: 100,
                mode: LimitMode.wait,
              },
            },
          },
          g2: {
            number: {
              value: 0,
            },
          },
        },
      },
    });

    const added: Particle[] = [],
      removed: Particle[] = [];

    const onAdded = (args?: CustomEventArgs): void => {
      if (args?.container === fresh) {
        added.push((args.data as { particle: Particle }).particle);
      }
    };

    const onRemoved = (args?: CustomEventArgs): void => {
      if (args?.container === fresh) {
        removed.push((args.data as { particle: Particle }).particle);
      }
    };

    tsParticles.addEventListener(EventType.particleAdded, onAdded);
    tsParticles.addEventListener(EventType.particleRemoved, onRemoved);

    try {
      fresh.particles.push(4);

      expect(fresh.particles.count).to.equal(4);
      expect(added).to.have.length(4);

      fresh.particles.push(3, undefined, undefined, "g1");
      fresh.particles.push(2, undefined, undefined, "g2");

      expect(added).to.have.length(9);
      expect(added.filter(t => t.group === "g1")).to.have.length(3);
      expect(added.filter(t => t.group === "g2")).to.have.length(2);

      removed.length = 0;
      fresh.particles.removeQuantity(2, "g1");

      expect(removed).to.have.length(2);

      for (const particle of removed) {
        expect(particle.group).to.equal("g1");
      }
    } finally {
      tsParticles.removeEventListener(EventType.particleAdded, onAdded);
      tsParticles.removeEventListener(EventType.particleRemoved, onRemoved);
      fresh.destroy(false);
    }
  });

  it("fires destroy hooks once in updater-before-event order", async () => {
    const fresh = await loadContainer("test-events-destroy-order", {
        detectRetina: false,
        autoPlay: false,
        particles: { number: { value: 0 } },
      }),
      particle = fresh.particles.addParticle(),
      order: string[] = [];

    if (!particle) {
      throw new Error("test particle not initialized");
    }

    const updater: IParticleUpdater = {
      init: () => undefined,
      isEnabled: () => false,
      update: () => undefined,
      particleDestroyed: destroyed => {
        expect(destroyed).to.equal(particle);
        order.push("updater");
      },
    };

    const onDestroyed = (args?: CustomEventArgs): void => {
      if (args?.container === fresh && (args.data as { particle: Particle }).particle === particle) {
        order.push("event");
      }
    };

    fresh.particleUpdaters.push(updater);
    tsParticles.addEventListener(EventType.particleDestroyed, onDestroyed);

    try {
      particle.destroy();
      particle.destroy();

      expect(particle.destroyed).to.be.true;
      expect(order).to.eql(["updater", "event"]);
    } finally {
      fresh.particleUpdaters.splice(fresh.particleUpdaters.indexOf(updater), 1);
      tsParticles.removeEventListener(EventType.particleDestroyed, onDestroyed);
      fresh.destroy(false);
    }
  });

  it("finishes removal and pooling when a destroy hook throws", async () => {
    const engine = createEngine(),
      order: string[] = [],
      shapeError = new Error("shape destroy hook failed"),
      effectError = new Error("effect destroy hook failed"),
      pluginError = new Error("container plugin destroy hook failed"),
      destroyError = new Error("particle updater destroy hook failed"),
      listenerError = new Error("event listener failed"),
      plugin: IPlugin = {
        id: "test-particle-destroy-plugin-errors",
        getPlugin: async () => ({
          particleDestroyed: () => {
            order.push("container plugin");
            throw pluginError;
          },
        }),
        loadOptions: () => undefined,
        needsPlugin: () => true,
      };

    await engine.pluginManager.register(current => {
      current.pluginManager.addPlugin(plugin);
    });
    await loadCircleShape(engine);

    const fresh = await engine.load({
        id: "test-events-destroy-error",
        element: createCustomCanvas(width, height) as unknown as HTMLCanvasElement,
        options: {
          detectRetina: false,
          autoPlay: false,
          particles: { number: { value: 0 } },
        },
      }),
      particle = fresh?.particles.addParticle();

    if (!fresh || !particle) {
      throw new Error("test particle not initialized");
    }

    const shapeDrawer = particle.shape ? fresh.shapeDrawers.get(particle.shape) : undefined;

    if (!shapeDrawer) {
      throw new Error("test particle shape drawer not initialized");
    }

    const originalParticleDestroy = shapeDrawer.particleDestroy;

    shapeDrawer.particleDestroy = () => {
      order.push("shape drawer");
      throw shapeError;
    };

    fresh.effectDrawers.set("test-effect", {
      particleDestroy: () => {
        order.push("effect drawer");
        throw effectError;
      },
    } satisfies IEffectDrawer);
    particle.effect = "test-effect";

    const failingUpdater: IParticleUpdater = {
        init: () => undefined,
        isEnabled: () => false,
        update: () => undefined,
        particleDestroyed: () => {
          order.push("failing updater");
          throw destroyError;
        },
      },
      followingUpdater: IParticleUpdater = {
        init: () => undefined,
        isEnabled: () => false,
        update: () => undefined,
        particleDestroyed: () => order.push("following updater"),
      };

    const onDestroyedError = (args?: CustomEventArgs): void => {
      if (args?.container === fresh && (args.data as { particle: Particle }).particle === particle) {
        order.push("throwing destroyed listener");
        throw listenerError;
      }
    };

    const onDestroyed = (args?: CustomEventArgs): void => {
      if (args?.container === fresh && (args.data as { particle: Particle }).particle === particle) {
        order.push("destroyed event");
      }
    };

    const onRemovedError = (args?: CustomEventArgs): void => {
      if (args?.container === fresh && (args.data as { particle: Particle }).particle === particle) {
        order.push("throwing removed listener");
        throw listenerError;
      }
    };

    const onRemoved = (args?: CustomEventArgs): void => {
      if (args?.container === fresh && (args.data as { particle: Particle }).particle === particle) {
        order.push("removed event");
      }
    };

    const removeUpdater = (updater: IParticleUpdater): void => {
      const updaterIndex = fresh.particleUpdaters.indexOf(updater);

      if (updaterIndex >= 0) {
        fresh.particleUpdaters.splice(updaterIndex, 1);
      }
    };

    fresh.particleUpdaters.push(failingUpdater, followingUpdater);
    engine.addEventListener(EventType.particleDestroyed, onDestroyedError);
    engine.addEventListener(EventType.particleDestroyed, onDestroyed);
    engine.addEventListener(EventType.particleRemoved, onRemovedError);
    engine.addEventListener(EventType.particleRemoved, onRemoved);

    try {
      expect(() => {
        fresh.particles.remove(particle);
      }).to.throw(shapeError);

      expect(order).to.eql([
        "shape drawer",
        "effect drawer",
        "container plugin",
        "failing updater",
        "following updater",
        "throwing destroyed listener",
        "destroyed event",
        "throwing removed listener",
        "removed event",
      ]);
      expect(fresh.particles.count).to.equal(0);

      removeUpdater(failingUpdater);
      removeUpdater(followingUpdater);

      expect(fresh.particles.addParticle()).to.equal(particle);
    } finally {
      shapeDrawer.particleDestroy = originalParticleDestroy;
      removeUpdater(failingUpdater);
      removeUpdater(followingUpdater);
      engine.removeEventListener(EventType.particleDestroyed, onDestroyedError);
      engine.removeEventListener(EventType.particleDestroyed, onDestroyed);
      engine.removeEventListener(EventType.particleRemoved, onRemovedError);
      engine.removeEventListener(EventType.particleRemoved, onRemoved);
      fresh.destroy(false);
    }
  });

  it("T31 - should keep the limit invariant across consecutive update frames", async () => {
    const fresh = await loadContainer("test-invariant-mixed", {
      detectRetina: false,
      autoPlay: false,
      particles: {
        number: {
          value: 200,
          limit: {
            value: 100,
            mode: LimitMode.wait,
          },
          density: {
            enable: true,
            width,
            height,
          },
        },
        groups: {
          g1: {
            number: {
              value: 150,
              limit: {
                value: 50,
                mode: LimitMode.wait,
              },
            },
          },
          g2: {
            number: {
              value: 150,
              limit: {
                value: 25,
                mode: LimitMode.wait,
              },
            },
          },
        },
      },
    });

    try {
      // density factor = 1, so the effective limits equal the configured ones
      fresh.canvas.size = { width, height };
      fresh.particles.setDensity();

      const delta = { value: 16.66667, factor: 1 };

      for (let i = 0; i < 10; i++) {
        // simulate removal-then-re-add cycles between frames (e.g. out-modes, destroy)
        fresh.particles.removeAt(0, 1);
        fresh.particles.addParticle();
        fresh.particles.addParticle(undefined, undefined, "g1");
        fresh.particles.update(delta);

        expect(fresh.particles.count).to.be.at.most(100);
        expect(fresh.particles.count).to.be.greaterThan(0);
        expect(fresh.particles.filter(t => t.group === "g1")).to.have.length.at.most(50);
        expect(fresh.particles.filter(t => t.group === "g2")).to.have.length.at.most(25);
      }
    } finally {
      fresh.destroy(false);
    }
  });
});
