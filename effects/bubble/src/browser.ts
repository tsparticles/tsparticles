import { loadBubbleEffect } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBubbleEffect?: typeof loadBubbleEffect;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadBubbleEffect = loadBubbleEffect;

export * from "./index.js";
