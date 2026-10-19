import { loadExportJSONPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadExportJSONPlugin?: typeof loadExportJSONPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadExportJSONPlugin = loadExportJSONPlugin;

export * from "./index.js";
