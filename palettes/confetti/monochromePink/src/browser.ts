import { loadConfettiMonochromePinkPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiMonochromePinkPalette?: typeof loadConfettiMonochromePinkPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadConfettiMonochromePinkPalette = loadConfettiMonochromePinkPalette;

export * from "./index.js";
