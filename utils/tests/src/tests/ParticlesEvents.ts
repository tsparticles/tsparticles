/* eslint-disable */
import {
  type Container,
  type CustomEventArgs,
  type ISourceOptions,
  type Particle,
  EventType,
  LimitMode,
  tsParticles,
} from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    const removed: Particle[] = [];

    const onRemoved = (args?: CustomEventArgs): void => {
      if (args?.container === fresh) {
        removed.push((args.data as { particle: Particle }).particle);
      }
    };

    tsParticles.addEventListener(EventType.particleRemoved, onRemoved);

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
      fresh.particles.clear();

      // clear() reassigns the internal array without dispatching removal events
      expect(removed).to.have.length(0);
      expect(fresh.particles.count).to.equal(0);
    } finally {
      tsParticles.removeEventListener(EventType.particleRemoved, onRemoved);
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
