import type {
    IAnimationValueWithRandom,
    IRangedAnimationValueWithRandom,
    IValueWithRandom,
} from "../Interfaces/IValueWithRandom";
import { AnimationOptions } from "./AnimationOptions";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { ISize } from "../Interfaces/Particles/Size/ISize";
import { Random } from "./Random";
import type { RangeValue } from "../../Types/RangeValue";
import { RangedAnimationOptions } from "./AnimationOptions";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import { setRangeValue } from "../../Utils/NumberUtils";

export class ValueWithRandom implements IValueWithRandom, IOptionLoader<IValueWithRandom> {
    /**
     * @deprecated use the new [[RangeValue]] type instead
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

        if (typeof data.random === "boolean") {
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

    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     */
    get anim(): AnimationOptions {
        return this.animation;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     * @param value
     */
    set anim(value: AnimationOptions) {
        this.animation = value;
    }

    load(data?: RecursivePartial<ISize>): void {
        super.load(data);

        if (!data) {
            return;
        }

        const animation = data.animation ?? data.anim;

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

        if (!data) {
            return;
        }

        if (data.animation !== undefined) {
            this.value = setRangeValue(this.value, this.animation.enable ? this.animation.minimumValue : undefined);
        }
    }
}
