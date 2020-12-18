/**
 * @category Options
 */
export interface IMotionReduce {
    /**
     * Factor used to reduce motion, the higher the value, the higher the motion reduction
     */
    factor: number;

    /**
     * Reduces motion settings for users with `prefer-reduced-motion` enabled
     */
    value: boolean;
}
