import type { IValueWithRandom, RotateDirection, RotateDirectionAlt } from "tsparticles-engine";
import type { IRotateAnimation } from "./IRotateAnimation";

/**
 * [[include:Options/Particles/Rotate.md]]
 * @category Options
 */
export interface IRotate extends IValueWithRandom {
    animation: IRotateAnimation;
    direction: RotateDirection | keyof typeof RotateDirection | RotateDirectionAlt;
    path: boolean;
}
