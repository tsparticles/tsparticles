import { createRibbons } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  createRibbons?: typeof createRibbons;
};

globalObject.createRibbons = createRibbons;

export * from "./index.js";
