import { loadAppleRedPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadAppleRedPalette?: typeof loadAppleRedPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadAppleRedPalette = loadAppleRedPalette;

export * from "./index.js";
