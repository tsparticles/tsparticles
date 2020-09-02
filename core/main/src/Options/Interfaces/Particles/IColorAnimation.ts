/**
 * Color animation interface, these properties are used to animate colors
 * @category Options
 */
export interface IColorAnimation {
    /**
     * Enables/disables the animation
     */
    enable: boolean;

    /**
     * Hue speed rotation (from 0 to 360 degrees)
     */
    speed: number;

    /**
     * Enables the sync animations for the particles created at the same time
     * pushed or emitter particles will be out of sync
     * Not using this value will create random colors particles at the same lightness and saturation of the base color
     */
    sync: boolean;
}
