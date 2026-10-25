import { loadExplosionDebrisPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadExplosionDebrisPalette?: typeof loadExplosionDebrisPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadExplosionDebrisPalette = loadExplosionDebrisPalette;

export * from "./index.js";
