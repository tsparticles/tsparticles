import { loadShockwaveBlastPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadShockwaveBlastPalette?: typeof loadShockwaveBlastPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadShockwaveBlastPalette = loadShockwaveBlastPalette;

export * from "./index.js";
