import { loadAll } from "./index.js";
import { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadAll?: typeof loadAll;
  tsParticles?: typeof tsParticles;
};

globalObject.loadAll = loadAll;
globalObject.tsParticles = tsParticles;

export { loadAll } from "./index.js";
export * from "@tsparticles/engine";
