import { loadMatrixPreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadMatrixPreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMatrixPreset?: typeof loadMatrixPreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadMatrixPreset = loadMatrixPreset;

globalObject.tsParticles = tsParticles;
