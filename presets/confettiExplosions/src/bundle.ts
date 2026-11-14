import { createEngine } from "@tsparticles/engine";
import { loadConfettiExplosionsPreset } from "./index.js";
export { loadConfettiExplosionsPreset } from "./index.js";
export { createEngine };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiExplosionsPreset?: typeof loadConfettiExplosionsPreset;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadConfettiExplosionsPreset = loadConfettiExplosionsPreset;

globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };
