import { loadFilterEffect } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFilterEffect?: typeof loadFilterEffect;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFilterEffect = loadFilterEffect;

export * from "./index.js";
