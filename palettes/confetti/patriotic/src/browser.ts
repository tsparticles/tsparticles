import { loadConfettiPatrioticPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiPatrioticPalette?: typeof loadConfettiPatrioticPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadConfettiPatrioticPalette = loadConfettiPatrioticPalette;

export * from "./index.js";
