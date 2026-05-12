import type { Container, RecursivePartial } from "@tsparticles/engine";
import type { IConfettiOptions } from "./IConfettiOptions.js";

/** Confetti function first parameter type */
export type ConfettiFirstParam = string | RecursivePartial<IConfettiOptions>;

/** Confetti function type */
export type ConfettiFunc = (
  idOrOptions: ConfettiFirstParam,
  confettiOptions?: RecursivePartial<IConfettiOptions>,
) => Promise<Container | undefined>;
