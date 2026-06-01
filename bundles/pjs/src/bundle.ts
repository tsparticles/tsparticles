export * from "@tsparticles/engine";
import { initPjs } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { initPjs } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  initPjs?: typeof initPjs;
  tsParticles?: typeof tsParticles;
};

globalObject.initPjs = initPjs;

globalObject.tsParticles = tsParticles;
