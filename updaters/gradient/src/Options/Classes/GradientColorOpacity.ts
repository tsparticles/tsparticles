import {
    type IAnimatable,
    type IAnimation,
    type IOptionLoader,
    type RangeValue,
    type RecursivePartial,
    setRangeValue,
} from "@tsparticles/engine";
import { GradientColorOpacityAnimation } from "./GradientColorOpacityAnimation.js";
import type { IGradientColorOpacity } from "../Interfaces/Gradients.js";
import type { IGradientColorOpacityAnimation } from "../Interfaces/IOptionsGradient.js";

export class GradientColorOpacity
    implements
        IGradientColorOpacity,
        IAnimatable<GradientColorOpacityAnimation>,
        IOptionLoader<IGradientColorOpacity & IAnimatable<IGradientColorOpacityAnimation>>
{
    animation;
    value: RangeValue;

    constructor() {
        this.value = 0;
        this.animation = new GradientColorOpacityAnimation();
    }

    load(data?: RecursivePartial<IGradientColorOpacity & IAnimatable<IAnimation>>): void {
        if (!data) {
            return;
        }

        this.animation.load(data.animation);

        if (data.value !== undefined) {
            this.value = setRangeValue(data.value);
        }
    }
}
