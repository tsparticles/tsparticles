import { loadThemesPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadThemesPlugin?: typeof loadThemesPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadThemesPlugin = loadThemesPlugin;

export * from "./index.js";
