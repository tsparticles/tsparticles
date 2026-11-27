import { createEngine } from "@tsparticles/engine";
import { loadHyperspacePreset } from "./index.js";
export { loadHyperspacePreset } from "./index.js";
export { createEngine };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadHyperspacePreset?: typeof loadHyperspacePreset;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadHyperspacePreset = loadHyperspacePreset;

globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };
