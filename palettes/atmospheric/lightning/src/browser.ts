import { loadLightningPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadLightningPalette?: typeof loadLightningPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadLightningPalette = loadLightningPalette;

export * from "./index.js";
