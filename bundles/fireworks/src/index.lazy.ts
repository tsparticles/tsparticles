import type { IFireworkOptions } from "./IFireworkOptions.js";
import type { RecursivePartial } from "@tsparticles/engine/lazy";

/** Firework options type */
export type FireworkOptions = RecursivePartial<IFireworkOptions>;

export * from "./fireworks.lazy.js";
