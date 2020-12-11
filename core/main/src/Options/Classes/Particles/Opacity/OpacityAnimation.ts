import type { IOpacityAnimation } from "../../../Interfaces/Particles/Opacity/IOpacityAnimation";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { DestroyType, StartValueType } from "../../../../Enums/Types";
import { AnimationOptions } from "../../AnimationOptions";

/**
 * @category Options
 */
export class OpacityAnimation extends AnimationOptions implements IOpacityAnimation, IOptionLoader<IOpacityAnimation> {
    /**
     * @deprecated use the new Range syntax
     */
    public get opacity_min(): number | undefined {
        return this.minimumValue;
    }

    /**
     * @deprecated use the new Range syntax
     */
    public set opacity_min(value: number | undefined) {
        this.minimumValue = value;
    }

    /**
     * @deprecated use the new Range syntax
     */
    public minimumValue?: number;

    public destroy: DestroyType | keyof typeof DestroyType;
    public startValue: StartValueType | keyof typeof StartValueType;

    constructor() {
        super();
        this.count = 0;
        this.destroy = DestroyType.none;
        this.enable = false;
        this.speed = 2;
        this.startValue = StartValueType.random;
        this.sync = false;
    }

    public load(data?: RecursivePartial<IOpacityAnimation>): void {
        super.load(data);

        if (data === undefined) {
            return;
        }

        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }

        this.minimumValue = data.minimumValue ?? data.opacity_min;

        if (data.startValue !== undefined) {
            this.startValue = data.startValue;
        }
    }
}
