import { loadMonochromeOrangesPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMonochromeOrangesPalette?: typeof loadMonochromeOrangesPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMonochromeOrangesPalette = loadMonochromeOrangesPalette;

export * from "./index.js";
