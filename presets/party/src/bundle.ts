import { createEngine } from "@tsparticles/engine";
import { loadPartyPreset } from "./index.js";
export { loadPartyPreset } from "./index.js";
export { createEngine };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPartyPreset?: typeof loadPartyPreset;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadPartyPreset = loadPartyPreset;

globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };
