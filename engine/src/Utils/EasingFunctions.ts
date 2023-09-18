/**
 * Linear easing function.
 * @param t - The progress of the animation, between 0 and 1.
 * @returns The eased progress.
 */
function linear(t: number): number {
    return t;
}

/**
 * Ease-in quad easing function.
 * @param t - The progress of the animation, between 0 and 1.
 * @returns The eased progress.
 */
function easeInQuad(t: number): number {
    return t * t;
}

/**
 * Ease-out quad easing function.
 * @param t - The progress of the animation, between 0 and 1.
 * @returns The eased progress.
 */
function easeOutQuad(t: number): number {
    return t * (2 - t);
}

/**
 * Ease-in-out quad easing function.
 * @param t - The progress of the animation, between 0 and 1.
 * @returns The eased progress.
 */
function easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

/**
 * An object that maps the names of the easing functions to the functions themselves.
 */
export const EasingFunctions = {
    linear,
    easeInQuad,
    easeOutQuad,
    easeInOutQuad,
};
