import { createEngine } from "@tsparticles/engine";
import { loadConfettiParadePreset } from "./index.js";
export { loadConfettiParadePreset } from "./index.js";
export { createEngine };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiParadePreset?: typeof loadConfettiParadePreset;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadConfettiParadePreset = loadConfettiParadePreset;

globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };
