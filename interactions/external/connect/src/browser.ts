import { loadExternalConnectInteraction } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadExternalConnectInteraction?: typeof loadExternalConnectInteraction;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadExternalConnectInteraction = loadExternalConnectInteraction;

export * from "./index.js";
