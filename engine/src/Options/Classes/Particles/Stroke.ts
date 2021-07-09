import type { IStroke } from "../../Interfaces/Particles/IStroke";
import type { RecursivePartial } from "../../../Types";
import { AnimatableColor } from "./AnimatableColor";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";

/**
 * [[include:Options/Particles/Stroke.md]]
 * @category Options
 */
export class Stroke implements IStroke, IOptionLoader<IStroke> {
    color?: AnimatableColor;
    width;
    opacity?: number;

    constructor() {
        this.width = 0;
    }

    load(data?: RecursivePartial<IStroke>): void {
        if (data === undefined) {
            return;
        }

        if (data.color !== undefined) {
            this.color = AnimatableColor.create(this.color, data.color);
        }

        if (data.width !== undefined) {
            this.width = data.width;
        }

        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
