/**
 * The types of easing functions that can be used in animations.
 */
export type EasingType = "linear" | "ease-in" | "ease-out" | "ease-in-out";

/**
 * Interface for specifying an easing function for animations.
 */
export interface IEasingFunction {
    /**
     * The type of easing function to use.
     */
    type: EasingType;

    /**
     * The duration of the animation in milliseconds.
     */
    duration: number;
}
