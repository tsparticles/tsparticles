import { loadOilSlickPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadOilSlickPalette?: typeof loadOilSlickPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadOilSlickPalette = loadOilSlickPalette;

export * from "./index.js";
