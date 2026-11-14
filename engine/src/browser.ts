import { createEngine } from "./createEngine.js";

const globalObject = globalThis as typeof globalThis & {
  tsParticles?: { createEngine: typeof createEngine };
};

/** Classic scripts expose definitions only; applications create their engines. */
globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };

export * from "./index.js";
