import { loadConfettiMonochromeGreenPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiMonochromeGreenPalette?: typeof loadConfettiMonochromeGreenPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadConfettiMonochromeGreenPalette = loadConfettiMonochromeGreenPalette;

export * from "./index.js";
