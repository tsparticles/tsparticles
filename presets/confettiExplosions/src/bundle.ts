import { loadConfettiExplosionsPreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadConfettiExplosionsPreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiExplosionsPreset?: typeof loadConfettiExplosionsPreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadConfettiExplosionsPreset = loadConfettiExplosionsPreset;

globalObject.tsParticles = tsParticles;
