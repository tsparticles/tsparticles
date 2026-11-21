import { createEngine } from "@tsparticles/engine";
import { loadSquaresPreset } from "./index.js";
export { loadSquaresPreset } from "./index.js";
export { createEngine };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSquaresPreset?: typeof loadSquaresPreset;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadSquaresPreset = loadSquaresPreset;

globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };
