/* eslint-disable */
import { LimitMode, type ICoordinates3d, getLogger, getRandom, tsParticles } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

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
  },
  emptyParticlesOptions = {
    particles: {
      number: {
        value: 0,
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

  it("should wait when the particle limit is reached", async () => {
    await container.reset({
      particles: {
        number: {
          value: numParticles,
          limit: {
            mode: LimitMode.wait,
            value: numParticles,
          },
        },
      },
    });

    const particle = container.particles.addParticle({ x: 10, y: 10 });

    expect(particle).to.be.undefined;
    expect(container.particles.count).to.equal(numParticles);
  });

  it("should delete the oldest particle when adding past a delete limit", async () => {
    await container.reset({
      particles: {
        number: {
          value: 3,
          limit: {
            mode: LimitMode.delete,
            value: 3,
          },
        },
      },
    });

    const originalParticles = container.particles.filter(() => true),
      addedParticle = container.particles.addParticle({ x: 50, y: 50 }),
      remainingParticles = container.particles.filter(() => true);

    expect(addedParticle).to.be.not.undefined;
    expect(container.particles.count).to.equal(3);
    expect(remainingParticles).to.eql([originalParticles[1], originalParticles[2], addedParticle]);
    expect(remainingParticles).to.not.include(originalParticles[0]);
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

  it("should ignore out-of-range removeAt calls", async () => {
    await container.reset(numParticlesOptions);

    container.particles.removeAt(-1);
    container.particles.removeAt(container.particles.count);
    container.particles.removeAt(container.particles.count + 1);

    expect(container.particles.count).to.equal(numParticles);
  });

  it("should remove all particles when removeQuantity exceeds the count", async () => {
    await container.reset(enableParticleMoveOptions);

    container.particles.removeQuantity(numParticles + 2);

    expect(container.particles.count).to.equal(0);
  });

  it("should remove all particles when calling clear", async () => {
    await container.reset(numParticlesOptions);

    expect(container.particles.count).to.equal(numParticles);

    container.particles.clear();

    expect(container.particles.count).to.equal(0);
  });

  it("should keep pooled particles reusable after clear", async () => {
    await container.reset(emptyParticlesOptions);

    const particle1 = container.particles.addParticle({ x: 1, y: 1 }),
      particle2 = container.particles.addParticle({ x: 2, y: 2 });

    expect(particle1).to.be.not.undefined;
    expect(particle2).to.be.not.undefined;

    if (!particle1) {
      return;
    }

    container.particles.remove(particle1);
    container.particles.clear();

    const recycledParticle = container.particles.addParticle({ x: 3, y: 3 });

    expect(container.particles.count).to.equal(1);
    expect(recycledParticle).to.equal(particle1);
    expect(recycledParticle?.destroyed).to.be.false;
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

  it("should reuse pooled particles after removals", async () => {
    await container.reset(emptyParticlesOptions);

    const particle1 = container.particles.addParticle({ x: 1, y: 1 }),
      particle2 = container.particles.addParticle({ x: 2, y: 2 });

    expect(particle1).to.be.not.undefined;
    expect(particle2).to.be.not.undefined;

    if (!particle1 || !particle2) {
      return;
    }

    container.particles.remove(particle1);
    container.particles.remove(particle2);

    const recycledParticle = container.particles.addParticle({ x: 3, y: 3 });

    expect(recycledParticle).to.equal(particle2);
    expect(recycledParticle?.id).to.equal(2);
    expect(recycledParticle?.destroyed).to.be.false;
    expect(container.particles.find(t => t === recycledParticle)).to.equal(recycledParticle);
  });

  it("should return rejected initialized particles to the pool", async () => {
    await container.reset(emptyParticlesOptions);

    let rejectedParticle;

    const particle = container.particles.addParticle(undefined, undefined, undefined, currentParticle => {
      rejectedParticle = currentParticle;

      return false;
    });

    expect(particle).to.be.undefined;
    expect(container.particles.count).to.equal(0);

    const acceptedParticle = container.particles.addParticle(undefined, undefined, undefined, () => true);

    expect(acceptedParticle).to.be.not.undefined;
    expect(acceptedParticle).to.equal(rejectedParticle);
    expect(acceptedParticle?.id).to.equal(0);
    expect(container.particles.count).to.equal(1);
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
});
