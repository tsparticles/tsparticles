import type { IOpacity } from "../../../Interfaces/Particles/Opacity/IOpacity";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { OpacityAnimation } from "./OpacityAnimation";
import { RangedAnimationValueWithRandom } from "../../ValueWithRandom";

/**
 * [[include:Options/Particles/Opacity.md]]
 * @category Options
 */
export class Opacity extends RangedAnimationValueWithRandom implements IOpacity, IOptionLoader<IOpacity> {
    animation;

    constructor() {
        super();

        this.animation = new OpacityAnimation();
        this.random.minimumValue = 0.1;
        this.value = 1;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     */
    get anim(): OpacityAnimation {
        return this.animation;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     * @param value
     */
    set anim(value: OpacityAnimation) {
        this.animation = value;
    }
}
