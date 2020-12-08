import { DestroyType, StartValueType } from "../../../../Enums/Types";

/**
 * @category Options
 */
export interface IOpacityAnimation {
    /**
     * @deprecated use the new Range syntax
     */
    opacity_min?: number;

    /**
     * @deprecated use the new Range syntax
     */
    minimumValue?: number;

    count: number;
    destroy: DestroyType | keyof typeof DestroyType;
    enable: boolean;
    speed: number;
    sync: boolean;
    startValue: StartValueType | keyof typeof StartValueType;
}
