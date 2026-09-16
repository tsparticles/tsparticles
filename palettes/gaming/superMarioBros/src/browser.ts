import { loadSuperMarioBrosPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSuperMarioBrosPalette?: typeof loadSuperMarioBrosPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSuperMarioBrosPalette = loadSuperMarioBrosPalette;

export * from "./index.js";
