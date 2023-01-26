import type { IAnimation, IRangedAnimation } from "../Interfaces/IAnimation";
import { AnimationMode } from "../../Enums/Modes/AnimationMode";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { RangeValue } from "../../Types/RangeValue";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import { StartValueType } from "../../Enums/Types/StartValueType";
import { setRangeValue } from "../../Utils/NumberUtils";

export class AnimationOptions implements IAnimation, IOptionLoader<IAnimation> {
    count: RangeValue;
    decay: RangeValue;
    enable: boolean;
    speed: RangeValue;
    sync: boolean;

    constructor() {
        this.count = 0;
        this.enable = false;
        this.speed = 1;
        this.decay = 0;
        this.sync = false;
    }

    load(data?: RecursivePartial<IAnimation>): void {
        if (!data) {
            return;
        }

        if (data.count !== undefined) {
            this.count = setRangeValue(data.count);
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.speed !== undefined) {
            this.speed = setRangeValue(data.speed);
        }

        if (data.decay !== undefined) {
            this.decay = setRangeValue(data.decay);
        }

        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}

export class RangedAnimationOptions extends AnimationOptions implements IOptionLoader<IRangedAnimation> {
    /**
     * @deprecated this property is obsolete, please use the new min/max object in the size value
     */
    minimumValue?: number;

    mode: AnimationMode | keyof typeof AnimationMode;

    startValue: StartValueType | keyof typeof StartValueType;

    constructor() {
        super();

        this.mode = AnimationMode.auto;
        this.startValue = StartValueType.random;
    }

    load(data?: RecursivePartial<IRangedAnimation>): void {
        super.load(data);

        if (!data) {
            return;
        }

        if (data.minimumValue !== undefined) {
            this.minimumValue = data.minimumValue;
        }

        if (data.mode !== undefined) {
            this.mode = data.mode;
        }

        if (data.startValue !== undefined) {
            this.startValue = data.startValue;
        }
    }
}
