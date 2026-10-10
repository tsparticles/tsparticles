import { loadMudAndDirtPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMudAndDirtPalette?: typeof loadMudAndDirtPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMudAndDirtPalette = loadMudAndDirtPalette;

export * from "./index.js";
