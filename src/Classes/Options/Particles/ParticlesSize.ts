import type { ISize } from "../../../Interfaces/Options/Particles/ISize";
import { ParticlesSizeAnimation } from "./ParticlesSizeAnimation";
import type { ISizeAnimation } from "../../../Interfaces/Options/Particles/ISizeAnimation";
import type { RecursivePartial } from "../../../Types/RecursivePartial";

export class ParticlesSize implements ISize {
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
    public random: boolean;
    public value: number;

    constructor() {
        this.animation = new ParticlesSizeAnimation();
        this.random = false;
        this.value = 3;
    }

    public load(data?: RecursivePartial<ISize>): void {
        if (data !== undefined) {
            if (data.animation !== undefined) {
                this.animation.load(data.animation);
            } else if (data.anim !== undefined) {
                this.anim.load(data.anim);
            }

            if (data.random !== undefined) {
                this.random = data.random;
            }

            if (data.value !== undefined) {
                this.value = data.value;
            }
        }
    }
}
