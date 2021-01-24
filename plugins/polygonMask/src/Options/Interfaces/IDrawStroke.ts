import type { IColor } from "tsparticles-core/Core/Interfaces/Colors";

/**
 * @category Polygon Mask Plugin
 */
export interface IDrawStroke {
    color: string | IColor;
    width: number;
    opacity: number;
}
