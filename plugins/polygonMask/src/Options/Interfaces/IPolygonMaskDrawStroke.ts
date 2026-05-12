import type { IOptionsColor } from "@tsparticles/engine";

/** The polygon mask draw stroke options */
export interface IPolygonMaskDrawStroke {
  /** The polygon mask draw stroke color */
  color: string | IOptionsColor;
  /** The polygon mask draw stroke opacity */
  opacity: number;
  /** The polygon mask draw stroke width */
  width: number;
}
