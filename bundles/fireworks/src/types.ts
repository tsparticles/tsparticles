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
