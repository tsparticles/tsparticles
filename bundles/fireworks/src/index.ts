import type { IFireworkOptions } from "./IFireworkOptions.js";
import type { RecursivePartial } from "@tsparticles/engine";

export type FireworkOptions = RecursivePartial<IFireworkOptions>;

export * from "./fireworks.js";
