import type { FireworksInstance } from "./FireworksInstance.js";
import type { IFireworkOptions } from "./IFireworkOptions.js";
import type { RecursivePartial } from "@tsparticles/engine";

/** Fireworks function type */
export type FireworksFunc = ((
  idOrOptions: string | RecursivePartial<IFireworkOptions>,
  sourceOptions?: RecursivePartial<IFireworkOptions>,
) => Promise<FireworksInstance | undefined>) & {
  version: string;
};

/** Animation API bound to an application-owned engine. */
export type FireworksApi = FireworksFunc & {
  /** Creates a fireworks animation bound to a specific canvas */
  create: (
    canvas?: HTMLCanvasElement | null,
    options?: RecursivePartial<IFireworkOptions>,
  ) => Promise<FireworksInstance | undefined>;
  /** Initializes the fireworks plugins */
  init: () => Promise<void>;
  /** The fireworks bundle version */
  version: string;
};
