import type { Container, IParticle, Particle } from "tsparticles-engine";
import type { Infecter } from "./Infecter";

export interface IParticleInfection {
    delay?: number;
    delayStage?: number;
    stage?: number;
    time?: number;
}

export type InfectableContainer = Container & {
    infecter?: Infecter;
};

export type IInfectableParticle = IParticle & {
    infection: IParticleInfection;
};

export type InfectableParticle = Particle & IInfectableParticle;
