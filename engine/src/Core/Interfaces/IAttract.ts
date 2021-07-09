import type { IParticle } from "./IParticle";

/**
 * @category Interfaces
 */
export interface IAttract {
    particles: IParticle[];
    finish?: boolean;
    count?: number;
    clicking?: boolean;
}
