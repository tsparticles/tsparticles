import { loadSquaresPreset } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSquaresPreset?: typeof loadSquaresPreset;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSquaresPreset = loadSquaresPreset;

export * from "./index.js";
