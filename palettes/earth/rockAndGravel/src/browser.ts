import { loadRockAndGravelPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadRockAndGravelPalette?: typeof loadRockAndGravelPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadRockAndGravelPalette = loadRockAndGravelPalette;

export * from "./index.js";
