import { loadConfettiRainbowPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiRainbowPalette?: typeof loadConfettiRainbowPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadConfettiRainbowPalette = loadConfettiRainbowPalette;

export * from "./index.js";
