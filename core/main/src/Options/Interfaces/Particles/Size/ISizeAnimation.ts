import type { DestroyType, StartValueType } from "../../../../Enums";

export interface ISizeAnimation {
    enable: boolean;

    /**
     * @deprecated use the new minimumValue instead
     */
    size_min: number;

    minimumValue: number;
    speed: number;
    sync: boolean;
    startValue: StartValueType | keyof typeof StartValueType;
    destroy: DestroyType | keyof typeof DestroyType;
}
