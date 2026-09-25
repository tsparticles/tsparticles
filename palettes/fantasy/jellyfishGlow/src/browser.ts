import { loadJellyfishGlowPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadJellyfishGlowPalette?: typeof loadJellyfishGlowPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadJellyfishGlowPalette = loadJellyfishGlowPalette;

export * from "./index.js";
