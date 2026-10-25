import { loadLavaLampPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadLavaLampPalette?: typeof loadLavaLampPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadLavaLampPalette = loadLavaLampPalette;

export * from "./index.js";
