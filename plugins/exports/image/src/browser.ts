import { loadExportImagePlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadExportImagePlugin?: typeof loadExportImagePlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadExportImagePlugin = loadExportImagePlugin;

export * from "./index.js";
