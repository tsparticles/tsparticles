import { loadSushiPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSushiPalette?: typeof loadSushiPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSushiPalette = loadSushiPalette;

export * from "./index.js";
