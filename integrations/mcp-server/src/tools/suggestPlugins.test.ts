import { describe, expect, it, vi } from "vitest";

import { loadPolygonShape } from "../../../../shapes/polygon/src/index.js";
import { loadSquareShape } from "../../../../shapes/square/src/index.js";
import { suggestPlugins } from "./suggestPlugins.js";

vi.mock("../../../../shapes/polygon/src/PolygonDrawer.js", () => ({ PolygonDrawer: vi.fn() }));
vi.mock("../../../../shapes/polygon/src/TriangleDrawer.js", () => ({ TriangleDrawer: vi.fn() }));
vi.mock("../../../../shapes/square/src/SquareDrawer.js", () => ({ SquareDrawer: vi.fn() }));

const MIN_ABSORBER_IMPORTS = 1,
  MIN_RICH_MATCHES = 3;

/**
 *
 * @param loader - Shape loader to run against the registration fixture.
 */
async function getRegisteredShapeNames(loader: (engine: never) => Promise<void>): Promise<string[]> {
  vi.stubGlobal("__VERSION__", "test");

  const registeredNames: string[] = [],
    engine = {
      checkVersion: vi.fn(),
      pluginManager: {
        addShape: (names: string[]): void => registeredNames.push(...names),
        register: async (loader: (engine: typeof engine) => Promise<void> | void): Promise<void> => {
          await loader(engine);
        },
      },
    };

  try {
    await loader(engine as never);

    return registeredNames;
  } finally {
    vi.unstubAllGlobals();
  }
}

