import type { IParticle } from "./IParticle";

/**
 * @category Interfaces
 */
export interface ILink {
    destination: IParticle;
    opacity: number;
}

export interface ILinkTriangle {
    vertices: IParticle[];
    opacity: number;
}
