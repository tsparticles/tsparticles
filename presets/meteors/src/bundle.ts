import { tsParticles } from "@tsparticles/engine";

import { loadMeteorsPreset } from "./index.js";
export { loadMeteorsPreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMeteorsPreset?: typeof loadMeteorsPreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadMeteorsPreset = loadMeteorsPreset;

globalObject.tsParticles = tsParticles;
