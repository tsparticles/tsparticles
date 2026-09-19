import { loadBokehPastelPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBokehPastelPalette?: typeof loadBokehPastelPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadBokehPastelPalette = loadBokehPastelPalette;

export * from "./index.js";
