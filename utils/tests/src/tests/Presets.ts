/* eslint-disable */
import { type Container, type Engine, type ISourceOptions, tsParticles } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { loadAmbientPreset } from "@tsparticles/preset-ambient";
import { loadBigCirclesPreset } from "@tsparticles/preset-big-circles";
import { loadBubblesPreset } from "@tsparticles/preset-bubbles";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import { loadConfettiCannonPreset } from "@tsparticles/preset-confetti-cannon";
import { loadConfettiExplosionsPreset } from "@tsparticles/preset-confetti-explosions";
import { loadConfettiFallingPreset } from "@tsparticles/preset-confetti-falling";
import { loadConfettiParadePreset } from "@tsparticles/preset-confetti-parade";
import { loadFirePreset } from "@tsparticles/preset-fire";
import { loadFireflyPreset } from "@tsparticles/preset-firefly";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import { loadFountainPreset } from "@tsparticles/preset-fountain";
import { loadHyperspacePreset } from "@tsparticles/preset-hyperspace";
import { loadLinksPreset } from "@tsparticles/preset-links";
import { loadMatrixPreset } from "@tsparticles/preset-matrix";
import { loadMeteorsPreset } from "@tsparticles/preset-meteors";
import { loadPartyPreset } from "@tsparticles/preset-party";
import { loadSeaAnemonePreset } from "@tsparticles/preset-sea-anemone";
import { loadSnowPreset } from "@tsparticles/preset-snow";
import { loadSquaresPreset } from "@tsparticles/preset-squares";
import { loadStarsPreset } from "@tsparticles/preset-stars";
import { loadTrianglesPreset } from "@tsparticles/preset-triangles";

const presets: { key: string; load: (engine: Engine) => Promise<void> }[] = [
  { key: "ambient", load: loadAmbientPreset },
  { key: "big-circles", load: loadBigCirclesPreset },
  { key: "bubbles", load: loadBubblesPreset },
  { key: "confetti", load: loadConfettiPreset },
  { key: "confetti-cannon", load: loadConfettiCannonPreset },
  { key: "confetti-explosions", load: loadConfettiExplosionsPreset },
  { key: "confetti-falling", load: loadConfettiFallingPreset },
  { key: "confetti-parade", load: loadConfettiParadePreset },
  { key: "fire", load: loadFirePreset },
  { key: "firefly", load: loadFireflyPreset },
  { key: "fireworks", load: loadFireworksPreset },
  { key: "fountain", load: loadFountainPreset },
  { key: "hyperspace", load: loadHyperspacePreset },
  { key: "links", load: loadLinksPreset },
  { key: "matrix", load: loadMatrixPreset },
  { key: "meteors", load: loadMeteorsPreset },
  { key: "party", load: loadPartyPreset },
  { key: "seaAnemone", load: loadSeaAnemonePreset },
  { key: "snow", load: loadSnowPreset },
  { key: "squares", load: loadSquaresPreset },
  { key: "stars", load: loadStarsPreset },
  { key: "triangles", load: loadTrianglesPreset },
];

describe("Presets sweep", async () => {
  globalThis.window = TestWindow;

  it("registers a preset for every published preset package", async () => {
    for (const { load } of presets) {
      await load(tsParticles);
    }

    const boot = (await tsParticles.load({
      id: "preset-boot",
      options: {},
      autoPlay: false,
      element: createCustomCanvas(100, 100) as unknown as HTMLCanvasElement,
    })) as Container | undefined;

    boot?.destroy(false);

    for (const { key } of presets) {
      expect(tsParticles.pluginManager.presets.has(key), `preset ${key} not registered`).to.be.true;
    }
  }, 180000);

  it("every preset loads a container without throwing", async () => {
    let index = 0,
      positives = 0;

    for (const { key } of presets) {
      const options = tsParticles.pluginManager.presets.get(key);

      expect(options, `preset ${key} options missing`).to.not.be.undefined;

      const container = (await tsParticles.load({
        id: `preset-smoke-${String(index)}`,
        options: { preset: key },
        autoPlay: false,
        element: createCustomCanvas(800, 600) as unknown as HTMLCanvasElement,
      })) as Container | undefined;

      index += 1;

      expect(container, `preset ${key} did not load`).to.not.be.undefined;

      if (!container) {
        continue;
      }

      const count = configuredCount(options as ISourceOptions);

      if (count !== undefined && count > 0) {
        positives += 1;
        expect(container.particles.count, `preset ${key} created no particles`).to.be.greaterThan(0);
      }

      container.destroy(false);
    }

    expect(index, "no presets were loaded").to.equal(presets.length);
    expect(positives, "presets with a configured positive count").to.be.greaterThan(0);
  }, 180000);
});

const rangeValue = new Set(["max", "min"]);

function configuredCount(options: ISourceOptions): number | undefined {
  const raw = (options.particles as Record<string, unknown> | undefined)?.number as Record<string, unknown> | undefined,
    value = raw?.value;

  if (typeof value === "number") {
    return value;
  }

  if (value && typeof value === "object") {
    for (const entry of rangeValue) {
      const member = (value as Record<string, unknown>)[entry];

      if (typeof member === "number") {
        return member;
      }
    }
  }

  return undefined;
}
