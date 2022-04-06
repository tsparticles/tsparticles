import type { IAnimatableColor } from "../IAnimatableColor";
import type { IColor } from "../../../Core/Interfaces/Colors";

/**
 * Particle stroke, outlines the particle with a customizable line
 * [[include:Options/Particles/Stroke.md]]
 * @category Options
 */
export interface IStroke {
    /**
     * The stroke color, can be animated too
     */
    color?: string | IAnimatableColor | IColor;

    /**
     * The stroke opacity
     */
    opacity?: number;

    /**
     * The stroke line width
     */
    width: number;
}
