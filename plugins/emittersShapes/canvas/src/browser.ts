import { loadEmittersShapeCanvas } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEmittersShapeCanvas?: typeof loadEmittersShapeCanvas;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadEmittersShapeCanvas = loadEmittersShapeCanvas;

export * from "./index.js";
