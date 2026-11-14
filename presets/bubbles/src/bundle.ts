import { createEngine } from "@tsparticles/engine";
import { loadBubblesPreset } from "./index.js";
export { loadBubblesPreset } from "./index.js";
export { createEngine };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBubblesPreset?: typeof loadBubblesPreset;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadBubblesPreset = loadBubblesPreset;

globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };
