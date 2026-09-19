import { loadFogCoastalPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFogCoastalPalette?: typeof loadFogCoastalPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFogCoastalPalette = loadFogCoastalPalette;

export * from "./index.js";
