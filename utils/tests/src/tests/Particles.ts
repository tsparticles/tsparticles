/* eslint-disable */
import { type ICoordinates3d, getLogger, getRandom, tsParticles } from "@tsparticles/engine";
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

    container.particles.addParticle({ x: 1, y: 1 });

    expect(container.particles.count).to.equal(1);

    container.particles.addParticle({ x: 2, y: 2 });

    expect(container.particles.count).to.equal(2);

    container.particles.addParticle({ x: 3, y: 3 });

    expect(container.particles.count).to.equal(3);
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

    let arr = Array.from(container.particles);

    const particle1 = arr[0],
      particle2 = arr[1],
      particle3 = arr[2],
      particle4 = arr[3],
      particle5 = arr[4];

    container.particles.remove(particle4);

    arr = Array.from(container.particles);

    expect(arr).to.eql([particle1, particle2, particle3, particle5]);
    expect(arr).to.not.eql([particle5, particle3, particle2, particle1]);

    container.particles.remove(particle1);

    arr = Array.from(container.particles);

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

    const arr = Array.from(container.particles);

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

    const arr = Array.from(container.particles);

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
