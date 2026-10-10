import { loadMermaidPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMermaidPalette?: typeof loadMermaidPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMermaidPalette = loadMermaidPalette;

export * from "./index.js";
