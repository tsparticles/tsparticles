/**
 * Color animation interface, these properties are used to animate colors
 * @category Options
 */
import type { IOffsetValue } from "./IOffsetValue";

export interface IColorAnimation {
    /**
     * Enables/disables the animation
     */
    enable: boolean;

    /**
     * The value offset percent applied to color hue
     */
    offset: IOffsetValue;

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
