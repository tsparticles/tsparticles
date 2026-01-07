import { AnimationOptions, RangedAnimationOptions } from "./AnimationOptions.js";
import type {
    IAnimationValueWithRandom,
    IRangedAnimationValueWithRandom,
    IValueWithRandom,
} from "../Interfaces/IValueWithRandom.js";
import type { IOptionLoader } from "../Interfaces/IOptionLoader.js";
import type { RangeValue } from "../../Types/RangeValue.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import { isNull } from "../../Utils/TypeUtils.js";
import { setRangeValue } from "../../Utils/MathUtils.js";

export class ValueWithRandom implements IValueWithRandom, IOptionLoader<IValueWithRandom> {
    value: RangeValue;

    constructor() {
        this.value = 0;
    }

    load(data?: RecursivePartial<IValueWithRandom>): void {
        if (isNull(data)) {
            return;
        }

        if (!isNull(data.value)) {
            this.value = setRangeValue(data.value);
        }
    }
}

export class AnimationValueWithRandom extends ValueWithRandom implements IOptionLoader<IAnimationValueWithRandom> {
    readonly animation;

    constructor() {
        super();

        this.animation = new AnimationOptions();
    }

    override load(data?: RecursivePartial<IAnimationValueWithRandom>): void {
        super.load(data);

        if (isNull(data)) {
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
    override readonly animation: RangedAnimationOptions;

    constructor() {
        super();

        this.animation = new RangedAnimationOptions();
    }

    override load(data?: RecursivePartial<IRangedAnimationValueWithRandom>): void {
        super.load(data);
    }
}
