import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import { AnimatableGradientColor } from "./AnimatableGradientColor";
import { GradientAngle } from "./GradientAngle";
import { GradientType } from "tsparticles-engine";
import type { IAnimatableGradient } from "../Interfaces/IAnimatableGradient";

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
            this.colors = data.colors.map((s) => {
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
