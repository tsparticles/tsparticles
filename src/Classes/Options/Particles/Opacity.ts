import {IOpacity} from "../../../Interfaces/Options/Particles/IOpacity";
import {OpacityAnimation} from "./OpacityAnimation";

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
    public random: boolean;
    public value: number;

    constructor() {
        this.animation = new OpacityAnimation();
        this.random = false;
        this.value = 1;
    }
}
