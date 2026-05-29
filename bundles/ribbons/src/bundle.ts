import { ribbons } from "./index.js";

export * from "./index.js";
export * from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  ribbons?: typeof ribbons;
};
globalObject.ribbons = ribbons;
