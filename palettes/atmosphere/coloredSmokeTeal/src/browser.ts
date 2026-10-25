import { loadColoredSmokeTealPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadColoredSmokeTealPalette?: typeof loadColoredSmokeTealPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadColoredSmokeTealPalette = loadColoredSmokeTealPalette;

export * from "./index.js";
