/* eslint-disable */
import { type Container, tsParticles } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { loadAll } from "@tsparticles/all";
import { loadBasic } from "@tsparticles/basic";
import { loadSlim } from "@tsparticles/slim";
import { initPjs } from "@tsparticles/pjs";

const bundleOptions = {
  fullScreen: {
    enable: false,
  },
  particles: {
    number: {
      value: 5,
    },
  },
};

describe("Bundles sweep", async () => {
  globalThis.window = TestWindow;

  it("registers basic, slim, all and pjs bundles, then loads containers", async () => {
    await loadBasic(tsParticles);
    await loadSlim(tsParticles);
    await loadAll(tsParticles);
    await initPjs(tsParticles);

    const boot = (await tsParticles.load({
      id: "bundles-boot",
      options: {},
      autoPlay: false,
      element: createCustomCanvas(100, 100) as unknown as HTMLCanvasElement,
    })) as Container | undefined;

    boot?.destroy(false);

    for (const prefix of ["basic", "slim", "all"]) {
      const container = (await tsParticles.load({
        id: `bundle-${prefix}`,
        options: bundleOptions,
        autoPlay: false,
        element: createCustomCanvas(800, 600) as unknown as HTMLCanvasElement,
      })) as Container | undefined;

      expect(container, `bundle ${prefix} did not load`).to.not.be.undefined;
      expect(container?.particles.count, `bundle ${prefix} created no particles`).to.equal(5);

      container?.destroy(false);
    }

    expect(globalThis.particlesJS, "particles.js compatibility missing").to.not.be.undefined;
    expect(Array.isArray(globalThis.pJSDom)).to.be.true;
    expect(globalThis.Particles).to.not.be.undefined;
  }, 180000);
});
