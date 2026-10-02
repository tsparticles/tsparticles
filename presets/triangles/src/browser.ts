import { loadTrianglesPreset } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadTrianglesPreset?: typeof loadTrianglesPreset;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadTrianglesPreset = loadTrianglesPreset;

export * from "./index.js";
