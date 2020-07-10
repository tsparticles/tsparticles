import { IParticle } from "./IParticle";

export interface IAttract {
    particles: IParticle[];
    finish?: boolean;
    count?: number;
    clicking?: boolean;
}
