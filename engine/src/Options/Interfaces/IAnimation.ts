import type { RangeValue } from "../../Types/RangeValue";
import type { StartValueType } from "../../Enums/Types/StartValueType";

export interface IAnimation {
    count: RangeValue;

    /**
     * Speed animation decay
     */
    decay: RangeValue;

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

export interface IRangedAnimation extends IAnimation {
    /**
     * @deprecated use the new min/max object in the size value
     */
    minimumValue?: number;

    /**
     * @deprecated use the new minimumValue instead
     */
    size_min?: number;

    startValue: StartValueType | keyof typeof StartValueType;
}
