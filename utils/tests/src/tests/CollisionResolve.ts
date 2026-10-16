/* eslint-disable */
import {
  tsParticles,
  type Container,
  type IDelta,
  type ISourceOptions,
  type Particle,
  getRangeValue,
} from "@tsparticles/engine";
import { loadParticlesCollisionsInteraction } from "@tsparticles/interaction-particles-collisions";
import { loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { loadMovePlugin } from "@tsparticles/plugin-move";
import { loadCircleShape } from "@tsparticles/shape-circle";
import { loadSizeUpdater } from "@tsparticles/updater-size";
import { beforeAll, describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

const testDelta: IDelta = { value: 16, factor: 0.5 },
  canvasWidth = 800,
  canvasHeight = 600,
  pairRadius = 10,
  startX = 100,
  startY = 100,
  bounceSpeed = 5;

let containerId = 0;

async function loadCollisionContainer(options: ISourceOptions): Promise<Container> {
  const id = `collision-resolve-${(containerId += 1).toString()}`,
    container = (await tsParticles.load({
      id,
      options,
      autoPlay: false,
      element: createCustomCanvas(canvasWidth, canvasHeight) as unknown as HTMLCanvasElement,
    })) as Container | null;

  if (!container) {
    throw new Error(`Test container ${id} not initialized`);
  }

  return container;
}

function arrangePair(container: Container, gap: number): [Particle, Particle] {
  const [a, b] = container.particles.filter(() => true) as [Particle, Particle];

  a.position.x = startX;
  b.position.x = startX + gap;
  a.position.y = startY;
  b.position.y = startY;
  a.position.z = 0;
  b.position.z = 0;
  a.velocity.x = 0;
  a.velocity.y = 0;
  b.velocity.x = 0;
  b.velocity.y = 0;

  return [a, b];
}

function collisionContainerOptions(collisions: Record<string, unknown>): ISourceOptions {
  return {
    particles: {
      number: { value: 2 },
      shape: { type: "circle" },
      size: { value: pairRadius },
      move: { enable: false },
      collisions,
    },
    detectRetina: false,
  };
}

describe("CollisionResolve tests", () => {
  globalThis.window = TestWindow;

  beforeAll(async () => {
    await loadInteractivityPlugin(tsParticles);
    await loadMovePlugin(tsParticles);
    await loadCircleShape(tsParticles);
    await loadSizeUpdater(tsParticles);
    await loadParticlesCollisionsInteraction(tsParticles);
  });

  it("should detect the overlap of two particles when their distance is below the radius sum", async () => {
    const container = await loadCollisionContainer(
        collisionContainerOptions({ enable: true, mode: "bounce", maxSpeed: 100 }),
      ),
      [a, b] = arrangePair(container, pairRadius * 2 - 1);

    a.velocity.x = bounceSpeed;
    b.velocity.x = -bounceSpeed;

    container.particles.update(testDelta);

    expect(a.velocity.x).to.be.closeTo(-bounceSpeed, 1e-9);
    expect(b.velocity.x).to.be.closeTo(bounceSpeed, 1e-9);

    await container.destroy(false);
  }, 30000);

  it("should detect the collision of two touching particles at the exact radius sum", async () => {
    const container = await loadCollisionContainer(
        collisionContainerOptions({ enable: true, mode: "bounce", maxSpeed: 100 }),
      ),
      [a, b] = arrangePair(container, pairRadius * 2);

    a.velocity.x = bounceSpeed;
    b.velocity.x = -bounceSpeed;

    container.particles.update(testDelta);

    expect(a.velocity.x).to.be.closeTo(-bounceSpeed, 1e-9);
    expect(b.velocity.x).to.be.closeTo(bounceSpeed, 1e-9);

    await container.destroy(false);
  }, 30000);

  it("should not resolve a collision between particles farther apart than the radius sum", async () => {
    const container = await loadCollisionContainer(
        collisionContainerOptions({ enable: true, mode: "bounce", maxSpeed: 100 }),
      ),
      [a, b] = arrangePair(container, pairRadius * 2 + 5);

    a.velocity.x = bounceSpeed;
    b.velocity.x = -bounceSpeed;

    container.particles.update(testDelta);

    expect(a.velocity.x).to.be.closeTo(bounceSpeed, 1e-9);
    expect(b.velocity.x).to.be.closeTo(-bounceSpeed, 1e-9);

    await container.destroy(false);
  }, 30000);

  it("should swap exactly the head-on velocities of equal-mass particles in a bounce, preserving kinetic energy", async () => {
    const container = await loadCollisionContainer(
        collisionContainerOptions({ enable: true, mode: "bounce", maxSpeed: 100 }),
      ),
      [a, b] = arrangePair(container, pairRadius * 2 - 1);

    a.velocity.x = bounceSpeed;
    b.velocity.x = -bounceSpeed;

    const mass = a.getMass(),
      keBefore = mass * a.velocity.length ** 2 + mass * b.velocity.length ** 2;

    container.particles.update(testDelta);

    expect(a.velocity.x).to.be.closeTo(-bounceSpeed, 1e-9);
    expect(a.velocity.y).to.be.closeTo(0, 1e-9);
    expect(b.velocity.x).to.be.closeTo(bounceSpeed, 1e-9);
    expect(b.velocity.y).to.be.closeTo(0, 1e-9);
    expect(a.velocity.length).to.be.closeTo(bounceSpeed, 1e-9);
    expect(b.velocity.length).to.be.closeTo(bounceSpeed, 1e-9);
    expect(keBefore).to.be.closeTo(2 * mass * bounceSpeed * bounceSpeed, 1e-9);

    const keAfter = mass * a.velocity.length ** 2 + mass * b.velocity.length ** 2;

    expect(keAfter).to.be.closeTo(keBefore, 1e-9);

    await container.destroy(false);
  }, 30000);

  it("should grow the bigger particle and shrink the smaller one in absorb mode", async () => {
    const container = await loadCollisionContainer(
        collisionContainerOptions({ enable: true, mode: "absorb", absorb: { speed: 2 } }),
      ),
      [a, b] = arrangePair(container, 20);
    const bigRadius = 15,
      smallRadius = 10;

    a.size.value = bigRadius;
    b.size.value = smallRadius;

    container.particles.update(testDelta);

    expect(a.size.value).to.be.closeTo(Math.sqrt(bigRadius * bigRadius + 1), 1e-9);
    expect(b.size.value).to.be.closeTo(smallRadius - 1, 1e-9);
    expect(b.destroyed).to.be.false;
    expect(a.destroyed).to.be.false;

    await container.destroy(false);
  }, 30000);

  it("should destroy the smaller particle when absorb mode collapses its radius to zero", async () => {
    const container = await loadCollisionContainer(
        collisionContainerOptions({ enable: true, mode: "absorb", absorb: { speed: 20 } }),
      ),
      [a, b] = arrangePair(container, 20);
    const bigRadius = 15,
      smallRadius = 10;

    a.size.value = bigRadius;
    b.size.value = smallRadius;

    container.particles.update(testDelta);

    expect(a.size.value).to.be.closeTo(Math.sqrt(bigRadius * bigRadius + smallRadius * smallRadius), 1e-9);
    expect(b.size.value).to.equal(0);
    expect(b.destroyed).to.be.true;
    expect(a.destroyed).to.be.false;
    expect(container.particles.count).to.equal(1);

    await container.destroy(false);
  }, 30000);

  it("should destroy the smaller particle and keep the larger one in destroy mode", async () => {
    const container = await loadCollisionContainer(
      collisionContainerOptions({ enable: true, mode: "destroy", maxSpeed: 100 }),
    );
    const [a, b] = arrangePair(container, 20);
    const bigRadius = 15,
      smallRadius = 10;

    a.size.value = bigRadius;
    b.size.value = smallRadius;

    container.particles.update(testDelta);

    expect(a.size.value).to.be.closeTo(bigRadius, 1e-9);
    expect(a.destroyed).to.be.false;
    expect(b.destroyed).to.be.true;
    expect(container.particles.count).to.equal(1);

    await container.destroy(false);

    const equalContainer = await loadCollisionContainer(
        collisionContainerOptions({ enable: true, mode: "destroy", maxSpeed: 100 }),
      ),
      [c, d] = arrangePair(equalContainer, pairRadius * 2 - 1);

    equalContainer.particles.update(testDelta);

    expect(c.destroyed || d.destroyed).to.be.true;
    expect(c.destroyed && d.destroyed).to.be.false;
    expect(equalContainer.particles.count).to.equal(1);

    await equalContainer.destroy(false);
  }, 30000);

  it("should load the fluid collision mode with the overlap/fluid plugin [structural]", async () => {
    const container = await loadCollisionContainer(collisionContainerOptions({ enable: true, mode: "fluid" })),
      particles = container.particles.filter(() => true);

    expect(particles).to.have.length(2);
    expect(particles[0].options.collisions?.mode).to.equal("fluid");
    expect(getRangeValue(particles[0].options.collisions?.fluid?.radius as number)).to.equal(30);
    expect(container.plugins.some(p => typeof p.checkParticlePosition === "function")).to.be.true;

    container.canvas.size.width = canvasWidth;
    container.canvas.size.height = canvasHeight;

    container.particles.update(testDelta);

    for (const particle of particles) {
      expect(Number.isFinite(particle.position.x)).to.be.true;
      expect(Number.isFinite(particle.position.y)).to.be.true;
    }

    await container.destroy(false);
  }, 30000);
});
