import type { LinkParticle } from "./LinkParticle";

export interface ILink {
    destination: LinkParticle;
    opacity: number;
}

export interface ILinkTriangle {
    vertices: LinkParticle[];
    opacity: number;
}
