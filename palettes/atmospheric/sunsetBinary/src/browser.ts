import { loadSunsetBinaryPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSunsetBinaryPalette?: typeof loadSunsetBinaryPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSunsetBinaryPalette = loadSunsetBinaryPalette;

export * from "./index.js";
