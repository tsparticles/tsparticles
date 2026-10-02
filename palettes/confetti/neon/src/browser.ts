import { loadConfettiNeonPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiNeonPalette?: typeof loadConfettiNeonPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadConfettiNeonPalette = loadConfettiNeonPalette;

export * from "./index.js";
