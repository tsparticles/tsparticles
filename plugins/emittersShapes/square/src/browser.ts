import { loadEmittersShapeSquare } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEmittersShapeSquare?: typeof loadEmittersShapeSquare;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadEmittersShapeSquare = loadEmittersShapeSquare;

export * from "./index.js";
