import type { IMotionReduce } from "./IMotionReduce";

/**
 * [[include:Options/Motion.md]]
 */
export interface IMotion {
    /**
     * Disables motions for users with `prefer-reduced-motion` enabled
     */
    disable: boolean;

    /**
     * Reduce motion settings for users with `prefer-reduced-motion` enabled
     * If {@link disable} is `true` these values will be ignored
     */
    reduce: IMotionReduce;
}
