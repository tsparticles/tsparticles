import type { ISize } from "../../../Interfaces/Particles/Size/ISize";
import { SizeAnimation } from "./SizeAnimation";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { ValueWithRandom } from "../../ValueWithRandom";
import { NumberUtils } from "../../../../Utils";

/**
 * [[include:Options/Particles/Size.md]]
 * @category Options
 */
export class Size extends ValueWithRandom implements ISize, IOptionLoader<ISize> {
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

    animation;

    constructor() {
        super();
        this.animation = new SizeAnimation();
        this.random.minimumValue = 1;
        this.value = 3;
    }

    load(data?: RecursivePartial<ISize>): void {
        if (!data) {
            return;
        }

        super.load(data);

        const animation = data.animation ?? data.anim;

        if (animation !== undefined) {
            this.animation.load(animation);

            this.value = NumberUtils.setRangeValue(
                this.value,
                this.animation.enable ? this.animation.minimumValue : undefined
            );
        }
    }
}
