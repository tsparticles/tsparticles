import { loadThunderstormPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadThunderstormPalette?: typeof loadThunderstormPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadThunderstormPalette = loadThunderstormPalette;

export * from "./index.js";
