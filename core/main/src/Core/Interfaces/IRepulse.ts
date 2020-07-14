import type { IParticle } from "./IParticle";

export interface IRepulse {
    particles: IParticle[];
    finish?: boolean;
    count?: number;
    clicking?: boolean;
}
