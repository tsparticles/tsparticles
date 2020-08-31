import type { IAnimatableColor } from "./IAnimatableColor";

/**
 * @category Options
 */
export interface IStroke {
    color?: string | IAnimatableColor;
    opacity?: number;
    width: number;
}
