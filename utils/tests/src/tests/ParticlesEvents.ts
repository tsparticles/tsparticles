/* eslint-disable */
import { EventType, type Particle, tsParticles } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { TestWindow } from "../Fixture/Window.js";

describe("ParticlesEvents", async () => {
  globalThis.window = TestWindow;

  const container = await tsParticles.load({
    id: "test-particles-events",
    options: {
      autoPlay: false,
    },
    element: createCustomCanvas(1920, 1080) as any,
  });

  if (!container) {
    throw new Error("test particles events container not initialized");
  }

  const trackParticles = (eventType: EventType): { listener: (args?: { container?: unknown; data?: unknown }) => void; particles: Particle[] } => {
    const particles: Particle[] = [],
      listener = (args?: { container?: unknown; data?: unknown }): void => {
        if (args?.container !== container) {
          return;
        }

        const particle = (args.data as { particle?: Particle } | undefined)?.particle;

        if (particle) {
          particles.push(particle);
        }
      };

    tsParticles.addEventListener(eventType, listener);

    return {
      listener,
      particles,
    };
  };

  it("should dispatch particleAdded for direct additions and grouped reset initialization", async () => {
    await container.reset({
      particles: {
        move: {
          enable: false,
        },
        number: {
          value: 0,
        },
      },
    });

    const directAddTracking = trackParticles(EventType.particleAdded);

    try {
      const particle = container.particles.addParticle({ x: 10, y: 10 });

      expect(particle).to.be.not.undefined;
      expect(directAddTracking.particles).to.eql([particle]);
    } finally {
      tsParticles.removeEventListener(EventType.particleAdded, directAddTracking.listener);
    }

    const resetTracking = trackParticles(EventType.particleAdded);

    try {
      await container.reset({
        particles: {
          groups: {
            g1: {
              number: {
                value: 2,
              },
            },
          },
          move: {
            enable: false,
          },
          number: {
            value: 2,
          },
        },
      });

      expect(resetTracking.particles).to.have.length(2);
      expect(resetTracking.particles.every(particle => particle.group === "g1")).to.be.true;
    } finally {
      tsParticles.removeEventListener(EventType.particleAdded, resetTracking.listener);
    }
  });

  it("should dispatch particleRemoved for explicit removals but not for clear", async () => {
    await container.reset({
      particles: {
        move: {
          enable: true,
        },
        number: {
          value: 0,
        },
      },
    });

    const tracking = trackParticles(EventType.particleRemoved);

    try {
      const particle1 = container.particles.addParticle({ x: 1, y: 1 }),
        particle2 = container.particles.addParticle({ x: 2, y: 2 }),
        particle3 = container.particles.addParticle({ x: 3, y: 3 });

      expect(particle1).to.be.not.undefined;
      expect(particle2).to.be.not.undefined;
      expect(particle3).to.be.not.undefined;

      if (!particle1 || !particle2 || !particle3) {
        return;
      }

      container.particles.remove(particle1);
      container.particles.removeAt(0);
      container.particles.removeQuantity(1);

      expect(tracking.particles).to.eql([particle1, particle2, particle3]);

      const removedCount = tracking.particles.length;

      container.particles.clear();

      expect(tracking.particles).to.have.length(removedCount);
    } finally {
      tsParticles.removeEventListener(EventType.particleRemoved, tracking.listener);
    }
  });

  it("should dispatch one particleAdded event per push and only matching group removals", async () => {
    await container.reset({
      particles: {
        move: {
          enable: true,
        },
        number: {
          value: 0,
        },
      },
    });

    const addedTracking = trackParticles(EventType.particleAdded);

    try {
      container.particles.push(4, { x: 100, y: 100, z: 0 });

      expect(addedTracking.particles).to.have.length(4);
    } finally {
      tsParticles.removeEventListener(EventType.particleAdded, addedTracking.listener);
    }

    await container.reset({
      particles: {
        move: {
          enable: true,
        },
        number: {
          value: 0,
        },
      },
    });

    const removalTracking = trackParticles(EventType.particleRemoved);

    try {
      container.particles.addParticle({ x: 1, y: 1 }, undefined, "g1");
      container.particles.addParticle({ x: 2, y: 2 }, undefined, "g2");
      container.particles.addParticle({ x: 3, y: 3 }, undefined, "g1");
      container.particles.addParticle({ x: 4, y: 4 }, undefined, "g2");

      container.particles.removeQuantity(2, "g1");

      expect(removalTracking.particles).to.have.length(2);
      expect(removalTracking.particles.every(particle => particle.group === "g1")).to.be.true;
    } finally {
      tsParticles.removeEventListener(EventType.particleRemoved, removalTracking.listener);
    }
  });
});
