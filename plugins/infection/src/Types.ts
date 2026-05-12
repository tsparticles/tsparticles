import type {
  IInteractivityOptions,
  InteractivityContainer,
  InteractivityOptions,
} from "@tsparticles/plugin-interactivity";
import type { IInfection } from "./Options/Interfaces/IInfection.js";
import type { Infecter } from "./Infecter.js";
import type { Infection } from "./Options/Classes/Infection.js";
import type { Particle } from "@tsparticles/engine";

export interface IParticleInfection {
  /** The infection delay for this particle */
  delay?: number;
  /** The delay stage */
  delayStage?: number;
  /** The current infection stage */
  stage?: number;
  /** The time since infection started */
  time?: number;
}

/** Container with infection capabilities */
export type InfectableContainer = InteractivityContainer & {
  /** The actual infection options */
  actualOptions: InfectionOptions;
  /** The infecter instance */
  infecter?: Infecter;
};

/** Infection plugin options interface */
export type IInfectionOptions = IInteractivityOptions & {
  /** The infection options */
  infection: IInfection;
};

/** Infection plugin options class */
export type InfectionOptions = InteractivityOptions & {
  /** The infection options */
  infection?: Infection;
};

/** Particle with infection data */
export type InfectableParticle = Particle & {
  infection?: IParticleInfection;
};
