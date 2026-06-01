import { loadConfettiPreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadConfettiPreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiPreset?: typeof loadConfettiPreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadConfettiPreset = loadConfettiPreset;

globalObject.tsParticles = tsParticles;
