import { AnimatableColor } from "../AnimatableColor";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { IStroke } from "../../Interfaces/Particles/IStroke";
import type { RangeValue } from "../../../Types/RangeValue";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { setRangeValue } from "../../../Utils/NumberUtils";

/**
 * [[include:Options/Particles/Stroke.md]]
 * @category Options
 */
export class Stroke implements IStroke, IOptionLoader<IStroke> {
    color?: AnimatableColor;
    opacity?: RangeValue;
    width: RangeValue;

    constructor() {
        this.width = 0;
    }

    load(data?: RecursivePartial<IStroke>): void {
        if (!data) {
            return;
        }

        if (data.color !== undefined) {
            this.color = AnimatableColor.create(this.color, data.color);
        }

        if (data.width !== undefined) {
            this.width = setRangeValue(data.width);
        }

        if (data.opacity !== undefined) {
            this.opacity = setRangeValue(data.opacity);
        }
    }
}
