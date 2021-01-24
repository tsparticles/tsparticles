import type { ISize } from "../../../Interfaces/Particles/Size/ISize";
import { SizeAnimation } from "./SizeAnimation";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { ValueWithRandom } from "../../ValueWithRandom";
import { setRangeValue } from "../../../../Utils";
import type { IAnimatable } from "../../../Interfaces/IAnimatable";

/**
 * [[include:Options/Particles/Size.md]]
 * @category Options
 */
export class Size extends ValueWithRandom implements IAnimatable<SizeAnimation>, ISize, IOptionLoader<ISize> {
    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     */
    public get anim(): SizeAnimation {
        return this.animation;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     * @param value
     */
    public set anim(value: SizeAnimation) {
        this.animation = value;
    }

    public animation;

    constructor() {
        super();
        this.animation = new SizeAnimation();
        this.random.minimumValue = 1;
        this.value = 3;
    }

    public load(data?: RecursivePartial<ISize>): void {
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
