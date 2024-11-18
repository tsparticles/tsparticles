import {
    type IAnimatable,
    type IAnimation,
    type IOptionLoader,
    type RangeValue,
    type RecursivePartial,
    RotateDirection,
    type RotateDirectionAlt,
    isNull,
    setRangeValue,
} from "@tsparticles/engine";
import { GradientAngleAnimation } from "./GradientAngleAnimation.js";
import type { IGradientAngle } from "../Interfaces/Gradients.js";

export class GradientAngle
    implements IGradientAngle, IAnimatable<IAnimation>, IOptionLoader<IGradientAngle & IAnimatable<IAnimation>>
{
    animation;
    direction: RotateDirection | keyof typeof RotateDirection | RotateDirectionAlt;
    value: RangeValue;

    constructor() {
        this.value = 0;
        this.animation = new GradientAngleAnimation();
        this.direction = RotateDirection.clockwise;
    }

    load(data?: RecursivePartial<IGradientAngle & IAnimatable<IAnimation>>): void {
        if (isNull(data)) {
            return;
        }

        this.animation.load(data.animation);

        if (data.value !== undefined) {
            this.value = setRangeValue(data.value);
        }

        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
    }
}
