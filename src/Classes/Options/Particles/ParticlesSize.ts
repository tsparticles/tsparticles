import {ISize} from "../../../Interfaces/Options/Particles/ISize";
import {ParticlesSizeAnimation} from "./ParticlesSizeAnimation";
import {ISizeAnimation} from "../../../Interfaces/Options/Particles/ISizeAnimation";
import {Messages} from "../../Utils/Messages";

export class ParticlesSize implements ISize {
    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     */
    public get anim(): ISizeAnimation {
        Messages.deprecated("particles.size.anim", "particles.size.animation");

        return this.animation;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     * @param value
     */
    public set anim(value: ISizeAnimation) {
        Messages.deprecated("particles.size.anim", "particles.size.animation");

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

    public load(data: ISize): void {
        this.animation.load(data.animation);
        this.random = data.random;
        this.value = data.value;
    }
}
