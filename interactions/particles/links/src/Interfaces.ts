import type { IRangeColor, RangeValue } from "@tsparticles/engine";
import type { LinkParticle } from "./Types.js";

/**
 */
export interface ILink {
    destination: LinkParticle;
    opacity: number;
}

/**
 */
export interface ILinkTriangle {
    opacity: number;
    vertices: LinkParticle[];
}

export interface IParticlesFrequencies {
    links: Map<string, number>;
    triangles: Map<string, number>;
}

export interface ITwinkle {
    lines: {
        color: IRangeColor;
        enable: boolean;
        frequency: number;
        opacity: RangeValue;
    };
}
