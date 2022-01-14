import type { RecursivePartial, SingleOrMultiple } from "../../Types";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { IColorAnimation } from "../Interfaces/IColorAnimation";
import type { IHslAnimation } from "../Interfaces/IHslAnimation";
import { OptionsColor } from "./OptionsColor";
import { HslAnimation } from ".";
import { IAnimatableColor } from "..";

/**
 * [[include:Options/Particles/Color.md]]
 * @category Options
 */
export class AnimatableColor extends OptionsColor implements IAnimatableColor, IOptionLoader<IAnimatableColor> {
    animation;

    constructor() {
        super();

        this.animation = new HslAnimation();
    }

    static create(
        source?: AnimatableColor,
        data?: SingleOrMultiple<string> | RecursivePartial<IAnimatableColor>
    ): AnimatableColor {
        const color = new AnimatableColor();

        color.load(source);

        if (data !== undefined) {
            if (typeof data === "string" || data instanceof Array) {
                color.load({ value: data });
            } else {
                color.load(data);
            }
        }

        return color;
    }

    load(data?: RecursivePartial<IAnimatableColor>): void {
        super.load(data);

        if (!data) {
            return;
        }

        const colorAnimation = data.animation as IColorAnimation;

        if (colorAnimation !== undefined) {
            if (colorAnimation.enable !== undefined) {
                this.animation.h.load(colorAnimation);
            } else {
                this.animation.load(data.animation as IHslAnimation);
            }
        }
    }
}
