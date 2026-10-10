import { loadBloodAndGorePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBloodAndGorePalette?: typeof loadBloodAndGorePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadBloodAndGorePalette = loadBloodAndGorePalette;

export * from "./index.js";
