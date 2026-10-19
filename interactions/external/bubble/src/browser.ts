import { loadExternalBubbleInteraction } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadExternalBubbleInteraction?: typeof loadExternalBubbleInteraction;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadExternalBubbleInteraction = loadExternalBubbleInteraction;

export * from "./index.js";
