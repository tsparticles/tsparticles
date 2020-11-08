import { DestroyType, StartValueType } from "../../../../Enums/Types";

/**
 * @category Options
 */
export interface IOpacityAnimation {
    /**
     * @deprecated use the new minimumValue instead
     */
    opacity_min: number;

    count: number;
    destroy: DestroyType | keyof typeof DestroyType;
    enable: boolean;
    minimumValue: number;
    speed: number;
    sync: boolean;
    startValue: StartValueType | keyof typeof StartValueType;
}
