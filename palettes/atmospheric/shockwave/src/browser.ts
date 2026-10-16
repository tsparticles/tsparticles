import { loadShockwavePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadShockwavePalette?: typeof loadShockwavePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadShockwavePalette = loadShockwavePalette;

export * from "./index.js";
