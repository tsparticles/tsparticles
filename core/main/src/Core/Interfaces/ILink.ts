import type { IParticle } from "./IParticle";

export interface ILink {
    source: IParticle;
    destination: IParticle;
    opacity: number;
}

export interface ILinkTriangle {
    vertices: IParticle[];
    opacity: number;
}
