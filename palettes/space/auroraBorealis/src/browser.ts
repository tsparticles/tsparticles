import { loadAuroraBorealisPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadAuroraBorealisPalette?: typeof loadAuroraBorealisPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadAuroraBorealisPalette = loadAuroraBorealisPalette;

export * from "./index.js";
