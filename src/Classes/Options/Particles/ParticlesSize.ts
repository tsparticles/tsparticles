import {ISize} from "../../../Interfaces/Options/Particles/ISize";
import {ParticlesSizeAnimation} from "./ParticlesSizeAnimation";
import {ISizeAnimation} from "../../../Interfaces/Options/Particles/ISizeAnimation";

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
        this.value = 20;
    }
}
