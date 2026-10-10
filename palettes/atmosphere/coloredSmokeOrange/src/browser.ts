import { loadColoredSmokeOrangePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadColoredSmokeOrangePalette?: typeof loadColoredSmokeOrangePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadColoredSmokeOrangePalette = loadColoredSmokeOrangePalette;

export * from "./index.js";
