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
  delay?: number;
  delayStage?: number;
  stage?: number;
  time?: number;
}

export type InfectableContainer = InteractivityContainer & {
  actualOptions: InfectionOptions;
  infecter?: Infecter;
};

export type IInfectionOptions = IInteractivityOptions & {
  infection: IInfection;
};

export type InfectionOptions = InteractivityOptions & {
  infection?: Infection;
};

export type InfectableParticle = Particle & {
  infection?: IParticleInfection;
};
