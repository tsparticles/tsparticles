import { loadGingerbreadHousePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadGingerbreadHousePalette?: typeof loadGingerbreadHousePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadGingerbreadHousePalette = loadGingerbreadHousePalette;

export * from "./index.js";
