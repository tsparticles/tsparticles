import { loadFireworksRainbowPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksRainbowPalette?: typeof loadFireworksRainbowPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksRainbowPalette = loadFireworksRainbowPalette;

export * from "./index.js";
