import type { IOptionsColor } from "@tsparticles/engine";

/** Links triangle options */
export interface ILinksTriangle {
  /** Triangle fill color */
  color?: string | IOptionsColor;
  /** Enables link triangles */
  enable: boolean;
  /** Triangle fill frequency */
  frequency: number;
  /** Triangle fill opacity */
  opacity?: number;
}
