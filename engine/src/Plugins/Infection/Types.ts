import type { Infecter } from "./Infecter";
import type { Particle } from "../../Core/Particle";
import type { Container } from "../../Core/Container";
import type { IParticle } from "../../Core/Interfaces";

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
