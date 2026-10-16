import { loadFireworksRainbowStrokePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksRainbowStrokePalette?: typeof loadFireworksRainbowStrokePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksRainbowStrokePalette = loadFireworksRainbowStrokePalette;

export * from "./index.js";
