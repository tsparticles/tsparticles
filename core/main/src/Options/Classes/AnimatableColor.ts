import type { IAnimatableColor } from "../Interfaces/IAnimatableColor";
import { OptionsColor } from "./OptionsColor";
import type { RecursivePartial } from "../../Types";
import { ColorAnimation } from "./ColorAnimation";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";

/**
 * [[include:Options/Particles/Color.md]]
 * @category Options
 */
export class AnimatableColor extends OptionsColor implements IAnimatableColor, IOptionLoader<IAnimatableColor> {
    public animation;

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
