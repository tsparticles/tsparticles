import { loadConfettiCannonPreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadConfettiCannonPreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiCannonPreset?: typeof loadConfettiCannonPreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadConfettiCannonPreset = loadConfettiCannonPreset;

globalObject.tsParticles = tsParticles;
