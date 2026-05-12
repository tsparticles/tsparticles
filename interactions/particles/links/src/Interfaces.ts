import type { IRangeColor, IRgb, RangeValue } from "@tsparticles/engine";
import type { LinkParticle } from "./Types.js";

/** Link data between two particles */
export interface ILink {
  /** Link line color */
  color?: IRgb;
  /** Destination particle */
  destination: LinkParticle;
  /** Whether the link crosses the canvas boundaries */
  isWarped?: boolean;
  /** Link line opacity */
  opacity: number;
}

/** Triangle data between linked particles */
export interface ILinkTriangle {
  /** Triangle fill opacity */
  opacity: number;
  /** Triangle vertices */
  vertices: LinkParticle[];
}

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
