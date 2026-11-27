import { Vector, createEngine } from "@tsparticles/engine";
import { describe, expect, it, vi } from "vitest";
import { AbsorberInstance } from "../../../../plugins/absorbers/src/AbsorberInstance.js";
import { AbsorbersPluginInstance } from "../../../../plugins/absorbers/src/AbsorbersPluginInstance.js";
import { EmittersPluginInstance } from "../../../../plugins/emitters/src/EmittersPluginInstance.js";
import { EventListeners } from "../../../../engine/src/Core/Container/EventListeners.js";
import { GifDrawer } from "../../../../shapes/gif/src/GifDrawer.js";
import { MotionPluginInstance } from "../../../../plugins/motion/src/MotionPluginInstance.js";
import { NoiseFieldGenerator } from "../../../../utils/noiseField/src/NoiseFieldGenerator.js";
import { PoissonDiscPluginInstance } from "../../../../plugins/poisson/src/PoissonDiscPluginInstance.js";
import { Responsive } from "../../../../plugins/responsive/src/Options/Classes/Responsive.js";

const testOrbitRadius = 10,
  testRandomValue = 0.5,
  testFirstEngineRandom = 0.25,
  testSecondEngineRandom = 0.75,
  testFallbackRandom = 0.99,
  testCanvasSize = 100,
  testRecycledVelocity = 5,
  testAbsorberPosition = { x: { min: 10, max: 30 }, y: { min: 20, max: 60 } };

