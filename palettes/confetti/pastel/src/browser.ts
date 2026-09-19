import { loadConfettiPastelPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiPastelPalette?: typeof loadConfettiPastelPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadConfettiPastelPalette = loadConfettiPastelPalette;

export * from "./index.js";
