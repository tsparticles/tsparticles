import { loadMetalSparksPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMetalSparksPalette?: typeof loadMetalSparksPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMetalSparksPalette = loadMetalSparksPalette;

export * from "./index.js";
