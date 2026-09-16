import { loadBokehColdPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBokehColdPalette?: typeof loadBokehColdPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadBokehColdPalette = loadBokehColdPalette;

export * from "./index.js";
