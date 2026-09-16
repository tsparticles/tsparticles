import { loadCitrusTwistPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadCitrusTwistPalette?: typeof loadCitrusTwistPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadCitrusTwistPalette = loadCitrusTwistPalette;

export * from "./index.js";
