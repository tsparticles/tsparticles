import { loadHyperspacePreset } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadHyperspacePreset?: typeof loadHyperspacePreset;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadHyperspacePreset = loadHyperspacePreset;

export * from "./index.js";
