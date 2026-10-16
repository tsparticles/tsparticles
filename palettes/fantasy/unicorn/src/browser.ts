import { loadUnicornPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadUnicornPalette?: typeof loadUnicornPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadUnicornPalette = loadUnicornPalette;

export * from "./index.js";
