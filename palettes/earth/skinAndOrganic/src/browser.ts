import { loadSkinAndOrganicPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSkinAndOrganicPalette?: typeof loadSkinAndOrganicPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSkinAndOrganicPalette = loadSkinAndOrganicPalette;

export * from "./index.js";
