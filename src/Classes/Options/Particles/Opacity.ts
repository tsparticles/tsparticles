import {IOpacity} from "../../../Interfaces/Options/Particles/IOpacity";
import {OpacityAnimation} from "./OpacityAnimation";
import {IOpacityAnimation} from "../../../Interfaces/Options/Particles/IOpacityAnimation";
import {Messages} from "../../Utils/Messages";
import {Utils} from "../../Utils/Utils";

export class Opacity implements IOpacity {
    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     */
    public get anim(): IOpacityAnimation {
        Messages.deprecated("particles.opacity.anim", "particles.opacity.animation");

        return this.animation;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     * @param value
     */
    public set anim(value: IOpacityAnimation) {
        Messages.deprecated("particles.opacity.anim", "particles.opacity.animation");

        this.animation = value;
    }

    public animation: IOpacityAnimation;
    public random: boolean;
    public value: number;

    constructor() {
        this.animation = new OpacityAnimation();
        this.random = false;
        this.value = 1;
    }

    public load(data: IOpacity): void {
        if (Utils.hasData(data)) {
            this.animation.load(data.animation ?? data.anim);

            if (Utils.hasData(data.random)) {
                this.random = data.random;
            }

            if (Utils.hasData(data.value)) {
                this.value = data.value;
            }
        }
    }
}
