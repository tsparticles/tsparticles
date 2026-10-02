import { loadGlitchPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadGlitchPalette?: typeof loadGlitchPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadGlitchPalette = loadGlitchPalette;

export * from "./index.js";
