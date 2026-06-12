import { describe, it, expect } from "vitest";
import { suggestPlugins } from "./suggestPlugins.js";

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
    });
    const absImports = result.imports.filter(i => i.from === "@tsparticles/plugin-absorbers");
    expect(absImports.length).toBeGreaterThanOrEqual(1);
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
    expect(result.npmPackages.length).toBeGreaterThan(3);
    expect(result.imports.length).toBeGreaterThan(3);
  });

  it("should return matched packages for single-plugin options", () => {
    const result = suggestPlugins({
      backgroundMask: { enable: true },
    });
    expect(result.npmPackages).toContain("@tsparticles/plugin-background-mask");
    expect(typeof result.suggestedBundle === "string" || result.suggestedBundle === undefined).toBe(true);
  });
});
