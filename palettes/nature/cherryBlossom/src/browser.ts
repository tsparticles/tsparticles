import { loadCherryBlossomPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadCherryBlossomPalette?: typeof loadCherryBlossomPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadCherryBlossomPalette = loadCherryBlossomPalette;

export * from "./index.js";
