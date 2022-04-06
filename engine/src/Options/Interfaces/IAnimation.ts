import { RangeValue } from "../../Types/RangeValue";

export interface IAnimation {
    count: RangeValue;

    /**
     * Enables/disables the animation
     */
    enable: boolean;

    /**
     * Speed animation
     */
    speed: RangeValue;

    /**
     * Enables the sync animations for the particles created at the same time
     * pushed or emitter particles will be out of sync
     */
    sync: boolean;
}
