import { loadSlim } from "./index.js";
import { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSlim?: typeof loadSlim;
  tsParticles?: typeof tsParticles;
};

globalObject.loadSlim = loadSlim;
globalObject.tsParticles = tsParticles;

export { loadSlim } from "./index.js";
export * from "@tsparticles/engine";
