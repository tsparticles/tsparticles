import { loadEmbersAndAshPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEmbersAndAshPalette?: typeof loadEmbersAndAshPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadEmbersAndAshPalette = loadEmbersAndAshPalette;

export * from "./index.js";
