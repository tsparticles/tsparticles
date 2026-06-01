import { loadAmbientPreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadAmbientPreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadAmbientPreset?: typeof loadAmbientPreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadAmbientPreset = loadAmbientPreset;

globalObject.tsParticles = tsParticles;
