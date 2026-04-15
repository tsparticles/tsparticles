import type { Module } from "@nuxt/types";
import { resolve } from "node:path";

interface ITsParticlesNuxt2Options {
  initPath?: string;
}

const tsparticlesNuxt2Module = function (this, moduleOptions: ITsParticlesNuxt2Options = {}): void {
  const nuxtOptions = (this.options as { tsparticles?: ITsParticlesNuxt2Options }).tsparticles ?? {};
  const initPath = moduleOptions.initPath ?? nuxtOptions.initPath ?? "~/utils/particlesInit";

  this.addPlugin({
    src: resolve(__dirname, "plugin.js"),
    fileName: "tsparticles.client.js",
    mode: "client",
    options: {
      initPath,
    },
  });
} as Module<ITsParticlesNuxt2Options> & {
  meta: {
    name: string;
    configKey: string;
  };
};

tsparticlesNuxt2Module.meta = {
  name: "@tsparticles/nuxt2",
  configKey: "tsparticles",
};

export = tsparticlesNuxt2Module;
