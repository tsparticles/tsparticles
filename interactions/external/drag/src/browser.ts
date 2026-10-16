import { loadExternalDragInteraction } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadExternalDragInteraction?: typeof loadExternalDragInteraction;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadExternalDragInteraction = loadExternalDragInteraction;

export * from "./index.js";
