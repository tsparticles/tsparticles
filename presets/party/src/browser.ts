import { loadPartyPreset } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPartyPreset?: typeof loadPartyPreset;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadPartyPreset = loadPartyPreset;

export * from "./index.js";
