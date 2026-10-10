import { loadLaserScatterPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadLaserScatterPalette?: typeof loadLaserScatterPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadLaserScatterPalette = loadLaserScatterPalette;

export * from "./index.js";
