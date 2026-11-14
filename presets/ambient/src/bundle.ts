import { createEngine } from "@tsparticles/engine";
import { loadAmbientPreset } from "./index.js";
export { loadAmbientPreset } from "./index.js";
export { createEngine };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadAmbientPreset?: typeof loadAmbientPreset;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadAmbientPreset = loadAmbientPreset;

globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };
