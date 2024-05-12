import { GradientType, type IOptionLoader, type RecursivePartial } from "@tsparticles/engine";
import { AnimatableGradientColor } from "./AnimatableGradientColor.js";
import { GradientAngle } from "./GradientAngle.js";
import type { IAnimatableGradient } from "../Interfaces/IAnimatableGradient.js";

export class AnimatableGradient implements IAnimatableGradient, IOptionLoader<IAnimatableGradient> {
    angle: GradientAngle;
    colors: AnimatableGradientColor[];
    type: GradientType;

    constructor() {
        this.angle = new GradientAngle();
        this.colors = [];
        this.type = GradientType.random;
    }

    load(data?: RecursivePartial<IAnimatableGradient>): void {
        if (!data) {
            return;
        }

        this.angle.load(data.angle);

        if (data.colors !== undefined) {
            this.colors = data.colors.map(s => {
                const tmp = new AnimatableGradientColor();

                tmp.load(s);

                return tmp;
            });
        }

        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}
