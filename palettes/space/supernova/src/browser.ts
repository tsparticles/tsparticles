import { loadSupernovaPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSupernovaPalette?: typeof loadSupernovaPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSupernovaPalette = loadSupernovaPalette;

export * from "./index.js";
