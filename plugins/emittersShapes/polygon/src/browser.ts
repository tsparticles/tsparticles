import { loadEmittersShapePolygon } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEmittersShapePolygon?: typeof loadEmittersShapePolygon;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadEmittersShapePolygon = loadEmittersShapePolygon;

export * from "./index.js";
