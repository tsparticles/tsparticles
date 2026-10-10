import { loadFireworksPastelStrokePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksPastelStrokePalette?: typeof loadFireworksPastelStrokePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksPastelStrokePalette = loadFireworksPastelStrokePalette;

export * from "./index.js";
