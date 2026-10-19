import { loadConfettiWinterPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiWinterPalette?: typeof loadConfettiWinterPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadConfettiWinterPalette = loadConfettiWinterPalette;

export * from "./index.js";
