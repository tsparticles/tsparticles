export * from "@tsparticles/engine";
import { loadAll } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadAll } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadAll?: typeof loadAll;
  tsParticles?: typeof tsParticles;
};

globalObject.loadAll = loadAll;

globalObject.tsParticles = tsParticles;
