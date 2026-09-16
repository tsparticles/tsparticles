import { loadParticlesEffect } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadParticlesEffect?: typeof loadParticlesEffect;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadParticlesEffect = loadParticlesEffect;

export * from "./index.js";
