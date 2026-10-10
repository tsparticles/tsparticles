import { loadFireworksBluePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksBluePalette?: typeof loadFireworksBluePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksBluePalette = loadFireworksBluePalette;

export * from "./index.js";
