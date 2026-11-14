import { createEngine } from "@tsparticles/engine";
import { initPjs } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  initPjs?: typeof initPjs;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.initPjs = initPjs;
globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };

export * from "@tsparticles/engine";
export { initPjs } from "./index.js";
