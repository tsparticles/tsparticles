import type { IOptionLoader } from "../../IOptionLoader";
import type { StartValueType } from "../../../../Enums/StartValueType";
import type { DestroyType } from "../../../../Enums/DestroyType";

export interface ISizeAnimation extends IOptionLoader<ISizeAnimation> {
    enable: boolean;

    /**
     * @deprecated use the new minimumValue instead
     */
    size_min: number;

    minimumValue: number;
    speed: number;
    sync: boolean;
    startValue: StartValueType;
    destroy: DestroyType;
}
