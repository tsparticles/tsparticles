import { loadConfettiGoldPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiGoldPalette?: typeof loadConfettiGoldPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadConfettiGoldPalette = loadConfettiGoldPalette;

export * from "./index.js";
