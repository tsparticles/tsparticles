import type { IColor } from "tsparticles-engine";

/**
 * @category Polygon Mask Plugin
 */
export interface IDrawStroke {
    color: string | IColor;
    width: number;
    opacity: number;
}
