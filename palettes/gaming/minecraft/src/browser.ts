import { loadMinecraftPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMinecraftPalette?: typeof loadMinecraftPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMinecraftPalette = loadMinecraftPalette;

export * from "./index.js";
