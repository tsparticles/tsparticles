import { loadFireworksPastelPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksPastelPalette?: typeof loadFireworksPastelPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksPastelPalette = loadFireworksPastelPalette;

export * from "./index.js";
