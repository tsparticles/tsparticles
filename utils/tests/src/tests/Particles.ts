/* eslint-disable */
import {
  type ICoordinates3d,
  type Container,
  type ISourceOptions,
  type Particle,
  LimitMode,
  getLogger,
  getRandom,
  tsParticles,
} from "@tsparticles/engine";
import { beforeEach, describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

/**
 * Loads a fresh container with the given options and a deterministic canvas size.
 * Fresh containers are required by the limit-invariant tests: `#limit`/`#groupLimits`
 * are computed when the container initializes, so a warmed (reset) container would
 * not reproduce the first-load ordering the invariant tests lock.
 * @param id - The container id
 * @param options - The options to load
 * @returns the loaded container
 */
async function loadContainer(id: string, options: ISourceOptions): Promise<Container> {
  const container = await tsParticles.load({
    id,
    options,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    element: createCustomCanvas(1920, 1080) as any,
  });

  if (!container) {
    throw new Error(`Error test container ${id} not initialized`);
  }

  return container;
}

describe("Particles", async () => {
  globalThis.window = TestWindow;

  const container = await tsParticles.load({
    id: "test-particles",
    options: {
      autoPlay: false,
    },

    element: createCustomCanvas(1920, 1080) as any,
  });

  if (!container) {
    throw new Error(`Error test container not initialized`);
  }

  // Common options used when initializing Particles with a set number of particles
  const numParticles = 5,
    numParticlesOptions = {
      particles: {
        number: {
          value: numParticles,
        },
      },
    };
  // This is to keep the `removeQuantity` method from executing `container.play`
  // which is not playing well in Node.
  const enableParticleMoveOptions = {
    particles: {
      number: numParticlesOptions.particles.number,
      move: {
        enable: true,
      },
    },
  };

  const enableParticleEmptyMoveOptions = {
    particles: {
      number: { value: 0 },
      move: {
        enable: true,
      },
    },
  };

  it("should create the number of particles configured in container", async () => {
    await container.reset(numParticlesOptions);

    expect(container.particles.count).to.equal(numParticles);
  });

  it("should add particles to array of particles", async () => {
    const particlesCount = 0;

    await container.reset({
      particles: {
        number: {
          value: particlesCount,
        },
      },
    });

    expect(container.particles.count).to.equal(particlesCount);

    const particle1 = container.particles.addParticle({ x: 1, y: 1 });

    expect(container.particles.count).to.equal(1);
    expect(container.particles.find(t => t === particle1)).to.be.not.undefined;

    const particle2 = container.particles.addParticle({ x: 2, y: 2 });

    expect(container.particles.count).to.equal(2);
    expect(container.particles.filter(t => t === particle1 || t === particle2).length).to.equal(2);

    const particle3 = container.particles.addParticle({ x: 3, y: 3 });

    expect(container.particles.count).to.equal(3);
    expect(container.particles.filter(t => t === particle1 || t === particle2 || t === particle3).length).to.equal(3);
  });

  it("should remove particles at specified indices", async () => {
    await container.reset(numParticlesOptions);

    let arr = container.particles.filter(() => true);

    const particle1 = arr[0],
      particle3 = arr[2],
      particle4 = arr[3],
      particle5 = arr[4];

    container.particles.removeAt(1);

    arr = container.particles.filter(() => true);

    expect(arr).to.eql([particle1, particle3, particle4, particle5]);
    expect(arr).to.not.eql([particle5, particle4, particle3, particle1]);

    container.particles.removeAt(2);

    arr = container.particles.filter(() => true);

    expect(arr).to.eql([particle1, particle3, particle5]);
    expect(arr).to.not.eql([particle5, particle3, particle1]);
  });

  it("should remove specified quantity of indices, starting at the specified index", async () => {
    await container.reset(numParticlesOptions);

    let arr = container.particles.filter(() => true);

    const particle1 = arr[0],
      particle4 = arr[3],
      particle5 = arr[4];

    container.particles.removeAt(1, 2);

    arr = container.particles.filter(() => true);

    expect(arr).to.eql([particle1, particle4, particle5]);
    expect(arr).to.not.eql([particle5, particle4, particle1]);

    container.particles.removeAt(0, 2);

    arr = container.particles.filter(() => true);

    expect(arr).to.eql([particle5]);
  });

  it("should remove specified number of particles", async () => {
    await container.reset(enableParticleMoveOptions);

    expect(container.particles.count).to.equal(numParticles);

    container.particles.removeQuantity(3);

    expect(container.particles.count).to.equal(numParticles - 3);

    container.particles.removeQuantity(2);

    expect(container.particles.count).to.equal(numParticles - 5);
  });

  it("should remove specified particle", async () => {
    await container.reset(numParticlesOptions);

    let arr = container.particles.filter(() => true);

    const particle1 = arr[0],
      particle2 = arr[1],
      particle3 = arr[2],
      particle4 = arr[3],
      particle5 = arr[4];

    container.particles.remove(particle4);

    arr = container.particles.filter(() => true);

    expect(arr).to.eql([particle1, particle2, particle3, particle5]);
    expect(arr).to.not.eql([particle5, particle3, particle2, particle1]);

    container.particles.remove(particle1);

    arr = container.particles.filter(() => true);

    expect(arr).to.eql([particle2, particle3, particle5]);
    expect(arr).to.not.eql([particle5, particle3, particle2]);
  });

  it("should remove all particles when calling clear", async () => {
    await container.reset(numParticlesOptions);

    expect(container.particles.count).to.equal(numParticles);

    container.particles.clear();

    expect(container.particles.count).to.equal(0);
  });

  it("should push multiple particles at the specified position", async () => {
    await container.reset(enableParticleEmptyMoveOptions);

    const position: ICoordinates3d = { x: 100, y: 100, z: 0 };

    container.particles.push(numParticles, position);

    expect(container.particles.count).to.equal(numParticles);

    const arr = container.particles.filter(() => true);

    for (const particle of arr) {
      expect(particle.position.x).to.be.equal(position.x);
      expect(particle.position.y).to.be.equal(position.y);
    }
  });

  it("should move particles", async () => {
    await container.reset(enableParticleEmptyMoveOptions);

    const position: ICoordinates3d = { x: 100, y: 100, z: 0 };

    container.particles.push(numParticles, position);

    expect(container.particles.count).to.equal(5);

    const arr = container.particles.filter(() => true);

    let ts = getRandom() * 16.66667;

    const logP = arr[0];

    getLogger().log(logP.id);

    container.particles.update({
      value: ts,
      factor: (60 * ts) / 1000,
    });

    ts = getRandom() * 16.66667;

    container.particles.update({
      value: ts,
      factor: (60 * ts) / 1000,
    });

    ts = getRandom() * 16.66667;

    container.particles.update({
      value: ts,
      factor: (60 * ts) / 1000,
    });

    ts = getRandom() * 16.66667;

    container.particles.update({
      value: ts,
      factor: (60 * ts) / 1000,
    });

    ts = getRandom() * 16.66667;

    container.particles.update({
      value: ts,
      factor: (60 * ts) / 1000,
    });
  });

  describe("limits, out-of-range removals, pooling, initializer and clear semantics", () => {
    beforeEach(async () => {
      await container.reset();
    });

    it("T1 - should refuse new particles when limit mode is wait", async () => {
      await container.reset({
        particles: {
          number: {
            value: 5,
            limit: {
              value: 5,
              mode: LimitMode.wait,
            },
          },
        },
      });

      expect(container.particles.count).to.equal(5);

      const particle = container.particles.addParticle();

      expect(particle).to.be.undefined;
      expect(container.particles.count).to.equal(5);
    });

    it("T2 - should remove older particles when adding over the limit (LimitMode.delete)", async () => {
      await container.reset({
        particles: {
          number: {
            value: 2,
            limit: {
              value: 3,
              mode: LimitMode.delete,
            },
          },
        },
      });

      expect(container.particles.count).to.equal(2);

      const original = container.particles.filter(() => true),
        originalIds = original.map(t => t.id),
        added1 = container.particles.addParticle();

      expect(added1).to.be.not.undefined;
      expect(container.particles.count).to.equal(3);
      expect(container.particles.filter(() => true)).to.include(added1);

      const added2 = container.particles.addParticle();

      expect(added2).to.be.not.undefined;
      expect(container.particles.count).to.equal(3);

      const arr = container.particles.filter(() => true),
        ids = arr.map(t => t.id);

      expect(ids).to.include((added1 as Particle).id);
      expect(ids).to.include((added2 as Particle).id);
      expect(ids).to.include(originalIds[1]);
      expect(ids).to.not.include(originalIds[0]);
    });

    it("T3 - should not throw nor remove particles for out-of-range removeAt indices", async () => {
      await container.reset(numParticlesOptions);

      expect(container.particles.count).to.equal(numParticles);

      const before = container.particles.filter(() => true);

      container.particles.removeAt(-1);
      container.particles.removeAt(numParticles);
      container.particles.removeAt(numParticles + 1);

      expect(container.particles.count).to.equal(numParticles);
      expect(container.particles.filter(() => true)).to.eql(before);
    });

    it("T4 - should remove all remaining particles when removeQuantity exceeds the count", async () => {
      await container.reset(enableParticleEmptyMoveOptions);

      container.particles.push(numParticles);

      expect(container.particles.count).to.equal(numParticles);

      container.particles.removeQuantity(numParticles * 2);

      expect(container.particles.count).to.equal(0);
    });

    it("T5 - should reuse pooled particles across add/remove/add cycles", async () => {
      await container.reset(enableParticleEmptyMoveOptions);

      const particle1 = container.particles.addParticle(),
        particle2 = container.particles.addParticle();

      expect(particle1).to.be.not.undefined;
      expect(particle2).to.be.not.undefined;

      if (!particle1 || !particle2) {
        throw new Error("test particles not created");
      }

      const id1 = particle1.id,
        id2 = particle2.id;

      container.particles.remove(particle1);
      container.particles.remove(particle2);

      expect(container.particles.count).to.equal(0);

      const reused = container.particles.addParticle();

      expect(container.particles.count).to.equal(1);
      expect(reused).to.be.not.undefined;

      if (reused) {
        expect(reused.destroyed).to.be.false;
        expect(reused.id).to.be.not.equal(id1);
        expect(reused.id).to.be.not.equal(id2);
        expect(container.particles.find(t => t === reused)).to.be.not.undefined;
      }
    });

    it("T6 - should reject particles when the initializer returns false and return them to the pool", async () => {
      await container.reset(enableParticleEmptyMoveOptions);

      const rejected = container.particles.addParticle(undefined, undefined, undefined, () => false);

      expect(rejected).to.be.undefined;
      expect(container.particles.count).to.equal(0);

      const accepted = container.particles.addParticle(undefined, undefined, undefined, () => true);

      expect(accepted).to.be.not.undefined;
      expect(container.particles.count).to.equal(1);
      expect(container.particles.filter(() => true)[0]).to.equal(accepted);
    });

    it("T7 - should leave the pool intact when clearing so addParticle still works", async () => {
      await container.reset(enableParticleEmptyMoveOptions);

      container.particles.addParticle();
      container.particles.addParticle();

      expect(container.particles.count).to.equal(2);

      container.particles.removeQuantity(1);

      expect(container.particles.count).to.equal(1);

      container.particles.clear();

      expect(container.particles.count).to.equal(0);

      const particle = container.particles.addParticle();

      expect(particle).to.be.not.undefined;
      expect(container.particles.count).to.equal(1);
    });
  });

  describe("limit invariant on every addition path", () => {
    it("T23 - should enforce the limit on initial load with value > limit (wait mode)", async () => {
      const fresh = await loadContainer("test-limit-wait", {
        autoPlay: false,
        particles: {
          number: {
            value: 200,
            limit: {
              value: 100,
              mode: LimitMode.wait,
            },
          },
        },
      });

      expect(fresh.particles.count).to.be.at.most(100);

      fresh.particles.update({
        value: 16.66667,
        factor: (60 * 16.66667) / 1000,
      });

      expect(fresh.particles.count).to.be.at.most(100);

      fresh.destroy(false);
    });

    it("T23b - should create exactly the limit when value equals the limit", async () => {
      const fresh = await loadContainer("test-limit-equal", {
        autoPlay: false,
        particles: {
          number: {
            value: 100,
            limit: {
              value: 100,
              mode: LimitMode.wait,
            },
          },
        },
      });

      expect(fresh.particles.count).to.equal(100);

      fresh.destroy(false);
    });

    it("T24 - should trim the oldest particles on initial load with value > limit (delete mode)", async () => {
      const fresh = await loadContainer("test-limit-delete", {
        autoPlay: false,
        particles: {
          number: {
            value: 200,
            limit: {
              value: 100,
              mode: LimitMode.delete,
            },
          },
        },
      });

      expect(fresh.particles.count).to.equal(100);

      const ids = fresh.particles.filter(() => true).map(t => t.id);

      expect(ids).to.have.length(100);
      expect(Math.min(...ids)).to.be.at.least(100);

      fresh.destroy(false);
    });

    it("T25 - should never grow past the limit across consecutive resets", async () => {
      await container.reset();
      await container.reset({
        particles: {
          number: {
            value: 100,
            limit: {
              value: 100,
              mode: LimitMode.wait,
            },
          },
        },
      });

      expect(container.particles.count).to.equal(100);

      await container.reset({
        particles: {
          number: {
            value: 100,
            limit: {
              value: 100,
              mode: LimitMode.wait,
            },
          },
        },
      });

      expect(container.particles.count).to.equal(100);
    });

    it("T26 - should cap push(n) at the limit", async () => {
      await container.reset({
        particles: {
          number: {
            value: 0,
            limit: {
              value: 100,
              mode: LimitMode.wait,
            },
          },
        },
      });

      container.particles.push(500);

      expect(container.particles.count).to.equal(100);

      const particle = container.particles.addParticle();

      expect(particle).to.be.undefined;
      expect(container.particles.count).to.equal(100);
    });

    it("T27 - should never exceed the limit with repeated addParticle calls (wait mode)", async () => {
      await container.reset({
        particles: {
          number: {
            value: 0,
            limit: {
              value: 100,
              mode: LimitMode.wait,
            },
          },
        },
      });

      let accepted = 0;

      for (let i = 0; i < 105; i++) {
        const particle = container.particles.addParticle();

        if (particle) {
          accepted++;
        }

        expect(container.particles.count, `iteration ${i}`).to.be.at.most(100);
      }

      expect(accepted).to.equal(100);
      expect(container.particles.count).to.equal(100);
    });

    it("T27b - should never exceed the limit with repeated addParticle calls (delete mode)", async () => {
      await container.reset({
        particles: {
          number: {
            value: 0,
            limit: {
              value: 100,
              mode: LimitMode.delete,
            },
          },
        },
      });

      for (let i = 0; i < 105; i++) {
        container.particles.addParticle();

        expect(container.particles.count, `iteration ${i}`).to.be.at.most(100);
      }

      expect(container.particles.count).to.equal(100);
    });
  });
});
