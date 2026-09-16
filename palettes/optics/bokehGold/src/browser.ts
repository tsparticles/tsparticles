import { loadBokehGoldPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBokehGoldPalette?: typeof loadBokehGoldPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadBokehGoldPalette = loadBokehGoldPalette;

export * from "./index.js";
