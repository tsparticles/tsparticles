import type { IOpacity } from "../../../Interfaces/Particles/Opacity/IOpacity";
import { OpacityAnimation } from "./OpacityAnimation";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { OpacityRandom } from "./OpacityRandom";

export class Opacity implements IOpacity {
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

    public animation: OpacityAnimation;
    public random: OpacityRandom;
    public value: number;

    constructor() {
        this.animation = new OpacityAnimation();
        this.random = new OpacityRandom();
        this.value = 1;
    }

    public load(data?: RecursivePartial<IOpacity>): void {
        if (data === undefined) {
            return;
        }

        this.animation.load(data.animation ?? data.anim);

        if (data.random !== undefined) {
            if (typeof data.random === "boolean") {
                this.random.enable = data.random;
            } else {
                this.random.load(data.random);
            }
        }

        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
