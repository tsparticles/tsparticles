import { loadMonochromeBluesPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMonochromeBluesPalette?: typeof loadMonochromeBluesPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMonochromeBluesPalette = loadMonochromeBluesPalette;

export * from "./index.js";
