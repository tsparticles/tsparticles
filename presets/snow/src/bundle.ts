import { loadSnowPreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadSnowPreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSnowPreset?: typeof loadSnowPreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadSnowPreset = loadSnowPreset;

globalObject.tsParticles = tsParticles;
