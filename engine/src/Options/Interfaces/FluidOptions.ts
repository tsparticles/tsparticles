/**
 * The FluidOptions interface, defines all the options that can be used by `tsParticles` for fluid-like movement
 */
export interface FluidOptions {
    /**
     * The speed of the fluid-like movement
     */
    speed: number;

    /**
     * The direction of the fluid-like movement
     */
    direction: 'up' | 'down' | 'left' | 'right';

    /**
     * The intensity of the fluid-like movement
     */
    intensity: number;
}
