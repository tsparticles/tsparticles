import { loadMatrixPreset } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMatrixPreset?: typeof loadMatrixPreset;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMatrixPreset = loadMatrixPreset;

export * from "./index.js";
