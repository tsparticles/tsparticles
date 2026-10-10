import { initPjs } from "./index.js";
import { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  initPjs?: typeof initPjs;
  tsParticles?: typeof tsParticles;
};

globalObject.initPjs = initPjs;
globalObject.tsParticles = tsParticles;

export * from "@tsparticles/engine";
export { initPjs } from "./index.js";
