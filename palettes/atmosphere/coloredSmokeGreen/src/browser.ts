import { loadColoredSmokeGreenPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadColoredSmokeGreenPalette?: typeof loadColoredSmokeGreenPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadColoredSmokeGreenPalette = loadColoredSmokeGreenPalette;

export * from "./index.js";
