import { loadFireworksMulticolorStrokePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksMulticolorStrokePalette?: typeof loadFireworksMulticolorStrokePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksMulticolorStrokePalette = loadFireworksMulticolorStrokePalette;

export * from "./index.js";
