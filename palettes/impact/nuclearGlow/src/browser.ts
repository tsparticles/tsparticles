import { loadNuclearGlowPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadNuclearGlowPalette?: typeof loadNuclearGlowPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadNuclearGlowPalette = loadNuclearGlowPalette;

export * from "./index.js";
