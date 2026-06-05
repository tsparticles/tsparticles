import { loadMeteorsPreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadMeteorsPreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMeteorsPreset?: typeof loadMeteorsPreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadMeteorsPreset = loadMeteorsPreset;

globalObject.tsParticles = tsParticles;
