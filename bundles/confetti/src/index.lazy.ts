import type { IConfettiOptions } from "./IConfettiOptions.js";
import type { RecursivePartial } from "@tsparticles/engine/lazy";

/** Confetti options type */
export type ConfettiOptions = RecursivePartial<IConfettiOptions>;

export * from "./confetti.lazy.js";
export type * from "./ConfettiParams.js";
