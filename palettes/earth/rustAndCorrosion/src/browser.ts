import { loadRustAndCorrosionPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadRustAndCorrosionPalette?: typeof loadRustAndCorrosionPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadRustAndCorrosionPalette = loadRustAndCorrosionPalette;

export * from "./index.js";
