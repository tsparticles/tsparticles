import type { IOpacity } from "../../../Interfaces/Particles/Opacity/IOpacity";
import { OpacityAnimation } from "./OpacityAnimation";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { ValueWithRandom } from "../../ValueWithRandom";

/**
 * [[include:Options/Particles/Opacity.md]]
 * @category Options
 */
export class Opacity extends ValueWithRandom implements IOpacity, IOptionLoader<IOpacity> {
    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     */
    public get anim(): OpacityAnimation {
        return this.animation;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     * @param value
     */
    public set anim(value: OpacityAnimation) {
        this.animation = value;
    }

    public animation;

    constructor() {
        super();
        this.animation = new OpacityAnimation();
        this.random.minimumValue = 0.1;
        this.value = 1;
    }

    public load(data?: RecursivePartial<IOpacity>): void {
        if (!data) {
            return;
        }

        super.load(data);

        this.animation.load(data.animation ?? data.anim);

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
