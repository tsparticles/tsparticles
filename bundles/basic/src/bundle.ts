import { createEngine } from "@tsparticles/engine";
import { loadBasic } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBasic?: typeof loadBasic;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadBasic = loadBasic;
globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };

export { loadBasic } from "./index.js";
export * from "@tsparticles/engine";
