import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSlim?: typeof loadSlim;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadSlim = loadSlim;
globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };

export { loadSlim } from "./index.js";
export * from "@tsparticles/engine";
