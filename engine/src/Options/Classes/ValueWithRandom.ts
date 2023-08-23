import { AnimationOptions, RangedAnimationOptions } from "./AnimationOptions";
import type {
    IAnimationValueWithRandom,
    IRangedAnimationValueWithRandom,
    IValueWithRandom,
} from "../Interfaces/IValueWithRandom";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import { Random } from "./Random";
import type { RangeValue } from "../../Types/RangeValue";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import { isBoolean } from "../../Utils/Utils";
import { setRangeValue } from "../../Utils/NumberUtils";

export class ValueWithRandom implements IValueWithRandom, IOptionLoader<IValueWithRandom> {
    /**
     * @deprecated use the new {@link RangeValue} type instead
     */
    random: Random;

    value: RangeValue;

    constructor() {
        this.random = new Random();
        this.value = 0;
    }

    load(data?: RecursivePartial<IValueWithRandom>): void {
        if (!data) {
            return;
        }

        if (isBoolean(data.random)) {
            this.random.enable = data.random;
        } else {
            this.random.load(data.random);
        }

        if (data.value !== undefined) {
            this.value = setRangeValue(data.value, this.random.enable ? this.random.minimumValue : undefined);
        }
    }
}

export class AnimationValueWithRandom extends ValueWithRandom implements IOptionLoader<IAnimationValueWithRandom> {
    animation;

    constructor() {
        super();

        this.animation = new AnimationOptions();
    }

    load(data?: RecursivePartial<IAnimationValueWithRandom>): void {
        super.load(data);

        if (!data) {
            return;
        }

        const animation = data.animation;

        if (animation !== undefined) {
            this.animation.load(animation);
        }
    }
}

export class RangedAnimationValueWithRandom
    extends AnimationValueWithRandom
    implements IOptionLoader<IRangedAnimationValueWithRandom>
{
    animation: RangedAnimationOptions;

    constructor() {
        super();

        this.animation = new RangedAnimationOptions();
    }

    load(data?: RecursivePartial<IRangedAnimationValueWithRandom>): void {
        super.load(data);
    }
}
