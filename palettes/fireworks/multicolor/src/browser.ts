import { loadFireworksMulticolorPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksMulticolorPalette?: typeof loadFireworksMulticolorPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksMulticolorPalette = loadFireworksMulticolorPalette;

export * from "./index.js";
