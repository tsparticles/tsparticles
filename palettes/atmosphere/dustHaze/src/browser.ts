import { loadDustHazePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadDustHazePalette?: typeof loadDustHazePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadDustHazePalette = loadDustHazePalette;

export * from "./index.js";
