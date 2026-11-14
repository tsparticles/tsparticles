import { createEngine } from "@tsparticles/engine";
import { loadConfettiFallingPreset } from "./index.js";
export { loadConfettiFallingPreset } from "./index.js";
export { createEngine };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiFallingPreset?: typeof loadConfettiFallingPreset;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadConfettiFallingPreset = loadConfettiFallingPreset;

globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };
