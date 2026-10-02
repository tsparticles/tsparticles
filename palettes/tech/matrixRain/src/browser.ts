import { loadMatrixRainPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMatrixRainPalette?: typeof loadMatrixRainPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMatrixRainPalette = loadMatrixRainPalette;

export * from "./index.js";
