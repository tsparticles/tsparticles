import { createEngine } from "@tsparticles/engine";
import { loadFountainPreset } from "./index.js";
export { loadFountainPreset } from "./index.js";
export { createEngine };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFountainPreset?: typeof loadFountainPreset;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadFountainPreset = loadFountainPreset;

globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };
