const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
};

globalObject.__tsParticlesInternals ??= {};

export * from "./index.js";
