import type { IFireworkOptions } from "./IFireworkOptions.js";
import type { RecursivePartial } from "@tsparticles/engine";

/** Firework options type */
export type FireworkOptions = RecursivePartial<IFireworkOptions>;

export * from "./fireworks.js";
