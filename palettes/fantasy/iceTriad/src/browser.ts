import { loadIceTriadPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadIceTriadPalette?: typeof loadIceTriadPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadIceTriadPalette = loadIceTriadPalette;

export * from "./index.js";
