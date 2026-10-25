import { loadMonochromeNoirPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMonochromeNoirPalette?: typeof loadMonochromeNoirPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMonochromeNoirPalette = loadMonochromeNoirPalette;

export * from "./index.js";
