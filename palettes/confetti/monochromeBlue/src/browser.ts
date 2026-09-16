import { loadConfettiMonochromeBluePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiMonochromeBluePalette?: typeof loadConfettiMonochromeBluePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadConfettiMonochromeBluePalette = loadConfettiMonochromeBluePalette;

export * from "./index.js";
