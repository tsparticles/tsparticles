import {ISize} from "../../../Interfaces/Options/Particles/ISize";
import {ParticlesSizeAnimation} from "./ParticlesSizeAnimation";

export class ParticlesSize implements ISize {
    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     */
    public get anim(): ParticlesSizeAnimation {
        return this.animation;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     * @param value
     */
    public set anim(value: ParticlesSizeAnimation) {
        this.animation = value;
    }

    public animation: ParticlesSizeAnimation;
    public random: boolean;
    public value: number;

    constructor() {
        this.animation = new ParticlesSizeAnimation();
        this.random = false;
        this.value = 20;
    }
}
