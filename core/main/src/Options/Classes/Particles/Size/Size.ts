import type { ISize } from "../../../Interfaces/Particles/Size/ISize";
import { SizeAnimation } from "./SizeAnimation";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { ValueWithRandom } from "../../ValueWithRandom";

/**
 * [[include:Options/Particles/Size.md]]
 * @category Options
 */
export class Size extends ValueWithRandom implements ISize, IOptionLoader<ISize> {
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

        const animation = data.animation ?? data.anim;

        if (animation !== undefined) {
            this.animation.load(animation);
        }

        if (this.animation.enable) {
            if (this.animation.minimumValue !== undefined) {
                if (typeof this.value === "number") {
                    this.value = {
                        min: Math.min(this.animation.minimumValue, this.value),
                        max: Math.max(this.animation.minimumValue, this.value),
                    };
                } else {
                    this.value = {
                        min: Math.min(this.animation.minimumValue, this.value.min),
                        max: Math.max(this.animation.minimumValue, this.value.max),
                    };
                }
            }
        }
    }
}
