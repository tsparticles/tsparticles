import type { IRangeColor, IRgb, RangeValue } from "@tsparticles/engine";
import type { LinkParticle } from "./Types.js";

export interface ILink {
  color?: IRgb;
  destination: LinkParticle;
  /* if true, the link crosses the canvas boundaries */
  isWarped?: boolean;
  opacity: number;
}

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
