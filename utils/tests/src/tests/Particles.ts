/* eslint-disable */
import {
  type Container,
  type ICoordinates3d,
  type IParticleUpdater,
  type ISourceOptions,
  LimitMode,
  type Particle,
  createEngine,
  getRandom,
} from "@tsparticles/engine";
import { beforeEach, describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

const tsParticles = createEngine();

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

  it("keeps supplied position and initial motion snapshots independent", async () => {
    await container.reset({ particles: { number: { value: 0 } } });

    const suppliedPosition: ICoordinates3d = { x: 100, y: 120, z: 0 },
      particle = container.particles.addParticle(suppliedPosition, { move: { speed: 8 } });

    expect(particle).to.not.be.undefined;
    expect(suppliedPosition).to.deep.equal({ x: 100, y: 120, z: 0 });

    if (!particle) {
      return;
    }

    expect(particle.position).to.not.equal(particle.initialPosition);
    expect(particle.initialPosition.x).to.equal(suppliedPosition.x);
    expect(particle.initialPosition.y).to.equal(suppliedPosition.y);
    expect(particle.options.move.speed).to.equal(8);
    expect(particle.velocity).to.not.equal(particle.initialVelocity);

    const initialPositionX = particle.initialPosition.x,
      initialVelocityX = particle.initialVelocity.x;

    particle.position.x += 1;
    particle.velocity.x += 1;

    expect(particle.initialPosition.x).to.equal(initialPositionX);
    expect(particle.initialVelocity.x).to.equal(initialVelocityX);
  });

  it("lets an updater release its particle-owned extension state before pool reuse", async () => {
    await container.reset({ particles: { number: { value: 0 } } });

    let extensionEnabled = true;
    const updater: IParticleUpdater = {
      init: particle => {
        if (extensionEnabled) {
          (particle as Particle & { extensionCache?: string }).extensionCache = "owned";
        }
      },
      isEnabled: () => false,
      particleDestroyed: particle => {
        delete (particle as Particle & { extensionCache?: string }).extensionCache;
      },
      update: () => undefined,
    };

    container.particleUpdaters.push(updater);

    try {
      const original = container.particles.addParticle();

      expect(original).to.not.be.undefined;

      if (!original) {
        return;
      }

      expect((original as Particle & { extensionCache?: string }).extensionCache).to.equal("owned");
      container.particles.remove(original);
      expect((original as Particle & { extensionCache?: string }).extensionCache).to.be.undefined;

      extensionEnabled = false;

      const reused = container.particles.addParticle();

      expect(reused).to.equal(original);
      expect((reused as (Particle & { extensionCache?: string }) | undefined)?.extensionCache).to.be.undefined;
    } finally {
      container.particles.clear();
      container.particleUpdaters.splice(container.particleUpdaters.indexOf(updater), 1);
    }
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

    let ts = container.engine.getRandom() * 16.66667;

    const logP = arr[0];

    container.engine.getLogger().log(logP.id);

    container.particles.update({
      value: ts,
      factor: (60 * ts) / 1000,
    });

    ts = container.engine.getRandom() * 16.66667;

    container.particles.update({
      value: ts,
      factor: (60 * ts) / 1000,
    });

    ts = container.engine.getRandom() * 16.66667;

    container.particles.update({
      value: ts,
      factor: (60 * ts) / 1000,
    });

    ts = container.engine.getRandom() * 16.66667;

    container.particles.update({
      value: ts,
      factor: (60 * ts) / 1000,
    });

    ts = container.engine.getRandom() * 16.66667;

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

      let rejectedParticle: Particle | undefined;
      const rejected = container.particles.addParticle(undefined, undefined, undefined, particle => {
        rejectedParticle = particle;

        return false;
      });

      expect(rejected).to.be.undefined;
      expect(container.particles.count).to.equal(0);
      expect(rejectedParticle?.destroyed).to.be.true;

      const accepted = container.particles.addParticle(undefined, undefined, undefined, () => true);

      expect(accepted).to.be.not.undefined;
      expect(container.particles.count).to.equal(1);
      expect(container.particles.filter(() => true)[0]).to.equal(accepted);
    });

    it("T7 - should destroy and pool a particle when the initializer throws", async () => {
      await container.reset(enableParticleEmptyMoveOptions);

      let rejectedParticle: Particle | undefined;
      const rejected = container.particles.addParticle(undefined, undefined, undefined, particle => {
        rejectedParticle = particle;

        throw new Error("initializer failed");
      });

      expect(rejected).to.be.undefined;
      expect(container.particles.count).to.equal(0);
      expect(rejectedParticle?.destroyed).to.be.true;

      const accepted = container.particles.addParticle();

      expect(accepted).to.equal(rejectedParticle);
      expect(accepted?.destroyed).to.be.false;
      expect(container.particles.count).to.equal(1);
    });

    it("T8 - should destroy and pool a particle when particle initialization throws", async () => {
      await container.reset(enableParticleEmptyMoveOptions);

      let failedParticle: Particle | undefined, destroyedParticle: Particle | undefined;
      const failingUpdater: IParticleUpdater = {
        init: particle => {
          failedParticle = particle;
          particle.unbreakable = true;

          throw new Error("particle init failed");
        },
        isEnabled: () => false,
        particleDestroyed: particle => {
          destroyedParticle = particle;
        },
        update: () => undefined,
      };

      container.particleUpdaters.push(failingUpdater);

      try {
        const rejected = container.particles.addParticle();

        expect(rejected).to.be.undefined;
        expect(container.particles.count).to.equal(0);
        expect(failedParticle?.destroyed).to.be.true;
        expect(destroyedParticle).to.equal(failedParticle);
      } finally {
        container.particleUpdaters.splice(container.particleUpdaters.indexOf(failingUpdater), 1);
      }

      const accepted = container.particles.addParticle();

      expect(accepted).to.equal(failedParticle);
      expect(accepted?.destroyed).to.be.false;
      expect(container.particles.count).to.equal(1);
    });

    it("T7 - should leave the pool intact when clearing so addParticle still works", async () => {
      await container.reset(enableParticleEmptyMoveOptions);

      container.particles.addParticle();
      container.particles.addParticle();

      expect(container.particles.count).to.equal(2);

      container.particles.removeQuantity(1);

      expect(container.particles.count).to.equal(1);

      const remaining = container.particles.filter(() => true)[0];

      if (!remaining) {
        throw new Error("remaining particle not found");
      }

      const position = remaining.getPosition();

      container.particles.grid.insert(remaining);
      expect(container.particles.grid.queryCircle(position, 100)).to.include(remaining);

      container.particles.clear();

      expect(container.particles.count).to.equal(0);
      expect(remaining.destroyed).to.be.true;
      expect(container.particles.grid.queryCircle(position, 100)).to.be.empty;

      const particle = container.particles.addParticle();

      expect(particle).to.be.not.undefined;
      expect(particle).to.equal(remaining);
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

      try {
        expect(fresh.particles.count).to.be.at.most(100);

        fresh.particles.update({
          value: 16.66667,
          factor: (60 * 16.66667) / 1000,
        });

        expect(fresh.particles.count).to.be.at.most(100);
      } finally {
        fresh.destroy(false);
      }
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

      try {
        expect(fresh.particles.count).to.equal(100);
      } finally {
        fresh.destroy(false);
      }
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

      try {
        expect(fresh.particles.count).to.equal(100);

        const ids = fresh.particles.filter(() => true).map(t => t.id);

        expect(ids).to.have.length(100);
        expect(Math.min(...ids)).to.be.at.least(100);
      } finally {
        fresh.destroy(false);
      }
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
