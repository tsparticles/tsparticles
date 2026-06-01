import { loadPartyPreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadPartyPreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPartyPreset?: typeof loadPartyPreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadPartyPreset = loadPartyPreset;

globalObject.tsParticles = tsParticles;
