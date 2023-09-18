/**
 * Easing functions for animations
 */

/**
 * Linear easing function
 * @param t Current time
 * @param b Start value
 * @param c Change in value
 * @param d Duration
 */
export function linear(t: number, b: number, c: number, d: number): number {
    return c * t / d + b;
}

/**
 * Ease-in easing function
 * @param t Current time
 * @param b Start value
 * @param c Change in value
 * @param d Duration
 */
export function easeIn(t: number, b: number, c: number, d: number): number {
    t /= d;
    return c * t * t + b;
}

/**
 * Ease-out easing function
 * @param t Current time
 * @param b Start value
 * @param c Change in value
 * @param d Duration
 */
export function easeOut(t: number, b: number, c: number, d: number): number {
    t /= d;
    return -c * t * (t - 2) + b;
}
