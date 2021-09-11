import type { SVGPathElement } from "@tsparticles/pathseg";

export interface ISvgPath {
    element: SVGPathElement;
    length: number;
    path2d?: Path2D;
}
