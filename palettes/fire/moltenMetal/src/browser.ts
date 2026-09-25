import { loadMoltenMetalPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMoltenMetalPalette?: typeof loadMoltenMetalPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMoltenMetalPalette = loadMoltenMetalPalette;

export * from "./index.js";
