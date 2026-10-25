import { loadNetworkNodesPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadNetworkNodesPalette?: typeof loadNetworkNodesPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadNetworkNodesPalette = loadNetworkNodesPalette;

export * from "./index.js";
