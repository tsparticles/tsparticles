import type { IConfettiOptions } from "./IConfettiOptions.js";
import type { RecursivePartial } from "@tsparticles/engine";

/** Confetti options type */
export type ConfettiOptions = RecursivePartial<IConfettiOptions>;

export * from "./confetti.js";
export type * from "./ConfettiParams.js";
