import { createEngine } from "@tsparticles/engine";
import { loadConfettiPreset } from "./index.js";
export { loadConfettiPreset } from "./index.js";
export { createEngine };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiPreset?: typeof loadConfettiPreset;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadConfettiPreset = loadConfettiPreset;

globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };
