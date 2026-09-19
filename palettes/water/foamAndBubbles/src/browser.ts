import { loadFoamAndBubblesPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFoamAndBubblesPalette?: typeof loadFoamAndBubblesPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFoamAndBubblesPalette = loadFoamAndBubblesPalette;

export * from "./index.js";
