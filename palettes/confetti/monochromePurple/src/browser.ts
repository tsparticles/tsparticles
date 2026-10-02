import { loadConfettiMonochromePurplePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiMonochromePurplePalette?: typeof loadConfettiMonochromePurplePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadConfettiMonochromePurplePalette = loadConfettiMonochromePurplePalette;

export * from "./index.js";
