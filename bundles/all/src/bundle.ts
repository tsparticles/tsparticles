import { createEngine } from "@tsparticles/engine";
import { loadAll } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadAll?: typeof loadAll;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadAll = loadAll;
globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };

export { loadAll } from "./index.js";
export * from "@tsparticles/engine";
