import { loadMonochromeYellowsPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMonochromeYellowsPalette?: typeof loadMonochromeYellowsPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMonochromeYellowsPalette = loadMonochromeYellowsPalette;

export * from "./index.js";
