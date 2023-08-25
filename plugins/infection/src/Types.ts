import type { Container, IOptions, IParticle, Options, Particle } from "@tsparticles/engine";
import type { IInfection } from "./Options/Interfaces/IInfection.js";
import type { Infecter } from "./Infecter.js";
import type { Infection } from "./Options/Classes/Infection.js";

export interface IParticleInfection {
    delay?: number;
    delayStage?: number;
    stage?: number;
    time?: number;
}

export type InfectableContainer = Container & {
    actualOptions: InfectionOptions;
    infecter?: Infecter;
};

export type IInfectableParticle = IParticle & {
    infection?: IParticleInfection;
};

export type IInfectionOptions = IOptions & {
    infection: IInfection;
};

export type InfectionOptions = Options & {
    infection?: Infection;
};

export type InfectableParticle = Particle & IInfectableParticle;
