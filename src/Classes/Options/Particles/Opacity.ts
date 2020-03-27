import type { IOpacity } from "../../../Interfaces/Options/Particles/IOpacity";
import { OpacityAnimation } from "./OpacityAnimation";
import type { IOpacityAnimation } from "../../../Interfaces/Options/Particles/IOpacityAnimation";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import type { IRandomOpacity } from "../../../Interfaces/Options/Particles/IRandomOpacity";
import { RandomOpacity } from "./RandomOpacity";

export class Opacity implements IOpacity {
    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     */
    public get anim(): IOpacityAnimation {
        return this.animation;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     * @param value
     */
    public set anim(value: IOpacityAnimation) {
        this.animation = value;
    }

    public animation: IOpacityAnimation;
    public random: boolean | IRandomOpacity;
    public value: number;

    constructor() {
        this.animation = new OpacityAnimation();
        this.random = new RandomOpacity();
        this.value = 1;
    }

    public load(data?: RecursivePartial<IOpacity>): void {
        if (data !== undefined) {
            if (data.animation !== undefined) {
                this.animation.load(data.animation);
            } else if (data.anim !== undefined) {
                this.anim.load(data.anim);
            }

            if (data.random !== undefined) {
                const random = this.random as IRandomOpacity;

                if (typeof data.random === "boolean") {
                    random.enable = data.random;
                } else {
                    random.load(data.random);
                }
            }

            if (data.value !== undefined) {
                this.value = data.value;
            }
        }
    }
}
