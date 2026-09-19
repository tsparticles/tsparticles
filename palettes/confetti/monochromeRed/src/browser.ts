import { loadConfettiMonochromeRedPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiMonochromeRedPalette?: typeof loadConfettiMonochromeRedPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadConfettiMonochromeRedPalette = loadConfettiMonochromeRedPalette;

export * from "./index.js";
