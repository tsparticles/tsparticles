import { createEngine } from "@tsparticles/engine";
import { loadFull } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFull?: typeof loadFull;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadFull = loadFull;
globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };

export { loadFull } from "./index.js";
export * from "@tsparticles/engine";
