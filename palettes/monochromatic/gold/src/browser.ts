import { loadMonochromeGoldPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMonochromeGoldPalette?: typeof loadMonochromeGoldPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMonochromeGoldPalette = loadMonochromeGoldPalette;

export * from "./index.js";
