import { loadMonochromeWhitePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMonochromeWhitePalette?: typeof loadMonochromeWhitePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMonochromeWhitePalette = loadMonochromeWhitePalette;

export * from "./index.js";
