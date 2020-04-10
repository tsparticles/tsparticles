import type {ISize} from "../../../Interfaces/Options/Particles/ISize";
import {SizeAnimation} from "./SizeAnimation";
import type {ISizeAnimation} from "../../../Interfaces/Options/Particles/ISizeAnimation";
import type {RecursivePartial} from "../../../Types/RecursivePartial";
import type {IRandomSize} from "../../../Interfaces/Options/Particles/IRandomSize";
import {RandomSize} from "./RandomSize";

export class Size implements ISize {
    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     */
    public get anim(): ISizeAnimation {
        return this.animation;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     * @param value
     */
    public set anim(value: ISizeAnimation) {
        this.animation = value;
    }

    public animation: ISizeAnimation;
    public random: IRandomSize;
    public value: number;

    constructor() {
        this.animation = new SizeAnimation();
        this.random = new RandomSize;
        this.value = 3;
    }

    public load(data?: RecursivePartial<ISize>): void {
        if (data !== undefined) {
            const animation = data.animation ?? data.anim;

            if (animation !== undefined) {
                this.animation.load(animation);
            }

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
}
