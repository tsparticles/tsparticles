import { loadMonochromePurplesPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMonochromePurplesPalette?: typeof loadMonochromePurplesPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMonochromePurplesPalette = loadMonochromePurplesPalette;

export * from "./index.js";
