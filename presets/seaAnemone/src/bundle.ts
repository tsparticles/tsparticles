import { createEngine } from "@tsparticles/engine";
import { loadSeaAnemonePreset } from "./index.js";
export { loadSeaAnemonePreset } from "./index.js";
export { createEngine };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSeaAnemonePreset?: typeof loadSeaAnemonePreset;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadSeaAnemonePreset = loadSeaAnemonePreset;

globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };
