import type { InteractivityContainer, InteractivityParticle } from "@tsparticles/plugin-interactivity";
import type { Attract } from "./Options/Classes/Attract.js";
import type { AttractOptions } from "./Options/Classes/AttractOptions.js";
import type { IAttract } from "./Options/Interfaces/IAttract.js";

/** Attract mode interface */
export interface IAttractMode {
  /** Attract options */
  attract: IAttract;
}

/** Attract mode options */
export interface AttractMode {
  /** Attract options, undefined if not set */
  attract?: Attract;
}

/** Container attract data */
export interface IContainerAttract {
  clicking?: boolean;
  count?: number;
  finish?: boolean;
  particles: InteractivityParticle[];
}

/** Attract container interface */
export type AttractContainer = InteractivityContainer & {
  actualOptions: AttractOptions;
  attract?: IContainerAttract;
  retina: {
    attractModeDistance?: number;
  };
};
