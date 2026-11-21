import { createEngine } from "@tsparticles/engine";
import { loadFirePreset } from "./index.js";
export { loadFirePreset } from "./index.js";
export { createEngine };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFirePreset?: typeof loadFirePreset;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadFirePreset = loadFirePreset;

globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };
