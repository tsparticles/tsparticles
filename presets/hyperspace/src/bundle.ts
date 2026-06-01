import { loadHyperspacePreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadHyperspacePreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadHyperspacePreset?: typeof loadHyperspacePreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadHyperspacePreset = loadHyperspacePreset;

globalObject.tsParticles = tsParticles;
