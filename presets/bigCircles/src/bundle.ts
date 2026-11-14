import { createEngine } from "@tsparticles/engine";
import { loadBigCirclesPreset } from "./index.js";
export { loadBigCirclesPreset } from "./index.js";
export { createEngine };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBigCirclesPreset?: typeof loadBigCirclesPreset;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadBigCirclesPreset = loadBigCirclesPreset;

globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };
