import { loadLagoonPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadLagoonPalette?: typeof loadLagoonPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadLagoonPalette = loadLagoonPalette;

export * from "./index.js";
