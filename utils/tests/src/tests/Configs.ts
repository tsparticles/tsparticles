/* eslint-disable */
import { type Container, type ISourceOptions, tsParticles } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import configs from "@tsparticles/configs";

const configKeys = Object.keys(configs as Record<string, ISourceOptions>);

/**
 * Returns the numeric particle count configured in a preset, if any.
 * @param options - The preset options
 * @returns the configured count or undefined
 */
function configuredCount(options: ISourceOptions): number | undefined {
  const value = (options.particles as Record<string, any> | undefined)?.number?.value;

  return typeof value === "number" ? value : undefined;
}

describe("Configs sweep", async () => {
  globalThis.window = TestWindow;

  it("exposes a non-empty catalog of presets", () => {
    expect(configKeys.length).to.be.greaterThan(0);
  });

  it("every preset is a plain options object", () => {
    for (const key of configKeys) {
      const config = (configs as Record<string, ISourceOptions>)[key];

      expect(config, `preset ${key} missing`).to.not.be.undefined;
      expect(typeof config, `preset ${key} not an object`).to.equal("object");
    }
  });

  it("every preset loads through the engine without throwing", async () => {
    let positives = 0,
      zeroes = 0,
      missing = 0,
      index = 0;

    for (const key of configKeys) {
      const config = (configs as Record<string, ISourceOptions>)[key];

      if (!config) {
        continue;
      }

      const container = (await tsParticles.load({
        id: `config-${String(index)}`,
        options: config,
        autoPlay: false,
        element: createCustomCanvas(800, 600) as unknown as HTMLCanvasElement,
      })) as Container | undefined;

      index += 1;

      expect(container, `preset ${key} did not load`).to.not.be.undefined;

      if (!container) {
        continue;
      }

      const count = configuredCount(config);

      if (count === undefined) {
        missing += 1;
      } else if (count > 0) {
        positives += 1;

        expect(container.particles.count, `preset ${key} created no particles`).to.be.greaterThan(0);
      } else {
        zeroes += 1;
      }

      container.destroy(false);
    }

    expect(index, "no presets were loaded").to.be.greaterThan(0);
    expect(positives, "presets with a positive count").to.be.greaterThan(0);
    expect(zeroes + positives + missing).to.equal(configKeys.length);
  }, 120000);
});
