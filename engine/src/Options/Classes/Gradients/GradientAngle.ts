import { GradientAngleAnimation } from "./GradientAngleAnimation";
import type { IAnimatable } from "../../Interfaces/IAnimatable";
import type { IAnimation } from "../../Interfaces/IAnimation";
import type { IGradientAngle } from "../../../Core/Interfaces/Gradients";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { RotateDirection } from "../../../Enums/Directions/RotateDirection";
import type { RotateDirectionAlt } from "../../../Enums/Directions/RotateDirection";

export class GradientAngle
    implements IGradientAngle, IAnimatable<IAnimation>, IOptionLoader<IGradientAngle & IAnimatable<IAnimation>> {
    animation;
    value;
    direction: RotateDirection | keyof typeof RotateDirection | RotateDirectionAlt;

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
