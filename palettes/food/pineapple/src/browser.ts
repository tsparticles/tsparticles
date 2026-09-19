import { loadPineapplePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPineapplePalette?: typeof loadPineapplePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadPineapplePalette = loadPineapplePalette;

export * from "./index.js";
