import { loadColoredSmokeAmberPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadColoredSmokeAmberPalette?: typeof loadColoredSmokeAmberPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadColoredSmokeAmberPalette = loadColoredSmokeAmberPalette;

export * from "./index.js";
