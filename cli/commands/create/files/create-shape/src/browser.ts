import { loadTemplateShape } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadTemplateShape?: typeof loadTemplateShape;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadTemplateShape = loadTemplateShape;

export * from "./index.js";
