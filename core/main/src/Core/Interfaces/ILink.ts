import type { IParticle } from "./IParticle";

export interface ILink {
    edges: IParticle[];
    opacity: number;
    visible: boolean;
}

export interface ILinkTriangle {
    vertices: IParticle[];
    opacity: number;
    visible: boolean;
}
