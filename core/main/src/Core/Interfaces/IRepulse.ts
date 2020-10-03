import type { IParticle } from "./IParticle";

/**
 * @category Interfaces
 */
export interface IRepulse {
    particles: IParticle[];
    finish?: boolean;
    count?: number;
    clicking?: boolean;
}
