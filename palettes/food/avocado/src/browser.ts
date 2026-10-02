import { loadAvocadoPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadAvocadoPalette?: typeof loadAvocadoPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadAvocadoPalette = loadAvocadoPalette;

export * from "./index.js";
