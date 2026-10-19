import { loadPolygonMaskPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPolygonMaskPlugin?: typeof loadPolygonMaskPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadPolygonMaskPlugin = loadPolygonMaskPlugin;

export * from "./index.js";
