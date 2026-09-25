import { loadRisingBubblesPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadRisingBubblesPalette?: typeof loadRisingBubblesPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadRisingBubblesPalette = loadRisingBubblesPalette;

export * from "./index.js";
