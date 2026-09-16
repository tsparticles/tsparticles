import { loadCandlelightPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadCandlelightPalette?: typeof loadCandlelightPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadCandlelightPalette = loadCandlelightPalette;

export * from "./index.js";
