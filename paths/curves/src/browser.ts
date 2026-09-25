import { loadCurvesPath } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadCurvesPath?: typeof loadCurvesPath;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadCurvesPath = loadCurvesPath;

export * from "./index.js";
