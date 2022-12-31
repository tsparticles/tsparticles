import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { ISize } from "../../../Interfaces/Particles/Size/ISize";
import { RangedAnimationValueWithRandom } from "../../ValueWithRandom";
import { SizeAnimation } from "./SizeAnimation";

/**
 * [[include:Options/Particles/Size.md]]
 * @category Options
 */
export class Size extends RangedAnimationValueWithRandom implements ISize, IOptionLoader<ISize> {
    animation;

    constructor() {
        super();

        this.animation = new SizeAnimation();
        this.random.minimumValue = 1;
        this.value = 3;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     */
    get anim(): SizeAnimation {
        return this.animation;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     * @param value
     */
    set anim(value: SizeAnimation) {
        this.animation = value;
    }
}
