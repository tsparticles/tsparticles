import { loadDesertSandPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadDesertSandPalette?: typeof loadDesertSandPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadDesertSandPalette = loadDesertSandPalette;

export * from "./index.js";
