import type { IOpacityAnimation } from "../../../Interfaces/Particles/Opacity/IOpacityAnimation";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { DestroyType, StartValueType } from "../../../../Enums";
import { AnimationOptions } from "../../AnimationOptions";

/**
 * @category Options
 */
export class OpacityAnimation extends AnimationOptions implements IOpacityAnimation, IOptionLoader<IOpacityAnimation> {
    /**
     *
     * @deprecated this property is obsolete, please use the new minimumValue
     */
    get opacity_min(): number | undefined {
        return this.minimumValue;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new minimumValue
     * @param value
     */
    set opacity_min(value: number | undefined) {
        this.minimumValue = value;
    }

    /**
     * @deprecated this property is obsolete, please use the new min/max object in the opacity value
     */
    minimumValue?: number;

    destroy: DestroyType | keyof typeof DestroyType;
    startValue: StartValueType | keyof typeof StartValueType;

    constructor() {
        super();
        this.destroy = DestroyType.none;
        this.enable = false;
        this.speed = 2;
        this.startValue = StartValueType.random;
        this.sync = false;
    }

    load(data?: RecursivePartial<IOpacityAnimation>): void {
        if (data === undefined) {
            return;
        }

        super.load(data);

        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        this.minimumValue = data.minimumValue ?? data.opacity_min;

        if (data.speed !== undefined) {
            this.speed = data.speed;
        }

        if (data.startValue !== undefined) {
            this.startValue = data.startValue;
        }

        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
