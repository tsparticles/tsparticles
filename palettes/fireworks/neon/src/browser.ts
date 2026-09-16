import { loadFireworksNeonPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksNeonPalette?: typeof loadFireworksNeonPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksNeonPalette = loadFireworksNeonPalette;

export * from "./index.js";
