import { loadColoredSmokeMagentaPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadColoredSmokeMagentaPalette?: typeof loadColoredSmokeMagentaPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadColoredSmokeMagentaPalette = loadColoredSmokeMagentaPalette;

export * from "./index.js";
