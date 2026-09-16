import { loadEmittersShapeCircle } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEmittersShapeCircle?: typeof loadEmittersShapeCircle;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadEmittersShapeCircle = loadEmittersShapeCircle;

export * from "./index.js";
