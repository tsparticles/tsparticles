import { loadPlasmaArcPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPlasmaArcPalette?: typeof loadPlasmaArcPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadPlasmaArcPalette = loadPlasmaArcPalette;

export * from "./index.js";
