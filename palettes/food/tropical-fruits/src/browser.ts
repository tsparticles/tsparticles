import { loadTropicalFruitsPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadTropicalFruitsPalette?: typeof loadTropicalFruitsPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadTropicalFruitsPalette = loadTropicalFruitsPalette;

export * from "./index.js";
