import { loadVibrantRetroPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadVibrantRetroPalette?: typeof loadVibrantRetroPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadVibrantRetroPalette = loadVibrantRetroPalette;

export * from "./index.js";
