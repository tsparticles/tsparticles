import { loadSpiralPath } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSpiralPath?: typeof loadSpiralPath;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSpiralPath = loadSpiralPath;

export * from "./index.js";
