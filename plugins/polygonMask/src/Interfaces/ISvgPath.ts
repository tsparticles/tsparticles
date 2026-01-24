import type { SVGPathElement } from "../pathseg.js";

export interface ISvgPath {
  element: SVGPathElement;
  length: number;
  path2d?: Path2D;
}
