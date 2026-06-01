import { loadBigCirclesPreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadBigCirclesPreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBigCirclesPreset?: typeof loadBigCirclesPreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadBigCirclesPreset = loadBigCirclesPreset;

globalObject.tsParticles = tsParticles;
