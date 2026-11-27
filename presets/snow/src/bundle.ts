import { createEngine } from "@tsparticles/engine";
import { loadSnowPreset } from "./index.js";
export { loadSnowPreset } from "./index.js";
export { createEngine };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSnowPreset?: typeof loadSnowPreset;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadSnowPreset = loadSnowPreset;

globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };
