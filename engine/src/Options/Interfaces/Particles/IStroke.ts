import type { IAnimatableColor } from "../IAnimatableColor";

/**
 * Particle stroke, outlines the particle with a customizable line
 * [[include:Options/Particles/Stroke.md]]
 * @category Options
 */
export interface IStroke {
    /**
     * The stroke color, can be animated too
     */
    color?: string | IAnimatableColor;

    /**
     * The stroke opacity
     */
    opacity?: number;

    /**
     * The stroke line width
     */
    width: number;
}
