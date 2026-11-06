import { describe, expect, it, vi } from "vitest";

import { AbsorbersPluginInstance } from "../../../../plugins/absorbers/src/AbsorbersPluginInstance.js";
import { GifDrawer } from "../../../../shapes/gif/src/GifDrawer.js";
import { Responsive } from "../../../../plugins/responsive/src/Options/Classes/Responsive.js";
import { Vector } from "@tsparticles/engine";

const testOrbitRadius = 10;

describe("review regressions", () => {
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
      plugin = new AbsorbersPluginInstance(container as never, instancesManager as never),
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
