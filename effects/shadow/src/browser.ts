import { loadShadowEffect } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadShadowEffect?: typeof loadShadowEffect;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadShadowEffect = loadShadowEffect;

export * from "./index.js";