describe("review regressions", () => {
  it("adds and removes listeners without a document in a worker", () => {
    vi.stubGlobal("document", undefined);

    try {
      const listeners = new EventListeners({
        actualOptions: { resize: { enable: false } },
      } as never);

      listeners.addListeners();
      listeners.removeListeners();
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("removes the reduced-motion listener on stop and reattaches it once on init", async () => {
    const addEventListener = vi.fn(),
      removeEventListener = vi.fn(),
      mediaQuery = { matches: false, addEventListener, removeEventListener };

    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => mediaQuery),
    );

    try {
      const refresh = vi.fn(),
        plugin = new MotionPluginInstance({
          actualOptions: {
            motion: { disable: true, reduce: { value: true, factor: 2 } },
          },
          destroyed: false,
          retina: { reduceFactor: 1 },
          refresh,
        } as never);

      await plugin.init();
      const staleCallback = addEventListener.mock
        .calls[0]?.[1] as EventListener;

      plugin.stop();
      staleCallback(new Event("change"));

      await plugin.init();
      const currentCallback = addEventListener.mock
        .calls[1]?.[1] as EventListener;

      currentCallback(new Event("change"));
      await Promise.resolve();
      await Promise.resolve();

      expect(refresh).toHaveBeenCalledOnce();

      expect(addEventListener).toHaveBeenCalledTimes(2);
      expect(removeEventListener).toHaveBeenCalledOnce();
      plugin.destroy();
      expect(removeEventListener).toHaveBeenCalledTimes(2);
      currentCallback(new Event("change"));
      expect(refresh).toHaveBeenCalledOnce();
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("removes and replaces the noise-field resize listener across init and destroy", () => {
    const addEventListener =
        vi.fn<(type: string, listener: EventListener) => void>(),
      removeEventListener =
        vi.fn<(type: string, listener: EventListener) => void>(),
      noiseGenerator = { noise4d: () => 0, seed: vi.fn() };

    vi.stubGlobal("addEventListener", addEventListener);
    vi.stubGlobal("removeEventListener", removeEventListener);

    class TestNoiseFieldGenerator extends NoiseFieldGenerator {
      constructor() {
        super(
          {
            actualOptions: { particles: { move: { path: { options: {} } } } },
            canvas: { size: { width: 100, height: 100 } },
            engine: { getRandom: () => testRandomValue },
            zLayers: 100,
          } as never,
          noiseGenerator,
        );
      }
    }

    try {
      const generator = new TestNoiseFieldGenerator();

      generator.init();
      const firstHandler = addEventListener.mock.calls[0]?.[1];

      generator.init();
      const secondHandler = addEventListener.mock.calls[1]?.[1];

      expect(removeEventListener).toHaveBeenCalledWith("resize", firstHandler);
      expect(secondHandler).not.toBe(firstHandler);

      generator.destroy();

      expect(removeEventListener).toHaveBeenCalledWith("resize", secondHandler);
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("cancels pending Poisson redraw work on stop", () => {
    vi.useFakeTimers();

    try {
      const redraw = vi.fn(),
        plugin = new PoissonDiscPluginInstance({
          actualOptions: { poisson: { enable: true } },
          destroyed: false,
          particles: { redraw },
        } as never);

      plugin.resize();
      plugin.stop();
      vi.runAllTimers();

      expect(plugin.redrawTimeout).toBeUndefined();
      expect(redraw).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });

  it("does not install Poisson data when async initialization is stopped", async () => {
    const plugin = new PoissonDiscPluginInstance({
        actualOptions: {
          poisson: {
            dimensions: 2,
            enable: true,
            radius: 10,
            retries: 5,
            steps: 0,
          },
          particles: { number: { value: 10 } },
        },
        canvas: { size: { width: 100, height: 100 } },
        destroyed: false,
        engine: { getRandomFn: () => () => testRandomValue },
        retina: { pixelRatio: 1 },
        zLayers: 100,
      } as never),
      initialization = plugin.init();

    plugin.stop();
    await initialization;

    expect(plugin.poissonDisc).toBeUndefined();
  });

  it("releases emitter and absorber registries when a container plugin is destroyed", () => {
    const container = {},
      emitterManager = {
        clear: vi.fn(),
        destroyContainer: vi.fn(),
        initContainer: vi.fn(),
      },
      absorberManager = {
        destroyContainer: vi.fn(),
        initContainer: vi.fn(),
      },
      emitters = new EmittersPluginInstance(
        emitterManager as never,
        container as never,
      ),
      absorbers = new AbsorbersPluginInstance(
        container as never,
        absorberManager as never,
      );

    emitters.stop();
    emitters.destroy();
    absorbers.destroy();

    expect(emitterManager.clear).toHaveBeenCalledWith(container);
    expect(emitterManager.destroyContainer).toHaveBeenCalledWith(container);
    expect(absorberManager.destroyContainer).toHaveBeenCalledWith(container);
  });

  it("does not retry a GIF after its particle is recycled as an image", () => {
    const retries: (() => void)[] = [],
      timeout = vi.spyOn(globalThis, "setTimeout");

    timeout.mockImplementation(((callback: () => void): number => {
      retries.push(callback);

      return 0;
    }) as typeof setTimeout);

    try {
      const drawer = new GifDrawer({} as never),
        particle = {
          shape: "gif",
          shapeData: { src: "pending.gif" },
          destroyed: false,
        };

      drawer.particleInit({ destroyed: false } as never, particle as never);
      particle.shape = "image";
      retries[0]?.();

      expect(timeout).toHaveBeenCalledTimes(1);
    } finally {
      timeout.mockRestore();
    }
  });

  it("uses each engine RNG for absorber placement and resize", () => {
    const fallback = vi
      .spyOn(Math, "random")
      .mockReturnValue(testFallbackRandom);

    try {
      for (const sample of [testFirstEngineRandom, testSecondEngineRandom]) {
        const engine = createEngine();

        engine.setRandom(() => sample);
        const container = {
            engine,
            canvas: { size: { width: testCanvasSize, height: testCanvasSize } },
            retina: { pixelRatio: 1, reduceFactor: 1 },
          },
          absorber = new AbsorberInstance(
            engine.pluginManager,
            container as never,
            {
              position: testAbsorberPosition,
            },
          );

        expect(absorber.position.x).to.equal(
          testAbsorberPosition.x.min +
            (testAbsorberPosition.x.max - testAbsorberPosition.x.min) * sample,
        );
        expect(absorber.position.y).to.equal(
          testAbsorberPosition.y.min +
            (testAbsorberPosition.y.max - testAbsorberPosition.y.min) * sample,
        );
        engine.setRandom(() => 1 - sample);
        absorber.resize();
        expect(absorber.position.x).to.equal(
          testAbsorberPosition.x.min +
            (testAbsorberPosition.x.max - testAbsorberPosition.x.min) *
              (1 - sample),
        );
        expect(absorber.position.y).to.equal(
          testAbsorberPosition.y.min +
            (testAbsorberPosition.y.max - testAbsorberPosition.y.min) *
              (1 - sample),
        );
      }
    } finally {
      fallback.mockRestore();
    }
  });

  it("recycles absorbed particles with their owning engine RNG", () => {
    const fallback = vi
      .spyOn(Math, "random")
      .mockReturnValue(testFallbackRandom);

    try {
      for (const sample of [testFirstEngineRandom, testSecondEngineRandom]) {
        const container = {
            canvas: { size: { width: testCanvasSize, height: testCanvasSize } },
            engine: {
              getRandom: () => sample,
              getRandomFn: () => () => sample,
            },
          },
          instancesManager = {
            initContainer: () => undefined,
            getArray: () => [
              {
                orbits: false,
                getForce: () => Vector.origin,
                attract: () => undefined,
              },
            ],
          },
          plugin = new AbsorbersPluginInstance(
            container as never,
            instancesManager as never,
          ),
          particle = {
            position: Vector.origin,
            velocity: Vector.create(testRecycledVelocity, testRecycledVelocity),
            initialVelocity: Vector.create(1, 2),
            absorberOrbit: Vector.create(testOrbitRadius, 0) as
              Vector | undefined,
            absorberOrbitDirection: "clockwise" as string | undefined,
            destroyed: false,
            needsNewPosition: true,
            getPosition() {
              return this.position;
            },
          };

        plugin.particleUpdate(particle as never, { value: 1, factor: 1 });
        expect(particle.position.x).to.equal(testCanvasSize * sample);
        expect(particle.position.y).to.equal(testCanvasSize * sample);
        expect(particle.velocity).to.deep.equal(particle.initialVelocity);
        expect(particle.needsNewPosition).to.equal(false);
        expect(particle.absorberOrbit).to.equal(undefined);
        expect(particle.absorberOrbitDirection).to.equal(undefined);
      }
    } finally {
      fallback.mockRestore();
    }
  });

  it("mirrors tangential force for counterclockwise absorber orbits", () => {
    const orbitingAbsorber = {
        orbits: true,
        position: { x: 0, y: 0 },
        size: 1,
        getForce: () => Vector.origin,
        getAttraction: () => 1,
        attract: () => undefined,
      },
      attractingAbsorber = {
        orbits: false,
        getForce: () => Vector.create(0, 1),
        attract: () => undefined,
      },
      container = {
        canvas: { size: { width: 100, height: 100 } },
        retina: { reduceFactor: 1 },
      },
      instancesManager = {
        initContainer: () => undefined,
        getArray: () => [orbitingAbsorber, attractingAbsorber],
      },
      plugin = new AbsorbersPluginInstance(
        container as never,
        instancesManager as never,
      ),
      particle = {
        position: Vector.create(testOrbitRadius, 0),
        velocity: Vector.create(-1, 0),
        options: { move: { size: false } },
        retina: { moveSpeed: 0 },
        size: { max: 1 },
        absorberOrbit: undefined as Vector | undefined,
        getPosition() {
          return this.position;
        },
        getRadius: () => 1,
        destroyed: false,
        needsNewPosition: false,
      };

    plugin.particleUpdate(particle as never, { value: 1, factor: 1 });

    expect(particle.absorberOrbit?.angle).to.be.lessThan(0);
  });

  it("preserves drawable references in responsive backgrounds and mask covers", () => {
    const backgroundElement = document.createElement("canvas"),
      maskElement = document.createElement("canvas"),
      responsive = new Responsive();

    responsive.load({
      options: {
        background: { element: backgroundElement },
        backgroundMask: { cover: { element: maskElement } },
      },
    });

    const options = responsive.options as {
      background?: { element?: unknown };
      backgroundMask?: { cover?: { element?: unknown } };
    };

    expect(options.background?.element).to.equal(backgroundElement);
    expect(options.backgroundMask?.cover?.element).to.equal(maskElement);
  });
});
