import configs from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

export default configs;
