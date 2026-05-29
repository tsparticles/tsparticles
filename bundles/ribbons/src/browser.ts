import { ribbons } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  ribbons?: typeof ribbons;
};
globalObject.ribbons = ribbons;

export * from "./index.js";
