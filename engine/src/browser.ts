import * as engineExports from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  tsParticles?: typeof engineExports;
};

/** Classic scripts expose engine definitions only; applications create instances. */
globalObject.tsParticles = { ...globalObject.tsParticles, ...engineExports };

export * from "./index.js";
