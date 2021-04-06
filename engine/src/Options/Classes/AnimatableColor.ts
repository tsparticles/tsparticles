import type { IAnimatableColor } from "../Interfaces/IAnimatableColor";
import { OptionsColor } from "./OptionsColor";
import type { RecursivePartial } from "../../Types";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import { HslAnimation } from "./HslAnimation";
import type { IColorAnimation } from "../Interfaces/IColorAnimation";
import type { IHslAnimation } from "../Interfaces/IHslAnimation";

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

    static create(source?: AnimatableColor, data?: string | RecursivePartial<IAnimatableColor>): AnimatableColor {
        const color = source ?? new AnimatableColor();

        if (data !== undefined) {
            color.load(typeof data === "string" ? { value: data } : data);
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
