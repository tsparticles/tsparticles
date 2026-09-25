import { loadFireworksBlueStrokePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksBlueStrokePalette?: typeof loadFireworksBlueStrokePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksBlueStrokePalette = loadFireworksBlueStrokePalette;

export * from "./index.js";
