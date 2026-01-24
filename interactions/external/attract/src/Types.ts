import type { InteractivityContainer, InteractivityParticle } from "@tsparticles/plugin-interactivity";
import type { Attract } from "./Options/Classes/Attract.js";
import type { AttractOptions } from "./Options/Classes/AttractOptions.js";
import type { IAttract } from "./Options/Interfaces/IAttract.js";

export interface IAttractMode {
  attract: IAttract;
}

export interface AttractMode {
  attract?: Attract;
}

interface IContainerAttract {
  clicking?: boolean;
  count?: number;
  finish?: boolean;
  particles: InteractivityParticle[];
}

export type AttractContainer = InteractivityContainer & {
  actualOptions: AttractOptions;
  attract?: IContainerAttract;
  retina: {
    attractModeDistance?: number;
  };
};
