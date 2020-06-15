import type { IAnimatableColor } from "../../Interfaces/Particles/IAnimatableColor";
import { OptionsColor } from "../OptionsColor";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { ColorAnimation } from "./ColorAnimation";

export class AnimatableColor extends OptionsColor implements IAnimatableColor {
    public animation: ColorAnimation;

    constructor() {
        super();

        this.animation = new ColorAnimation();
    }

    public static create(
        source?: AnimatableColor,
        data?: string | RecursivePartial<IAnimatableColor>
    ): AnimatableColor {
        const color = source ?? new AnimatableColor();

        if (data !== undefined) {
            color.load(typeof data === "string" ? { value: data } : data);
        }

        return color;
    }

    public load(data?: RecursivePartial<IAnimatableColor>): void {
        super.load(data);

        this.animation.load(data?.animation);
    }
}
