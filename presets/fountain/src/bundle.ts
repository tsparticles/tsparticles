import { loadFountainPreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadFountainPreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFountainPreset?: typeof loadFountainPreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadFountainPreset = loadFountainPreset;

globalObject.tsParticles = tsParticles;
