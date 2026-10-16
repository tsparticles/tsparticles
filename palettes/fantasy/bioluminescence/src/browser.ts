import { loadBioluminescencePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBioluminescencePalette?: typeof loadBioluminescencePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadBioluminescencePalette = loadBioluminescencePalette;

export * from "./index.js";
