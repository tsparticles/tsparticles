import { loadSquaresPreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadSquaresPreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSquaresPreset?: typeof loadSquaresPreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadSquaresPreset = loadSquaresPreset;

globalObject.tsParticles = tsParticles;
