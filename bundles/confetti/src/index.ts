import type { IConfettiOptions } from "./IConfettiOptions.js";
import type { RecursivePartial } from "@tsparticles/engine";

/**
 *
 */
export type ConfettiOptions = RecursivePartial<IConfettiOptions>;

export * from "./confetti.js";
