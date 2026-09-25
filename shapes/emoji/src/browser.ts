import { loadEmojiShape } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEmojiShape?: typeof loadEmojiShape;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadEmojiShape = loadEmojiShape;

export * from "./index.js";
