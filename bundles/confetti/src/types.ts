import type { Container, RecursivePartial } from "@tsparticles/engine";
import type { IConfettiOptions } from "./IConfettiOptions.js";

/** Confetti function first parameter type */
export type ConfettiFirstParam = string | RecursivePartial<IConfettiOptions>;

/** Confetti function type */
export type ConfettiFunc = (
  idOrOptions: ConfettiFirstParam,
  confettiOptions?: RecursivePartial<IConfettiOptions>,
) => Promise<Container | undefined>;

/** Animation API bound to an application-owned engine. */
export type ConfettiApi = ConfettiFunc & {
  /** Creates a confetti animation bound to a specific canvas */
  create: (canvas?: HTMLCanvasElement | null, options?: RecursivePartial<IConfettiOptions>) => Promise<ConfettiFunc>;

  /** Initializes the confetti plugins */
  init: () => Promise<void>;

  /** The confetti bundle version */
  version: string;
};