describe("suggestPlugins", () => {
  it("should return empty result for empty options", () => {
    const result = suggestPlugins({});
    expect(result.npmPackages).toEqual([]);
    expect(result.imports).toEqual([]);
    expect(result.suggestedBundle).toBeUndefined();
  });

  it("should detect links interaction", () => {
    const result = suggestPlugins({
      particles: {
        links: { enable: true },
      },
    });
    expect(result.npmPackages).toContain("@tsparticles/interaction-particles-links");
  });

  it("should detect collision interaction", () => {
    const result = suggestPlugins({
      particles: {
        collisions: { enable: true },
      },
    });
    expect(result.npmPackages).toContain("@tsparticles/interaction-particles-collisions");
  });

  it("should load interactivity before particle interaction loaders", () => {
    const result = suggestPlugins({
        particles: {
          links: { enable: true },
          collisions: { enable: true },
          move: {
            attract: { enable: true },
            repulse: { enable: true },
          },
        },
      }),
      interactivityIndex = result.imports.findIndex(item => item.from === "@tsparticles/plugin-interactivity"),
      particleInteractionIndexes = result.imports
        .map((item, index) => (item.from.startsWith("@tsparticles/interaction-particles-") ? index : -1))
        .filter(index => index >= 0);

    expect(result.npmPackages).toContain("@tsparticles/plugin-interactivity");
    expect(result.npmPackages).toContain("@tsparticles/interaction-particles-repulse");
    expect(interactivityIndex).toBeGreaterThanOrEqual(0);
    expect(particleInteractionIndexes.every(index => interactivityIndex < index)).toBe(true);
    expect(result.imports.some(item => item.function === "loadParticlesRepulseInteraction")).toBe(true);
  });

  it("should detect core movement and paint loaders", () => {
    const result = suggestPlugins({
      particles: {
        move: { enable: true, speed: 3 },
        paint: { color: { value: "#fff" } },
        shape: { type: "circle" },
        size: { value: 3 },
      },
    });

    expect(result.npmPackages).toContain("@tsparticles/plugin-move");
    expect(result.npmPackages).toContain("@tsparticles/updater-paint");
    expect(result.npmPackages).toContain("@tsparticles/shape-circle");
    expect(result.npmPackages).toContain("@tsparticles/updater-size");
    expect(result.npmPackages).toContain("@tsparticles/plugin-hex-color");
    expect(result.imports.some(item => item.function === "loadMovePlugin")).toBe(true);
    expect(result.imports.some(item => item.function === "loadPaintUpdater")).toBe(true);
    expect(result.imports.some(item => item.function === "loadHexColorPlugin")).toBe(true);
  });

  it("should detect multiple effect types", () => {
    const result = suggestPlugins({
      particles: {
        effect: {
          type: ["trail", "bubble"],
        },
      },
    });

    expect(result.npmPackages).toContain("@tsparticles/effect-trail");
    expect(result.npmPackages).toContain("@tsparticles/effect-bubble");
  });

  it("should detect absorbers", () => {
    const result = suggestPlugins({
      absorbers: [{ position: { x: 50, y: 50 } }],
    });
    expect(result.npmPackages).toContain("@tsparticles/plugin-absorbers");
  });

  it("should detect emitters", () => {
    const result = suggestPlugins({
      emitters: [{ position: { x: 50, y: 50 } }],
    });
    expect(result.npmPackages).toContain("@tsparticles/plugin-emitters");
  });

  it.each([
    { emitters: { size: { width: 50, height: 50 } }, hasCircle: false },
    { emitters: [{ shape: { type: "circle" } }, { shape: {} }], hasCircle: true },
  ])("should resolve the default square shape for each emitter ($emitters)", ({ emitters, hasCircle }) => {
    const result = suggestPlugins({ emitters });

    expect(result.npmPackages).toContain("@tsparticles/plugin-emitters-shape-square");
    expect(result.npmPackages.includes("@tsparticles/plugin-emitters-shape-circle")).toBe(hasCircle);
  });

  it("should load interactivity before emitter and absorber loaders", () => {
    const cases = [
      { options: { emitters: {} }, packageName: "@tsparticles/plugin-emitters" },
      { options: { absorbers: {} }, packageName: "@tsparticles/plugin-absorbers" },
    ];

    for (const { options, packageName } of cases) {
      const result = suggestPlugins(options),
        interactivityIndex = result.imports.findIndex(item => item.from === "@tsparticles/plugin-interactivity"),
        pluginIndex = result.imports.findIndex(item => item.from === packageName);

      expect(result.npmPackages).toContain("@tsparticles/plugin-interactivity");
      expect(interactivityIndex).toBeGreaterThanOrEqual(0);
      expect(interactivityIndex).toBeLessThan(pluginIndex);
    }
  });

  it("should map shape aliases to their owning packages and loaders", async () => {
    const result = suggestPlugins({
      particles: {
        shape: {
          type: ["triangle", "edge", "gifs", "character", "images"],
        },
      },
    });

    expect(result.npmPackages).toContain("@tsparticles/shape-polygon");
    expect(result.npmPackages).toContain("@tsparticles/shape-square");
    expect(result.npmPackages).toContain("@tsparticles/shape-gif");
    expect(result.npmPackages).toContain("@tsparticles/shape-text");
    expect(result.npmPackages).toContain("@tsparticles/shape-image");
    expect(result.npmPackages).not.toContain("@tsparticles/shape-triangle");

    const polygonLoader = result.imports.find(
        item => item.from === "@tsparticles/shape-polygon" && item.function === "loadPolygonShape",
      ),
      squareLoader = result.imports.find(
        item => item.from === "@tsparticles/shape-square" && item.function === "loadSquareShape",
      );

    expect(polygonLoader).toBeDefined();
    expect(squareLoader).toBeDefined();
    expect(await getRegisteredShapeNames(loadPolygonShape)).toContain("triangle");
    expect(await getRegisteredShapeNames(loadSquareShape)).toContain("edge");
  });

  it("should ignore inherited shape alias names", () => {
    const result = suggestPlugins({
      particles: {
        move: { enable: true },
        shape: {
          type: ["constructor", "__proto__"],
        },
      },
    });

    expect(result.npmPackages).toContain("@tsparticles/plugin-move");
  });

  it("should detect loaders required by emitter particle overrides", () => {
    const result = suggestPlugins({
      emitters: [
        {
          particles: {
            effect: { type: "trail" },
            move: { enable: true },
            opacity: { value: 0.5 },
            paint: { color: { value: "#fff" } },
            shape: { type: "star" },
          },
        },
        {
          particles: [
            {
              effect: { type: "bubble" },
              shape: { type: "triangle" },
              size: { value: 3 },
            },
          ],
        },
      ],
    });

    expect(result.npmPackages).toContain("@tsparticles/shape-star");
    expect(result.npmPackages).toContain("@tsparticles/shape-polygon");
    expect(result.npmPackages).toContain("@tsparticles/effect-trail");
    expect(result.npmPackages).toContain("@tsparticles/effect-bubble");
    expect(result.npmPackages).toContain("@tsparticles/plugin-move");
    expect(result.npmPackages).toContain("@tsparticles/updater-opacity");
    expect(result.npmPackages).toContain("@tsparticles/updater-paint");
    expect(result.npmPackages).toContain("@tsparticles/updater-size");
    expect(result.npmPackages).toContain("@tsparticles/plugin-hex-color");
  });

  it("should detect loaders required by particle group overrides", () => {
    const result = suggestPlugins({
      particles: {
        groups: {
          stars: { number: { value: 10 }, shape: { type: "star" } },
          hearts: { number: { value: 10 }, shape: { type: "heart" }, effect: { type: "trail" } },
        },
        shape: { type: "circle" },
      },
    });

    expect(result.npmPackages).toContain("@tsparticles/shape-circle");
    expect(result.npmPackages).toContain("@tsparticles/shape-star");
    expect(result.npmPackages).toContain("@tsparticles/shape-heart");
    expect(result.npmPackages).toContain("@tsparticles/effect-trail");
  });

  it("should detect background mask", () => {
    const result = suggestPlugins({
      backgroundMask: { enable: true },
    });
    expect(result.npmPackages).toContain("@tsparticles/plugin-background-mask");
  });

  it("should detect canvas mask", () => {
    const result = suggestPlugins({
      canvasMask: { enable: true },
    });
    expect(result.npmPackages).toContain("@tsparticles/plugin-canvas-mask");
  });

  it("should detect sounds plugin", () => {
    const result = suggestPlugins({
      sounds: { enable: true },
    });
    expect(result.npmPackages).toContain("@tsparticles/plugin-sounds");
  });

  it("should detect polygon mask", () => {
    const result = suggestPlugins({
      polygon: { enable: true },
    });
    expect(result.npmPackages).toContain("@tsparticles/plugin-polygon-mask");
  });

  it("should detect infection", () => {
    const result = suggestPlugins({
      infection: { enable: true },
    });
    expect(result.npmPackages).toContain("@tsparticles/plugin-infection");
  });

  it("should detect poisson disc", () => {
    const result = suggestPlugins({
      poisson: { enable: true },
    });
    expect(result.npmPackages).toContain("@tsparticles/plugin-poisson-disc");
  });

  it("should detect manual particles", () => {
    const result = suggestPlugins({
      manualParticles: [{ position: { x: 50, y: 50 } }],
    });
    expect(result.npmPackages).toContain("@tsparticles/plugin-manual-particles");
  });

  it("should detect responsive", () => {
    const result = suggestPlugins({
      responsive: [{ maxWidth: 800, options: {} }],
    });
    expect(result.npmPackages).toContain("@tsparticles/plugin-responsive");
  });

  it("should detect shapes from responsive particle overrides", () => {
    const result = suggestPlugins({
      particles: { shape: { type: "circle" } },
      responsive: [{ maxWidth: 800, options: { particles: { shape: { type: "star" } } } }],
    });

    expect(result.npmPackages).toContain("@tsparticles/plugin-responsive");
    expect(result.npmPackages).toContain("@tsparticles/shape-circle");
    expect(result.npmPackages).toContain("@tsparticles/shape-star");
  });

  it("should detect themes", () => {
    const result = suggestPlugins({
      themes: [{ name: "dark", default: { value: true } }],
    });
    expect(result.npmPackages).toContain("@tsparticles/plugin-themes");
  });

  it("should detect shape types", () => {
    const result = suggestPlugins({
      particles: {
        shape: { type: "star" },
      },
    });
    expect(result.npmPackages).toContain("@tsparticles/shape-star");
  });

  it("should detect multiple shape types", () => {
    const result = suggestPlugins({
      particles: {
        shape: { type: ["circle", "star", "heart"] },
      },
    });
    expect(result.npmPackages).toContain("@tsparticles/shape-star");
    expect(result.npmPackages).toContain("@tsparticles/shape-heart");
  });

  it("should detect interactivity modes", () => {
    const result = suggestPlugins({
      interactivity: {
        modes: {
          grab: { distance: 200 },
          bubble: { size: 10 },
        },
      },
    });
    expect(result.npmPackages).toContain("@tsparticles/interaction-external-grab");
    expect(result.npmPackages).toContain("@tsparticles/interaction-external-bubble");
  });

  it("should detect interactivity mode from events.onClick.mode", () => {
    const result = suggestPlugins({
      interactivity: {
        events: {
          onClick: {
            mode: "push",
          },
        },
      },
    });

    expect(result.npmPackages).toContain("@tsparticles/plugin-interactivity");
    expect(result.npmPackages).toContain("@tsparticles/interaction-external-push");
  });

  it("should detect interactivity modes from single and array events.onDiv entries", () => {
    const singleEntryResult = suggestPlugins({
        interactivity: {
          events: {
            onDiv: { selectors: "#obstacle", mode: "repulse" },
          },
        },
      }),
      arrayEntryResult = suggestPlugins({
        interactivity: {
          events: {
            onDiv: [{ selectors: "#obstacle", mode: "repulse" }],
          },
        },
      });

    for (const result of [singleEntryResult, arrayEntryResult]) {
      expect(result.npmPackages).toContain("@tsparticles/plugin-interactivity");
      expect(result.npmPackages).toContain("@tsparticles/interaction-external-repulse");
    }
  });

  it("should detect emitter shapes", () => {
    const result = suggestPlugins({
      emitters: {
        shape: { type: "square" },
      },
    });
    expect(result.npmPackages).toContain("@tsparticles/plugin-emitters-shape-square");
  });

  it("should detect particle attract", () => {
    const result = suggestPlugins({
      particles: {
        move: { attract: { enable: true } },
      },
    });
    expect(result.npmPackages).toContain("@tsparticles/interaction-particles-attract");
  });

  it("should return imports with function names", () => {
    const result = suggestPlugins({
        absorbers: [{ position: { x: 50, y: 50 } }],
      }),
      absImports = result.imports.filter(i => i.from === "@tsparticles/plugin-absorbers");
    expect(absImports.length).toBeGreaterThanOrEqual(MIN_ABSORBER_IMPORTS);
  });

  it("should blend plugin detection work (either root or particles.blend)", () => {
    const rootResult = suggestPlugins({
      blend: { enable: true },
    });
    expect(rootResult.npmPackages).toContain("@tsparticles/plugin-blend");
  });

  it("should return matched packages and imports for rich options", () => {
    const result = suggestPlugins({
      particles: {
        links: { enable: true },
        collisions: { enable: true },
      },
      interactivity: {
        modes: {
          grab: { distance: 200 },
          push: { quantity: 4 },
        },
      },
    });
    expect(result.npmPackages.length).toBeGreaterThan(MIN_RICH_MATCHES);
    expect(result.imports.length).toBeGreaterThan(MIN_RICH_MATCHES);
  });

  it("should return matched packages for single-plugin options", () => {
    const result = suggestPlugins({
      backgroundMask: { enable: true },
    });
    expect(result.npmPackages).toContain("@tsparticles/plugin-background-mask");
    const suggestedBundle: unknown = result.suggestedBundle;
    expect(typeof suggestedBundle === "string" || suggestedBundle === undefined).toBe(true);
  });
});
