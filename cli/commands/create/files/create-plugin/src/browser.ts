import { loadTemplatePlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadTemplatePlugin?: typeof loadTemplatePlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadTemplatePlugin = loadTemplatePlugin;

export * from "./index.js";
