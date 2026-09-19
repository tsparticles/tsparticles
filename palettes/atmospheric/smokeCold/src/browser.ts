import { loadSmokeColdPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSmokeColdPalette?: typeof loadSmokeColdPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSmokeColdPalette = loadSmokeColdPalette;

export * from "./index.js";
