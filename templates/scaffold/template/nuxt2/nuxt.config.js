export default {
  // Nuxt 2 ships webpack 4, which predates the "exports" field of package.json.
  // The tsParticles v4 packages expose their entry points through "exports",
  // so deep imports such as "@tsparticles/plugin-emitters/plugin" need an
  // explicit alias to the CommonJS file shipped by each package.
  build: {
    transpile: [/@tsparticles\//, "tsparticles"],
    // Webpack 4 cannot parse the logical assignment operators shipped by the
    // tsParticles v4 builds, so they are transpiled down to the configured
    // browserslist targets.
    babel: {
      presets: [["@babel/preset-env", { targets: { chrome: "58", edge: "16", firefox: "57", safari: "11" } }]],
    },
    extend(config) {
      config.resolve.alias["@tsparticles/engine/lazy"] = "@tsparticles/engine/cjs/index.lazy.js";
      config.resolve.alias["@tsparticles/plugin-emitters/plugin"] = "@tsparticles/plugin-emitters/cjs/plugin.js";
      config.resolve.alias["@tsparticles/shape-cards/suits"] = "@tsparticles/shape-cards/cjs/suits.js";
    },
  },
  modules: ["@tsparticles/nuxt2"],
};
