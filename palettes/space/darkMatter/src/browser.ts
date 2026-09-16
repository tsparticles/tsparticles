import { loadDarkMatterPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadDarkMatterPalette?: typeof loadDarkMatterPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadDarkMatterPalette = loadDarkMatterPalette;

export * from "./index.js";
