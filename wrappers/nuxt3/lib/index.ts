import { addPlugin, addTemplate, defineNuxtModule } from "@nuxt/kit";
import type { NuxtModule } from "@nuxt/schema";

export interface ITsParticlesNuxtOptions {
  initPath?: string;
}

declare module "@nuxt/schema" {
  interface NuxtConfig {
    tsparticles?: ITsParticlesNuxtOptions;
  }

  interface NuxtOptions {
    tsparticles?: ITsParticlesNuxtOptions;
  }
}

const tsParticlesNuxtModule: NuxtModule<ITsParticlesNuxtOptions> = defineNuxtModule<ITsParticlesNuxtOptions>({
  meta: {
    name: "@tsparticles/nuxt3",
    configKey: "tsparticles",
    compatibility: {
      nuxt: ">=3.0.0",
    },
  },
  defaults: {
    initPath: "~/utils/particlesInit",
  },
  setup(options) {
    const initPath = options.initPath ?? "~/utils/particlesInit";

    const pluginPath = addTemplate({
      filename: "tsparticles.client.mjs",
      getContents: () => `import { defineNuxtPlugin } from "#app";
import VueParticles from "@tsparticles/vue3";
import { registerParticles } from "${initPath}";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueParticles, {
    init: registerParticles,
  });
});
`,
    }).dst;

    addPlugin({
      src: pluginPath,
      mode: "client",
    });
  },
});

export default tsParticlesNuxtModule;
