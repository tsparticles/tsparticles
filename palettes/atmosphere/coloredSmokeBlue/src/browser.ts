import { loadColoredSmokeBluePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadColoredSmokeBluePalette?: typeof loadColoredSmokeBluePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadColoredSmokeBluePalette = loadColoredSmokeBluePalette;

export * from "./index.js";
