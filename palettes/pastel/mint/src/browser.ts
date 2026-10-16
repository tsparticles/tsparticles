import { loadPastelMintPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPastelMintPalette?: typeof loadPastelMintPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadPastelMintPalette = loadPastelMintPalette;

export * from "./index.js";
