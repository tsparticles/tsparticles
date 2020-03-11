import {ISize} from "../../../Interfaces/Options/Particles/ISize";
import {ParticlesSizeAnimation} from "./ParticlesSizeAnimation";
import {ISizeAnimation} from "../../../Interfaces/Options/Particles/ISizeAnimation";
import {Messages} from "../../Utils/Messages";
import {Utils} from "../../Utils/Utils";

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
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.animation)) {
                this.animation.load(data.animation);
            }

            if (Utils.hasData(data.anim)) {
                this.anim.load(data.anim);
            }

            if (Utils.hasData(data.random)) {
                this.random = data.random;
            }

            if (Utils.hasData(data.value)) {
                this.value = data.value;
            }
        }
    }
}
