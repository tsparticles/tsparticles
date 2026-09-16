import { loadBubblesPreset } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBubblesPreset?: typeof loadBubblesPreset;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadBubblesPreset = loadBubblesPreset;

export * from "./index.js";
