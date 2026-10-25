import { loadPulsarPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPulsarPalette?: typeof loadPulsarPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadPulsarPalette = loadPulsarPalette;

export * from "./index.js";
