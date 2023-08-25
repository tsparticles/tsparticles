import { AnimatableColor } from "../AnimatableColor.js";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader.js";
import type { IStroke } from "../../Interfaces/Particles/IStroke.js";
import type { RangeValue } from "../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
import { setRangeValue } from "../../../Utils/NumberUtils.js";

/**
 * [[include:Options/Particles/Stroke.md]]
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
