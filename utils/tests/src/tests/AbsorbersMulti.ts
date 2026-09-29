/* eslint-disable */
import { type ISourceOptions, type RecursivePartial, tsParticles } from "@tsparticles/engine";
import {
  type AbsorberContainer,
  type AbsorberInstance,
  type OrbitingParticle,
  loadAbsorbersPlugin,
} from "@tsparticles/plugin-absorbers";
import { loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

globalThis.window = TestWindow;

const canvasWidth = 1000,
  canvasHeight = 1000,
  frameDelta = { value: 16, factor: 1 },
  singleParticleOptions = {
    autoPlay: false,
    particles: { number: { value: 1 }, move: { enable: false }, size: { value: 4 } },
  };

/**
 * Loads a fresh container with a real canvas size, the test canvas reports a 0x0 size so the
 * absorber `position` option is always collapsed to the origin and the orbit reset would always
 * push the particles outside of the canvas.
 * @param id - The container id
 * @param absorbers - The absorbers options
 * @returns The loaded container
 */
async function loadMultiContainer(
  id: string,
  absorbers: RecursivePartial<ISourceOptions>["absorbers"],
): Promise<AbsorberContainer> {
  const container = (await tsParticles.load({
    id,
    options: {
      ...singleParticleOptions,
      absorbers,
    } as RecursivePartial<ISourceOptions>,
    element: createCustomCanvas(canvasWidth, canvasHeight) as unknown as HTMLCanvasElement,
  })) as AbsorberContainer | null;

  if (!container) {
    throw new Error(`Error test container ${id} not initialized`);
  }

  (container.canvas.size as { width: number }).width = canvasWidth;
  (container.canvas.size as { height: number }).height = canvasHeight;
  container.canvas.resize();

  return container;
}

/**
 * Returns the only particle of the container.
 * @param container - The container to read
 * @returns The single particle
 */
function singleParticle(container: AbsorberContainer): OrbitingParticle {
  const particle = container.particles.filter(() => true)[0];

  if (!particle) {
    throw new Error("No particle found in the test container");
  }

  return particle as OrbitingParticle;
}

/**
 * Places the absorbers at the given coordinates, one per entry.
 * @param container - The container owning the absorbers
 * @param positions - The coordinates to use
 */
function placeAbsorbers(container: AbsorberContainer, positions: { x: number; y: number }[]): AbsorberInstance[] {
  return positions.map((position, index) => {
    const absorber = container.getAbsorber?.(index);

    if (!absorber) {
      throw new Error(`No absorber found at index ${index.toString()}`);
    }

    absorber.position.setTo(position);

    return absorber;
  });
}

describe("Absorbers multi-instance tests", () => {
  beforeAll(async () => {
    await loadInteractivityPlugin(tsParticles);
    await loadAbsorbersPlugin(tsParticles);
  });

  describe("R9 absorber life management", () => {
    it("should call update on every absorber once per frame", async () => {
      const container = await loadMultiContainer("multi-life-update", [
        { orbits: false, destroy: false, size: { value: 5, density: 5 } },
        { orbits: false, destroy: false, size: { value: 5, density: 5 } },
      ]);

      try {
        const absorbers = placeAbsorbers(container, [
            { x: 200, y: 200 },
            { x: 800, y: 800 },
          ]),
          spies = absorbers.map(absorber => vi.spyOn(absorber, "update"));

        container.particles.update(frameDelta);

        for (const spy of spies) {
          expect(spy).toHaveBeenCalledOnce();
        }
      } finally {
        container.destroy();
      }
    });

    it("should move the absorber when its life duration expires", async () => {
      const container = await loadMultiContainer("multi-life-duration", [
        { orbits: false, destroy: false, size: { value: 5, density: 5 }, life: { duration: 0.05 } },
      ]);

      try {
        const [absorber] = placeAbsorbers(container, [{ x: 200, y: 200 }]),
          before = { x: absorber.position.x, y: absorber.position.y };

        // the life duration is expressed in seconds, so it needs several 16ms frames to expire
        for (let i = 0; i < 5; i++) {
          container.particles.update(frameDelta);
        }

        const after = { x: absorber.position.x, y: absorber.position.y };

        expect(after.x === before.x && after.y === before.y).to.equal(false);
      } finally {
        container.destroy();
      }
    });
  });

  describe("R10 attraction force safety", () => {
    it("should keep a finite velocity for a particle exactly on the absorber centre", async () => {
      const container = await loadMultiContainer("multi-force-centre", [
        { orbits: false, destroy: false, size: { value: 5, density: 600 } },
      ]);

      try {
        const [absorber] = placeAbsorbers(container, [{ x: 500, y: 500 }]),
          particle = singleParticle(container);

        particle.position.setTo({ x: 500, y: 500 });
        particle.velocity.setTo({ x: 0, y: 0 });

        absorber.attract(particle, frameDelta);

        expect(Number.isFinite(particle.velocity.x)).to.equal(true);
        expect(Number.isFinite(particle.velocity.y)).to.equal(true);
      } finally {
        container.destroy();
      }
    });

    it("should bound the attraction force as the distance shrinks", async () => {
      const container = await loadMultiContainer("multi-force-bound", [
        { orbits: false, destroy: false, size: { value: 5, density: 600 } },
      ]);

      try {
        const [absorber] = placeAbsorbers(container, [{ x: 500, y: 500 }]),
          particle = singleParticle(container),
          forces: number[] = [];

        for (const offset of [200, 100, 50, 10, 1, 0]) {
          const point = { x: 500 + offset, y: 500 },
            force = absorber.getForce(point);

          expect(Number.isFinite(force.x)).to.equal(true);
          expect(Number.isFinite(force.y)).to.equal(true);

          forces.push(force.length);
        }

        // the uncapped inverse square force would be in the thousands for the closest particles
        expect(Math.max(...forces)).to.be.at.most(100);

        // ...and it still points from the particle towards the absorber
        particle.position.setTo({ x: 700, y: 500 });

        const force = absorber.getForce(particle.getPosition());

        expect(force.x).to.be.below(0);
        expect(force.y).to.be.closeTo(0, 1e-9);
      } finally {
        container.destroy();
      }
    });
  });

  describe("non-orbit multi absorber behavior", () => {
    it("should call attract on every absorber for the same particle", async () => {
      const container = await loadMultiContainer("multi-non-orbit-calls", [
        { orbits: false, destroy: false, size: { value: 5, density: 600 } },
        { orbits: false, destroy: false, size: { value: 5, density: 600 } },
        { orbits: false, destroy: false, size: { value: 5, density: 600 } },
      ]);

      try {
        const absorbers = placeAbsorbers(container, [
            { x: 200, y: 500 },
            { x: 500, y: 500 },
            { x: 800, y: 500 },
          ]),
          spies = absorbers.map(absorber => vi.spyOn(absorber, "attract"));

        container.particles.update(frameDelta);

        for (const spy of spies) {
          expect(spy).toHaveBeenCalledOnce();
        }
      } finally {
        container.destroy();
      }
    });

    it("should cancel the forces of symmetric absorbers", async () => {
      const container = await loadMultiContainer("multi-non-orbit-symmetric", [
        { orbits: false, destroy: false, size: { value: 5, density: 600 } },
        { orbits: false, destroy: false, size: { value: 5, density: 600 } },
      ]);

      try {
        const [a0, a1] = placeAbsorbers(container, [
            { x: 300, y: 500 },
            { x: 700, y: 500 },
          ]),
          particle = singleParticle(container);

        particle.position.setTo({ x: 500, y: 500 });
        particle.velocity.setTo({ x: 0, y: 0 });

        // the forces are summed as vectors, the two absorbers pull the particle in opposite
        // directions with the very same strength, so they must neutralize each other instead of
        // adding up their magnitudes
        const composed = a0.getForce(particle.getPosition());

        composed.addTo(a1.getForce(particle.getPosition()));

        expect(Math.abs(composed.x)).to.be.below(1e-9);
        expect(Math.abs(composed.y)).to.be.below(1e-9);

        container.particles.update(frameDelta);

        expect(Math.abs(particle.velocity.x)).to.be.below(1e-9);
        expect(Math.abs(particle.velocity.y)).to.be.below(1e-9);
      } finally {
        container.destroy();
      }
    });

    it("should drift towards the strongest absorber", async () => {
      const container = await loadMultiContainer("multi-non-orbit-strong", [
        { orbits: false, destroy: false, size: { value: 5, density: 600 } },
        { orbits: false, destroy: false, size: { value: 5, density: 600 } },
      ]);

      try {
        const [a0, a1] = placeAbsorbers(container, [
            { x: 300, y: 500 },
            { x: 700, y: 500 },
          ]),
          particle = singleParticle(container);

        a0.mass = 4 * a0.mass;

        particle.position.setTo({ x: 500, y: 500 });
        particle.velocity.setTo({ x: 0, y: 0 });

        container.particles.update(frameDelta);

        // the heaviest absorber is the left one, so the net force points left
        expect(particle.velocity.x).to.be.below(0);
        expect(a0.getForce(particle.getPosition()).length).to.be.above(a1.getForce(particle.getPosition()).length);
      } finally {
        container.destroy();
      }
    });
  });

  describe("R11 orbit field", () => {
    it("should orbit around the attraction weighted center, not a single absorber", async () => {
      const container = await loadMultiContainer("multi-orbit-field", [
        { orbits: true, destroy: false, size: { value: 20, density: 6000 } },
        { orbits: true, destroy: false, size: { value: 20, density: 600 } },
      ]);

      try {
        placeAbsorbers(container, [
          { x: 800, y: 500 },
          { x: 200, y: 500 },
        ]);

        const particle = singleParticle(container);

        // the particle is equidistant from both absorbers, so their masses alone decide where the
        // field center ends up: the heavy one has 10x the pull, (800 * 10 + 200) / 11
        const expectedCenter = (800 * 10 + 200) / 11;

        particle.position.setTo({ x: 500, y: 500 });
        particle.velocity.setTo({ x: 0, y: 0 });

        container.particles.update(frameDelta);

        // the orbit radius is the real distance to the field center, so the particle stays put and
        // the orbit is a circle around that center instead of around one of the two absorbers: a
        // single absorber orbit would be 300 here, the weighted one is 245
        expect(particle.absorberOrbit).to.not.be.undefined;
        expect(particle.position.x - expectedCenter).to.be.closeTo(500 - expectedCenter, 1e-9);
        expect(particle.absorberOrbit!.length).to.be.closeTo(expectedCenter - 500, 3);
        expect(particle.absorberOrbit!.length).to.be.below(300);

        // the orbit keeps shrinking by the attraction, it never jumps back to another absorber
        let previousRadius = particle.absorberOrbit!.length;

        for (let i = 0; i < 4; i++) {
          container.particles.update(frameDelta);

          expect(particle.absorberOrbit!.length).to.be.below(previousRadius);
          expect(particle.absorberOrbit!.length).to.be.greaterThan(0);

          previousRadius = particle.absorberOrbit!.length;
        }
      } finally {
        container.destroy();
      }
    });

    it("should not move the particle the first time it is captured", async () => {
      const container = await loadMultiContainer("multi-orbit-capture", [
        { orbits: true, destroy: false, size: { value: 20, density: 600 } },
      ]);

      try {
        placeAbsorbers(container, [{ x: 200, y: 500 }]);

        const particle = singleParticle(container);

        particle.position.setTo({ x: 620, y: 340 });
        particle.velocity.setTo({ x: 4, y: 0 });

        const before = { x: particle.position.x, y: particle.position.y };

        container.particles.update(frameDelta);

        // the orbit starts from the offset the particle already has, no random jump
        expect(particle.position.x).to.be.closeTo(before.x, 1e-9);
        expect(particle.position.y).to.be.closeTo(before.y, 1e-9);
        // the radius is reduced by the attraction applied in the same frame
        expect(particle.absorberOrbit!.length).to.be.closeTo(Math.hypot(before.x - 200, before.y - 500), 1);
      } finally {
        container.destroy();
      }
    });

    it("should let the heaviest absorber bend the orbit more than the closest one", async () => {
      const heavy = await loadMultiContainer("multi-orbit-heavy", [
        { orbits: true, destroy: false, size: { value: 20, density: 6000 } },
        { orbits: true, destroy: false, size: { value: 20, density: 600 } },
      ]);

      try {
        placeAbsorbers(heavy, [
          { x: 500, y: 500 },
          { x: 200, y: 500 },
        ]);

        const particle = singleParticle(heavy);

        particle.position.setTo({ x: 800, y: 500 });
        particle.velocity.setTo({ x: 0, y: 0 });

        heavy.particles.update(frameDelta);

        // the light absorber is closer, but the heavy one has 10x the mass, so the field is much
        // closer to the heavy one than a nearest wins rule would put it
        const orbitCenter = heavy.getAbsorber!(0)!.position,
          distanceFromHeavy = Math.hypot(particle.position.x - orbitCenter.x, particle.position.y - orbitCenter.y),
          lightCenter = heavy.getAbsorber!(1)!.position,
          distanceFromLight = Math.hypot(particle.position.x - lightCenter.x, particle.position.y - lightCenter.y);

        expect(distanceFromHeavy).to.be.below(distanceFromLight);
      } finally {
        heavy.destroy();
      }
    });

    it("should let the forces of opposing absorbers cancel instead of collapsing the orbit", async () => {
      // the same field absorber, alone, then opposed by a symmetric one, the composed radial force
      // of the second setup must be null instead of the sum of the two magnitudes
      const alone = await loadMultiContainer("multi-orbit-alone", [
        { orbits: true, destroy: false, size: { value: 20, density: 600 } },
      ]);

      const opposed = await loadMultiContainer("multi-orbit-opposed", [
        { orbits: true, destroy: false, size: { value: 20, density: 600 } },
        { orbits: false, destroy: false, size: { value: 20, density: 600 } },
      ]);

      const radiusOf = (container: AbsorberContainer): number => {
        const particle = singleParticle(container);

        particle.position.setTo({ x: 500, y: 500 });
        particle.velocity.setTo({ x: 0, y: 0 });

        container.particles.update(frameDelta);

        for (let i = 0; i < 5; i++) {
          container.particles.update(frameDelta);
        }

        return (particle.absorberOrbit as { length: number }).length;
      };

      try {
        placeAbsorbers(alone, [{ x: 300, y: 500 }]);
        placeAbsorbers(opposed, [
          { x: 300, y: 500 },
          { x: 700, y: 500 },
        ]);

        const aloneRadius = radiusOf(alone),
          opposedRadius = radiusOf(opposed);

        // alone the orbit collapses, opposed by an equidistant absorber it must not collapse at all
        expect(aloneRadius).to.be.below(200);
        expect(opposedRadius).to.be.closeTo(200, 1e-2);
      } finally {
        {
          alone.destroy();
          opposed.destroy();
        }
      }
    });

    it("should shrink the orbit when every absorber pulls the same way", async () => {
      const single = await loadMultiContainer("multi-orbit-collapse-single", [
        { orbits: true, destroy: false, size: { value: 20, density: 600 } },
      ]);

      const pair = await loadMultiContainer("multi-orbit-collapse-pair", [
        { orbits: true, destroy: false, size: { value: 20, density: 600 } },
        { orbits: false, destroy: false, size: { value: 20, density: 600 } },
      ]);

      try {
        placeAbsorbers(single, [{ x: 200, y: 500 }]);
        placeAbsorbers(pair, [
          { x: 200, y: 500 },
          { x: 400, y: 500 },
        ]);

        const singleParticleRef = singleParticle(single),
          pairParticle = singleParticle(pair);

        // both absorbers are on the same side of the particle, so both pull it the same way
        singleParticleRef.position.setTo({ x: 620, y: 500 });
        pairParticle.position.setTo({ x: 620, y: 500 });
        singleParticleRef.velocity.setTo({ x: 0, y: 0 });
        pairParticle.velocity.setTo({ x: 0, y: 0 });

        single.particles.update(frameDelta);
        pair.particles.update(frameDelta);

        for (let i = 0; i < 3; i++) {
          single.particles.update(frameDelta);
          pair.particles.update(frameDelta);
        }

        // the second absorber adds its radial force to the first one, it is not ignored
        expect(pairParticle.absorberOrbit!.length).to.be.below(singleParticleRef.absorberOrbit!.length);
      } finally {
        {
          single.destroy();
          pair.destroy();
        }
      }
    });

    it("should grow the orbit when a closer absorber pushes the particle away from the field", async () => {
      const container = await loadMultiContainer("multi-orbit-push", [
        { orbits: true, destroy: false, size: { value: 20, density: 600 } },
        { orbits: false, destroy: false, size: { value: 20, density: 600 } },
      ]);

      try {
        placeAbsorbers(container, [
          { x: 200, y: 500 },
          { x: 800, y: 500 },
        ]);

        const particle = singleParticle(container);

        particle.position.setTo({ x: 620, y: 500 });
        particle.velocity.setTo({ x: 0, y: 0 });

        container.particles.update(frameDelta);

        const radius = particle.absorberOrbit!.length;

        for (let i = 0; i < 5; i++) {
          container.particles.update(frameDelta);
        }

        // the non orbiting absorber is the closest one, so it outweighs the field and pushes the
        // particle outward: the force is a vector, its direction matters as much as its magnitude
        expect(particle.absorberOrbit!.length).to.be.above(radius);
      } finally {
        container.destroy();
      }
    });
  });

  describe("R12 attraction is never discarded", () => {
    it("should apply the force of every absorber, orbit driven or not", async () => {
      const container = await loadMultiContainer("multi-force-all", [
        { orbits: false, destroy: false, size: { value: 5, density: 600 } },
        { orbits: false, destroy: false, size: { value: 5, density: 600 } },
      ]);

      try {
        const [left] = placeAbsorbers(container, [
            { x: 300, y: 500 },
            { x: 700, y: 500 },
          ]),
          particle = singleParticle(container);

        particle.position.setTo({ x: 400, y: 500 });
        particle.velocity.setTo({ x: 0, y: 0 });

        // the left absorber pulls it back
        container.particles.update(frameDelta);

        expect(particle.velocity.x).to.be.below(0);
        expect(left.getAttraction(particle.getPosition())).to.be.greaterThan(0);
      } finally {
        container.destroy();
      }
    });

    it("should expose the capped attraction of an absorber as its orbit weight", async () => {
      const container = await loadMultiContainer("multi-attraction-api", [
        { orbits: true, destroy: false, size: { value: 30, density: 600 } },
      ]);

      try {
        const [absorber] = placeAbsorbers(container, [{ x: 500, y: 500 }]),
          particle = singleParticle(container);

        // a point on the absorber centre can't produce an infinite force
        expect(absorber.getAttraction({ x: 500, y: 500 })).to.be.at.most(100);
        expect(Number.isFinite(absorber.getAttraction({ x: 500, y: 500 }))).to.equal(true);

        // the attraction falls off with the distance
        expect(absorber.getAttraction({ x: 100, y: 500 })).to.be.below(absorber.getAttraction({ x: 400, y: 500 }));
        expect(particle.absorberOrbit).to.equal(undefined);
      } finally {
        container.destroy();
      }
    });
  });

  describe("R13/R14 in canvas recycle", () => {
    it("should keep the particle inside the canvas when the orbit collapses", async () => {
      const container = await loadMultiContainer("multi-recycle-canvas", [
        { orbits: true, destroy: false, size: { value: 30, density: 600 } },
      ]);

      try {
        const [absorber] = placeAbsorbers(container, [{ x: 500, y: 500 }]),
          particle = singleParticle(container);

        // the particle starts inside the absorber, so the orbit radius collapses right away
        particle.position.setTo({ x: 505, y: 500 });
        particle.velocity.setTo({ x: 0, y: 0 });

        for (let i = 0; i < 3; i++) {
          container.particles.update(frameDelta);

          expect(particle.position.x).to.be.within(0, canvasWidth);
          expect(particle.position.y).to.be.within(0, canvasHeight);
        }

        expect(absorber.orbits).to.equal(true);
      } finally {
        container.destroy();
      }
    });

    it("should clear the orbit state when recycling the particle", async () => {
      const container = await loadMultiContainer("multi-recycle-state", [
        { orbits: true, destroy: false, size: { value: 30, density: 600 } },
      ]);

      try {
        const [absorber] = placeAbsorbers(container, [{ x: 500, y: 500 }]),
          particle = singleParticle(container);

        // the particle starts inside the absorber, so the orbit radius collapses right away
        particle.position.setTo({ x: 505, y: 500 });
        particle.velocity.setTo({ x: 0, y: 0 });

        container.particles.update(frameDelta);

        // the orbit is rebuilt from scratch on the next frame, so the geometry bound to the
        // previous position must not survive the recycle
        expect(particle.needsNewPosition).to.equal(false);
        expect(particle.absorberOrbit).to.equal(undefined);
        expect(particle.position.x).to.be.within(0, canvasWidth);
        expect(particle.position.y).to.be.within(0, canvasHeight);

        // a particle in the absorption shell, close enough to be captured but outside the
        // collapsing radius, gets a brand new orbit around the owner
        particle.position.setTo({ x: 468, y: 500 });

        container.particles.update(frameDelta);

        expect(particle.absorberOrbit).to.not.equal(undefined);
        expect(Math.abs(particle.position.x - absorber.position.x)).to.be.closeTo(32, 1);
        expect(particle.absorberOrbit?.length ?? 0).to.be.greaterThan(0);
        expect(particle.position.x).to.be.within(0, canvasWidth);
        expect(particle.position.y).to.be.within(0, canvasHeight);
        expect(absorber.orbits).to.equal(true);
      } finally {
        container.destroy();
      }
    });
  });
});
