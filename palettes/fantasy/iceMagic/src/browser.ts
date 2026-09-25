import { loadIceMagicPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadIceMagicPalette?: typeof loadIceMagicPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadIceMagicPalette = loadIceMagicPalette;

export * from "./index.js";
