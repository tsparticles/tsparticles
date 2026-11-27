import { createEngine } from "@tsparticles/engine";
import { loadConfettiCannonPreset } from "./index.js";
export { loadConfettiCannonPreset } from "./index.js";
export { createEngine };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiCannonPreset?: typeof loadConfettiCannonPreset;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadConfettiCannonPreset = loadConfettiCannonPreset;

globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };
