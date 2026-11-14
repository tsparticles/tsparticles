import { createFireworks } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  createFireworks?: typeof createFireworks;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.createFireworks = createFireworks;

export * from "./index.js";
