import { loadSteakPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSteakPalette?: typeof loadSteakPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSteakPalette = loadSteakPalette;

export * from "./index.js";
