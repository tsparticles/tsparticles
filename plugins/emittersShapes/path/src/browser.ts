import { loadEmittersShapePath } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEmittersShapePath?: typeof loadEmittersShapePath;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadEmittersShapePath = loadEmittersShapePath;

export * from "./index.js";
