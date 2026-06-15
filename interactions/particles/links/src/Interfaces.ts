import type { IRangeColor, RangeValue } from "@tsparticles/engine";

export type { ILink, ILinkTriangle } from "./Types.js";

/** Particles link frequencies */
export interface IParticlesFrequencies {
  /** Link frequencies per link id */
  links: Map<string, number>;
  /** Triangle frequencies per link id */
  triangles: Map<string, number>;
}

/** Twinkle animation options for links */
export interface ITwinkle {
  links: {
    /** Twinkle color */
    color: IRangeColor;
    /** Enable twinkle animation */
    enable: boolean;
    /** Twinkle frequency */
    frequency: number;
    /** Twinkle opacity */
    opacity: RangeValue;
  };
}
