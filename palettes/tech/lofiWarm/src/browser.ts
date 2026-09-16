import { loadLofiWarmPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadLofiWarmPalette?: typeof loadLofiWarmPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadLofiWarmPalette = loadLofiWarmPalette;

export * from "./index.js";
