import { loadPizzaPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPizzaPalette?: typeof loadPizzaPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadPizzaPalette = loadPizzaPalette;

export * from "./index.js";
