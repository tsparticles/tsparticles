import type { LinkParticle } from "./LinkParticle";

/**
 * @category Interfaces
 */
export interface ILink {
    destination: LinkParticle;
    opacity: number;
}

/**
 * @category Interfaces
 */
export interface ILinkTriangle {
    vertices: LinkParticle[];
    opacity: number;
}
