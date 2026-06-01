export * from "@tsparticles/engine";
import { loadFull } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadFull } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFull?: typeof loadFull;
  tsParticles?: typeof tsParticles;
};

globalObject.loadFull = loadFull;

globalObject.tsParticles = tsParticles;
