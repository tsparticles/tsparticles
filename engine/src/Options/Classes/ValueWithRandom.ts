import { AnimationOptions, RangedAnimationOptions } from "./AnimationOptions.js";
import type {
    IAnimationValueWithRandom,
    IRangedAnimationValueWithRandom,
    IValueWithRandom,
} from "../Interfaces/IValueWithRandom.js";
import type { IOptionLoader } from "../Interfaces/IOptionLoader.js";
import { Random } from "./Random.js";
import type { RangeValue } from "../../Types/RangeValue.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import { isBoolean } from "../../Utils/Utils.js";
import { setRangeValue } from "../../Utils/NumberUtils.js";

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
