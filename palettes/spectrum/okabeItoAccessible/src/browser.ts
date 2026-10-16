import { loadOkabeItoAccessiblePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadOkabeItoAccessiblePalette?: typeof loadOkabeItoAccessiblePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadOkabeItoAccessiblePalette = loadOkabeItoAccessiblePalette;

export * from "./index.js";
