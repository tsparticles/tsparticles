import { loadExportVideoPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadExportVideoPlugin?: typeof loadExportVideoPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadExportVideoPlugin = loadExportVideoPlugin;

export * from "./index.js";
