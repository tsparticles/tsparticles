import { loadPacmanPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPacmanPalette?: typeof loadPacmanPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadPacmanPalette = loadPacmanPalette;

export * from "./index.js";
