import { loadSnowPreset } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSnowPreset?: typeof loadSnowPreset;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSnowPreset = loadSnowPreset;

export * from "./index.js";
