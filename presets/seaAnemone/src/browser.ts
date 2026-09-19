import { loadSeaAnemonePreset } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSeaAnemonePreset?: typeof loadSeaAnemonePreset;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSeaAnemonePreset = loadSeaAnemonePreset;

export * from "./index.js";
