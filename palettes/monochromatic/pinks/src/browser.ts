import { loadMonochromePinksPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMonochromePinksPalette?: typeof loadMonochromePinksPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMonochromePinksPalette = loadMonochromePinksPalette;

export * from "./index.js";
