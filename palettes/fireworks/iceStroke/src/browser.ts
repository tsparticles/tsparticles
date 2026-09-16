import { loadFireworksIceStrokePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksIceStrokePalette?: typeof loadFireworksIceStrokePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksIceStrokePalette = loadFireworksIceStrokePalette;

export * from "./index.js";
