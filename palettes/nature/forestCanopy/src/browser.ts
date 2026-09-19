import { loadForestCanopyPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadForestCanopyPalette?: typeof loadForestCanopyPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadForestCanopyPalette = loadForestCanopyPalette;

export * from "./index.js";
