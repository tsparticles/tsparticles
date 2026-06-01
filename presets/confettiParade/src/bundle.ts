import { loadConfettiParadePreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadConfettiParadePreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiParadePreset?: typeof loadConfettiParadePreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadConfettiParadePreset = loadConfettiParadePreset;

globalObject.tsParticles = tsParticles;
