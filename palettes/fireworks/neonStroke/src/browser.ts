import { loadFireworksNeonStrokePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksNeonStrokePalette?: typeof loadFireworksNeonStrokePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksNeonStrokePalette = loadFireworksNeonStrokePalette;

export * from "./index.js";
