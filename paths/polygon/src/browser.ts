import { loadPolygonPath } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPolygonPath?: typeof loadPolygonPath;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadPolygonPath = loadPolygonPath;

export * from "./index.js";
