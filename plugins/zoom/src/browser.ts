import { loadZoomPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadZoomPlugin?: typeof loadZoomPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadZoomPlugin = loadZoomPlugin;

export * from "./index.js";
