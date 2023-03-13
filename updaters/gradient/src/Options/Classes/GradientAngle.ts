import {
    type IAnimatable,
    type IAnimation,
    type IOptionLoader,
    type RecursivePartial,
    RotateDirection,
    type RotateDirectionAlt,
} from "tsparticles-engine";
import { GradientAngleAnimation } from "./GradientAngleAnimation";
import type { IGradientAngle } from "../Interfaces/Gradients";

export class GradientAngle
    implements IGradientAngle, IAnimatable<IAnimation>, IOptionLoader<IGradientAngle & IAnimatable<IAnimation>>
{
    animation;
    direction: RotateDirection | keyof typeof RotateDirection | RotateDirectionAlt;
    value;

    constructor() {
        this.value = 0;
        this.animation = new GradientAngleAnimation();
        this.direction = RotateDirection.clockwise;
    }

    load(data?: RecursivePartial<IGradientAngle & IAnimatable<IAnimation>>): void {
        if (!data) {
            return;
        }

        this.animation.load(data.animation);

        if (data.value !== undefined) {
            this.value = data.value;
        }

        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
    }
}
