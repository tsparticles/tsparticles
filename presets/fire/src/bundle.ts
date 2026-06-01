import { loadFirePreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadFirePreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFirePreset?: typeof loadFirePreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadFirePreset = loadFirePreset;

globalObject.tsParticles = tsParticles;
