import { loadRainbowPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadRainbowPalette?: typeof loadRainbowPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadRainbowPalette = loadRainbowPalette;

export * from "./index.js";
