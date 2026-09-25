import { loadDandelionSeedsPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadDandelionSeedsPalette?: typeof loadDandelionSeedsPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadDandelionSeedsPalette = loadDandelionSeedsPalette;

export * from "./index.js";
