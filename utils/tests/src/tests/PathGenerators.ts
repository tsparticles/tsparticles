/* eslint-disable */
import { type Container, type IDelta, type Particle, Vector, tsParticles } from "@tsparticles/engine";
import { beforeAll, describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { branchingPathName, loadBranchesPath } from "@tsparticles/path-branches";
import { brownianPathName, loadBrownianPath } from "@tsparticles/path-brownian";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { curlNoisePathName, loadCurlNoisePath } from "@tsparticles/path-curl-noise";
import { curvesPathName, loadCurvesPath } from "@tsparticles/path-curves";
import { fractalNoisePathName, loadFractalNoisePath } from "@tsparticles/path-fractal-noise";
import { gridPathName, loadGridPath } from "@tsparticles/path-grid";
import { levyPathName, loadLevyPath } from "@tsparticles/path-levy";
import { loadMovePlugin } from "@tsparticles/plugin-move";
import { loadPerlinNoisePath, perlinNoisePathName } from "@tsparticles/path-perlin-noise";
import { loadPolygonPath, polygonPathName } from "@tsparticles/path-polygon";
import { loadRandomPath, randomPathName } from "@tsparticles/path-random";
import { loadSimplexNoisePath, simplexNoisePathName } from "@tsparticles/path-simplex-noise";
import { loadSpiralPath, spiralPathName } from "@tsparticles/path-spiral";
import { loadSVGPath, svgPathName } from "@tsparticles/path-svg";
import { loadZigZagPath, zigZagPathName } from "@tsparticles/path-zig-zag";

type PathGen = {
  generate: (...args: unknown[]) => Vector;
  init: () => void;
  reset: (particle?: unknown) => void;
  update: () => void;
};

const allNames = [
    branchingPathName,
    brownianPathName,
    curlNoisePathName,
    curvesPathName,
    fractalNoisePathName,
    gridPathName,
    levyPathName,
    perlinNoisePathName,
    polygonPathName,
    randomPathName,
    simplexNoisePathName,
    spiralPathName,
    svgPathName,
    zigZagPathName,
  ],
  delta: IDelta = { value: 16, factor: 0.5 };

let containerId = 0;

async function loadPathContainer(generator: string, options: unknown, size = 200): Promise<Container> {
  const container = await tsParticles.load({
    id: `path-${(containerId++).toString()}`,
    options: {
      particles: {
        number: { value: 1 },
        move: { enable: true, path: { enable: true, generator, options } },
      },
    },
    autoPlay: false,
    element: createCustomCanvas(size, size) as unknown as HTMLCanvasElement,
  });

  if (!container) {
    throw new Error("path container not initialized");
  }

  container.canvas.size.width = size;
  container.canvas.size.height = size;

  return container;
}

function getGenerators(container: Container): Map<string, PathGen> {
  const plugin = container.plugins.find(
    p => typeof (p as { availablePathGenerators?: unknown }).availablePathGenerators !== "undefined",
  ) as unknown as { availablePathGenerators: Map<string, PathGen> } | undefined;

  if (!plugin) {
    throw new Error("move plugin not found");
  }

  return plugin.availablePathGenerators;
}

function generator(container: Container, name: string): PathGen {
  const gen = getGenerators(container).get(name);

  if (!gen) {
    throw new Error(`generator ${name} not found`);
  }

  return gen;
}

describe("PathGenerators", async () => {
  globalThis.window = TestWindow;

  beforeAll(async () => {
    await loadMovePlugin(tsParticles);
    await loadBranchesPath(tsParticles);
    await loadBrownianPath(tsParticles);
    await loadCurlNoisePath(tsParticles);
    await loadCurvesPath(tsParticles);
    await loadFractalNoisePath(tsParticles);
    await loadGridPath(tsParticles);
    await loadLevyPath(tsParticles);
    await loadPerlinNoisePath(tsParticles);
    await loadPolygonPath(tsParticles);
    await loadRandomPath(tsParticles);
    await loadSimplexNoisePath(tsParticles);
    await loadSpiralPath(tsParticles);
    await loadSVGPath(tsParticles);
    await loadZigZagPath(tsParticles);

    const boot = await tsParticles.load({
      id: "path-boot",
      options: {},
      autoPlay: false,
      element: createCustomCanvas(10, 10) as unknown as HTMLCanvasElement,
    });

    boot?.destroy(false);
  });

  it("registers every path generator on the container move plugin", async () => {
    const container = await loadPathContainer(spiralPathName, {}),
      gens = getGenerators(container);

    for (const name of allNames) {
      expect(gens.has(name), `${name} missing`).to.be.true;
    }

    container.destroy(false);
  });

  it("spiral advances angle and radius and clamps at maxRadius", async () => {
    const container = await loadPathContainer(spiralPathName, { maxRadius: 20, angularSpeed: 0.02, radialSpeed: 0.3 }),
      gen = generator(container, spiralPathName);

    gen.init();

    const particle = {
      position: { x: 0, y: 0 },
      spiral: {
        angle: 0,
        radius: 5,
        direction: 1,
        maxRadius: 20,
        angularSpeed: 0.02 * 0.01,
        radialSpeed: 0.3 * 0.01,
      },
    };

    const res = gen.generate(particle, delta);

    expect(particle.spiral.angle).to.be.closeTo(0.0001, 1e-12);
    expect(particle.spiral.radius).to.be.closeTo(5.0015, 1e-12);
    expect(particle.position.x).to.be.closeTo(Math.cos(0.0001) * 5.0015, 1e-9);
    expect(particle.position.y).to.be.closeTo(Math.sin(0.0001) * 5.0015, 1e-9);
    expect(res.x).to.equal(0);
    expect(res.y).to.equal(0);

    particle.spiral.angle = 0;
    particle.spiral.radius = 20;
    particle.spiral.direction = 1;
    particle.position.x = 0;
    particle.position.y = 0;

    gen.generate(particle, delta);

    expect(particle.spiral.radius).to.be.closeTo(20, 1e-9);
    expect(particle.spiral.direction).to.equal(-1);

    container.destroy(false);
  });

  it("polygon builds one direction per side and returns the seeded direction", async () => {
    const container = await loadPathContainer(polygonPathName, { sides: 6, angle: 30, turnSteps: 20 }),
      gen = generator(container, polygonPathName) as PathGen & { dirsList: Array<{ x: number; y: number }> };

    gen.init();

    expect(gen.dirsList.length).to.equal(6);

    const particle = {
      hexStep: 1,
      hexDirection: 0,
      hexSpeed: 2,
      velocity: Vector.create(0, 0),
    };

    const res = gen.generate(particle);

    expect(res.x).to.be.closeTo(2 * Math.cos(Math.PI / 6), 1e-9);
    expect(res.y).to.be.closeTo(2 * Math.sin(Math.PI / 6), 1e-9);
    expect(particle.hexStep).to.equal(2);
    expect(particle.velocity.x).to.equal(0);
    expect(particle.velocity.y).to.equal(0);

    gen.reset(particle);
    expect((particle as { hexStep?: number }).hexStep).to.be.undefined;

    container.destroy(false);
  });

  it("grid returns the seeded direction vector while the cell is unchanged", async () => {
    const container = await loadPathContainer(gridPathName, { cellSize: 40 }),
      gen = generator(container, gridPathName);

    gen.init();

    const particle = {
      position: { x: 1, y: 1 },
      velocity: Vector.create(0, 0),
      grid: { direction: 0, speed: 3, cellPosition: { x: 0, y: 0 } },
    };

    let res = gen.generate(particle);
    expect(res.x).to.be.closeTo(3, 1e-9);
    expect(res.y).to.be.closeTo(0, 1e-9);

    particle.grid.direction = 1;
    res = gen.generate(particle);
    expect(res.x).to.be.closeTo(0, 1e-9);
    expect(res.y).to.be.closeTo(3, 1e-9);

    gen.reset(particle);
    expect((particle as { grid?: unknown }).grid).to.be.undefined;

    container.destroy(false);
  });

  it("zigzag applies the wave offset orthogonally to the velocity", async () => {
    const container = await loadPathContainer(zigZagPathName, { waveHeight: 2, waveLength: 4 }),
      gen = generator(container, zigZagPathName);

    gen.init();

    const particle = {
      zigzag: { counter: 0, waveHeight: 2, waveLength: 4 },
      position: { x: 0, y: 0 },
      velocity: Vector.create(1, 0),
    };

    const res = gen.generate(particle, delta),
      angle = (0.5 / 4) * delta.factor,
      offset = 2 * Math.sin(angle);

    expect(particle.zigzag.counter).to.be.closeTo(angle, 1e-12);
    expect(particle.position.x).to.be.closeTo(offset * Math.cos(Math.PI / 2), 1e-9);
    expect(particle.position.y).to.be.closeTo(offset * Math.sin(Math.PI / 2), 1e-9);
    expect(res.x).to.equal(0);
    expect(res.y).to.equal(0);

    container.destroy(false);
  });

  it("branches decrements the remaining segment and returns the target vector", async () => {
    const container = await loadPathContainer(branchingPathName, {}),
      gen = generator(container, branchingPathName);

    gen.init();

    const particle = {
      branching: { angle: 0, remaining: 100, baseSpeed: 2, speed: 2 },
      velocity: Vector.create(5, 5),
    };

    const res = gen.generate(particle);

    expect(res.x).to.be.closeTo(2, 1e-9);
    expect(res.y).to.be.closeTo(0, 1e-9);
    expect(particle.branching.remaining).to.equal(98);
    expect(particle.velocity.x).to.equal(0);
    expect(particle.velocity.y).to.equal(0);

    gen.reset(particle);
    expect((particle as { branching?: unknown }).branching).to.be.undefined;

    container.destroy(false);
  });

  it("branches interpolates velocity toward the target when inertia is enabled", async () => {
    const container = await loadPathContainer(branchingPathName, { inertia: { enable: true, factor: 0.5 } }),
      gen = generator(container, branchingPathName);

    gen.init();

    const particle = {
      branching: { angle: 0, remaining: 100, baseSpeed: 2, speed: 2 },
      velocity: Vector.create(0, 0),
    };

    const res = gen.generate(particle);

    expect(res.x).to.be.closeTo(1, 1e-9);
    expect(res.y).to.be.closeTo(0, 1e-9);
    expect(particle.velocity.x).to.be.closeTo(1, 1e-9);

    container.destroy(false);
  });

  it("brownian returns a vector with the damped base speed magnitude", async () => {
    const container = await loadPathContainer(brownianPathName, { angleDelta: Math.PI / 12, damping: 1 }),
      gen = generator(container, brownianPathName);

    gen.init();

    const particle = {
      brownian: { angle: 0, speed: 4 },
      velocity: Vector.create(0, 0),
    };

    const res = gen.generate(particle);

    expect(res.length).to.be.closeTo(4, 1e-9);
    expect(Number.isFinite(res.angle)).to.be.true;

    gen.reset(particle);
    expect((particle as { brownian?: unknown }).brownian).to.be.undefined;

    container.destroy(false);
  });

  it("levy returns a step bounded by baseSpeed * maxStep", async () => {
    const container = await loadPathContainer(levyPathName, { alpha: 1.5, scale: 1, maxStep: 10 }),
      gen = generator(container, levyPathName);

    gen.init();

    const particle = {
      levy: { angle: 0, baseSpeed: 2 },
      velocity: Vector.create(0, 0),
    };

    const res = gen.generate(particle);

    expect(res.length).to.be.greaterThan(0);
    expect(res.length).to.be.lessThanOrEqual(20 + 1e-9);
    expect(Number.isFinite(res.angle)).to.be.true;

    gen.reset(particle);
    expect((particle as { levy?: unknown }).levy).to.be.undefined;

    container.destroy(false);
  });

  it("random returns a vector bounded in [-1, 1]", async () => {
    const container = await loadPathContainer(randomPathName, {}),
      gen = generator(container, randomPathName);

    const res = gen.generate();

    expect(res.x).to.be.within(-1, 1);
    expect(res.y).to.be.within(-1, 1);

    container.destroy(false);
  });

  it("curves advances the seeded curve velocity using the path generator", async () => {
    const container = await loadPathContainer(curvesPathName, { period: 100, nbHarmonics: 2, attenHarmonics: 0.8 }),
      gen = generator(container, curvesPathName);

    gen.init();

    const particle = {
      pathGen: () => 0.1,
      curveVelocity: Vector.create(1, 0),
      velocity: Vector.create(0, 0),
    };

    const res = gen.generate(particle);

    expect(res.length).to.be.closeTo(1.01, 1e-9);
    expect(res.angle).to.be.closeTo(0.1, 1e-9);

    container.destroy(false);
  });

  it("curves builds the path generator and curve velocity when missing", async () => {
    const container = await loadPathContainer(curvesPathName, { period: 100, nbHarmonics: 2, attenHarmonics: 0.8 }),
      gen = generator(container, curvesPathName);

    gen.init();

    const particle = { velocity: Vector.create(0, 0) } as {
      curveVelocity?: Vector;
      pathGen?: () => number;
      velocity: Vector;
    };

    const res = gen.generate(particle);

    expect(typeof particle.pathGen).to.equal("function");
    expect(particle.curveVelocity).to.not.be.undefined;
    expect(Number.isFinite(res.x)).to.be.true;
    expect(Number.isFinite(res.y)).to.be.true;

    container.destroy(false);
  });

  it("curlNoise is deterministic for the same seeded position", async () => {
    const container = await loadPathContainer(curlNoisePathName, { seed: 42, speed: 0.2, step: 250 }),
      gen = generator(container, curlNoisePathName);

    gen.init();

    const particle = { getPosition: () => ({ x: 100, y: 100, z: 0 }), velocity: Vector.create(0, 0) },
      first = gen.generate(particle),
      v1 = { x: first.x, y: first.y },
      second = gen.generate(particle);

    expect(second.x).to.equal(v1.x);
    expect(second.y).to.equal(v1.y);
    expect(Number.isFinite(v1.x)).to.be.true;
    expect(Number.isFinite(v1.y)).to.be.true;

    container.destroy(false);
  });

  for (const name of [simplexNoisePathName, perlinNoisePathName, fractalNoisePathName]) {
    it(`${name} field is deterministic for the same seed`, async () => {
      const container = await loadPathContainer(name, { seed: 42, size: 20, increment: 0.004 }),
        gen = generator(container, name);

      gen.init();
      gen.update();

      const particle = { getPosition: () => ({ x: 100, y: 100, z: 0 }) },
        first = gen.generate(particle),
        v1 = { x: first.x, y: first.y };

      gen.init();
      gen.update();

      const second = gen.generate(particle);

      expect(second.x).to.equal(v1.x);
      expect(second.y).to.equal(v1.y);
      expect(Number.isFinite(v1.x)).to.be.true;
      expect(Number.isFinite(v1.y)).to.be.true;

      container.destroy(false);
    });
  }

  it("svg generator is registered and loads without path data", async () => {
    const container = await loadPathContainer(svgPathName, {}),
      gen = generator(container, svgPathName);

    expect(gen).to.not.be.undefined;
    expect(() => gen.init()).to.not.throw();

    container.destroy(false);
  });
});
