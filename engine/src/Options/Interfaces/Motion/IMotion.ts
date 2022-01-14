import type { IMotionReduce } from "./IMotionReduce";

/**
 * [[include:Options/Motion.md]]
 * @category Options
 */
export interface IMotion {
    /**
     * Disables motions for users with `prefer-reduced-motion` enabled
     */
    disable: boolean;

    /**
     * Reduce motion settings for users with `prefer-reduced-motion` enabled
     * If [[disable]] is `true` these values will be ignored
     */
    reduce: IMotionReduce;
}
