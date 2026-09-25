import { loadSakuraPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSakuraPalette?: typeof loadSakuraPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSakuraPalette = loadSakuraPalette;

export * from "./index.js";
