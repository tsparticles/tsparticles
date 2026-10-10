import { loadAppleGreenPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadAppleGreenPalette?: typeof loadAppleGreenPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadAppleGreenPalette = loadAppleGreenPalette;

export * from "./index.js";
