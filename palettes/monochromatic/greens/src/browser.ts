import { loadMonochromeGreensPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMonochromeGreensPalette?: typeof loadMonochromeGreensPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMonochromeGreensPalette = loadMonochromeGreensPalette;

export * from "./index.js";
