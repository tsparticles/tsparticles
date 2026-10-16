import { loadPastelCoolPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPastelCoolPalette?: typeof loadPastelCoolPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadPastelCoolPalette = loadPastelCoolPalette;

export * from "./index.js";
