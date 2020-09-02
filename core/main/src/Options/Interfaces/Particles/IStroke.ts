import type { IAnimatableColor } from "./IAnimatableColor";

/**
 * [[include:Options/Particles/Stroke.md]]
 * @category Options
 */
export interface IStroke {
    color?: string | IAnimatableColor;
    opacity?: number;
    width: number;
}
