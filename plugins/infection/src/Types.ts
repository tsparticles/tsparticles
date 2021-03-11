import type { Container, IParticle, Particle } from "tsparticles-engine";
import { Infecter } from "./Infecter";

export interface IParticleInfection {
    stage?: number;
    time?: number;
    delay?: number;
    delayStage?: number;
}

export type InfectableContainer = Container & {
    infecter?: Infecter;
};

export type IInfectableParticle = IParticle & {
    infection: IParticleInfection;
};

export type InfectableParticle = Particle & IInfectableParticle;
