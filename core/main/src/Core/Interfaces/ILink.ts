import type { IParticle } from "./IParticle";

/**
 * @category Interfaces
 */
export interface ILink {
    destination: IParticle;
    opacity: number;
    //visible: boolean;
}

export interface ILinkTriangle {
    vertices: IParticle[];
    opacity: number;
    //visible: boolean;
}
