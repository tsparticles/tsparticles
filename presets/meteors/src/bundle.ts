import { createEngine } from "@tsparticles/engine";
import { loadMeteorsPreset } from "./index.js";
export { loadMeteorsPreset } from "./index.js";
export { createEngine };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMeteorsPreset?: typeof loadMeteorsPreset;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadMeteorsPreset = loadMeteorsPreset;

globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };
