import { createEngine } from "@tsparticles/engine";
import { loadMatrixPreset } from "./index.js";
export { loadMatrixPreset } from "./index.js";
export { createEngine };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMatrixPreset?: typeof loadMatrixPreset;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadMatrixPreset = loadMatrixPreset;

globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };
