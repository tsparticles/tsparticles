import type { IParticlesOptions } from "./IParticlesOptions.js";
import type { ParticlesInstance } from "./ParticlesInstance.js";
import type { RecursivePartial } from "@tsparticles/engine";

/** Particles function type */
export type ParticlesFunc = ((
  idOrOptions?: string | RecursivePartial<IParticlesOptions>,
  sourceOptions?: RecursivePartial<IParticlesOptions>,
) => Promise<ParticlesInstance | undefined>) & {
  version: string;
};

/** Animation API bound to an application-owned engine. */
export type ParticlesApi = ParticlesFunc & {
  /** Creates a particles animation bound to a specific canvas */
  create: (
    canvas?: HTMLCanvasElement | null,
    options?: RecursivePartial<IParticlesOptions>,
  ) => Promise<ParticlesInstance | undefined>;
  /** Initializes the particles plugins */
  init: () => Promise<void>;
  /** The particles bundle version */
  version: string;
};
