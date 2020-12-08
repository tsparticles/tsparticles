import type { DestroyType, StartValueType } from "../../../../Enums";

/**
 * @category Options
 */
export interface ISizeAnimation {
    /**
     * @deprecated use the new minimumValue instead
     */
    size_min?: number;

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
