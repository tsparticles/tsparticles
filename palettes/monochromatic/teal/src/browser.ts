import { loadMonochromeTealPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMonochromeTealPalette?: typeof loadMonochromeTealPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMonochromeTealPalette = loadMonochromeTealPalette;

export * from "./index.js";
