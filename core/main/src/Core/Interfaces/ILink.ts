import type { IParticle } from "./IParticle";

export interface ILink {
    edges: IParticle[];
    opacity: number;
}

export interface ILinkTriangle {
    vertices: IParticle[];
    opacity: number;
}
