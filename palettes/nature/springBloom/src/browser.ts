import { loadSpringBloomPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSpringBloomPalette?: typeof loadSpringBloomPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSpringBloomPalette = loadSpringBloomPalette;

export * from "./index.js";
