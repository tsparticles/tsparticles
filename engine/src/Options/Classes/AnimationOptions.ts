import type { IAnimation, IRangedAnimation } from "../Interfaces/IAnimation.js";
import { AnimationMode } from "../../Enums/Modes/AnimationMode.js";
import type { IOptionLoader } from "../Interfaces/IOptionLoader.js";
import type { RangeValue } from "../../Types/RangeValue.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import { StartValueType } from "../../Enums/Types/StartValueType.js";
import { setRangeValue } from "../../Utils/NumberUtils.js";

export class AnimationOptions implements IAnimation, IOptionLoader<IAnimation> {
    count: RangeValue;
    decay: RangeValue;
    delay: RangeValue;
    enable: boolean;
    speed: RangeValue;
    sync: boolean;

    constructor() {
        this.count = 0;
        this.enable = false;
        this.speed = 1;
        this.decay = 0;
        this.delay = 0;
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

        if (data.delay !== undefined) {
            this.delay = setRangeValue(data.delay);
        }

        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}

export class RangedAnimationOptions extends AnimationOptions implements IOptionLoader<IRangedAnimation> {
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

        if (data.mode !== undefined) {
            this.mode = data.mode;
        }

        if (data.startValue !== undefined) {
            this.startValue = data.startValue;
        }
    }
}
