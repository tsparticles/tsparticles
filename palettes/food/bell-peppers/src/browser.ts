import { loadBellPeppersPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBellPeppersPalette?: typeof loadBellPeppersPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadBellPeppersPalette = loadBellPeppersPalette;

export * from "./index.js";
