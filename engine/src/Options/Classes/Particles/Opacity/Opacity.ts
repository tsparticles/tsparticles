import type { IOpacity } from "../../../Interfaces/Particles/Opacity/IOpacity";
import { OpacityAnimation } from "./OpacityAnimation";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { ValueWithRandom } from "../../ValueWithRandom";
import { setRangeValue } from "../../../../Utils";
import { IAnimatable } from "../../../Interfaces/IAnimatable";

/**
 * [[include:Options/Particles/Opacity.md]]
 * @category Options
 */
export class Opacity
    extends ValueWithRandom
    implements IAnimatable<OpacityAnimation>, IOpacity, IOptionLoader<IOpacity>
{
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

    animation;

    constructor() {
        super();
        this.animation = new OpacityAnimation();
        this.random.minimumValue = 0.1;
        this.value = 1;
    }

    load(data?: RecursivePartial<IOpacity>): void {
        if (!data) {
            return;
        }

        super.load(data);

        this.animation.load(data.animation ?? data.anim);

        if (this.animation.enable) {
            this.value = setRangeValue(this.value, this.animation.minimumValue);
        }
    }
}
