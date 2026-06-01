import { loadBubblesPreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadBubblesPreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBubblesPreset?: typeof loadBubblesPreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadBubblesPreset = loadBubblesPreset;

globalObject.tsParticles = tsParticles;
