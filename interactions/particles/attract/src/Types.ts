import type {
  IInteractivityParticlesOptions,
  InteractivityParticle,
  InteractivityParticlesOptions,
} from "@tsparticles/plugin-interactivity";
import type { Attract } from "./Options/Classes/Attract.js";
import type { IAttract } from "./Options/Interfaces/IAttract.js";

export type IParticlesAttractOptions = IInteractivityParticlesOptions & {
  attract?: IAttract;
};

export type ParticlesAttractOptions = InteractivityParticlesOptions & {
  attract?: Attract;
};

export type AttractParticle = InteractivityParticle & {
  attractDistance?: number;
  options: ParticlesAttractOptions;
};
