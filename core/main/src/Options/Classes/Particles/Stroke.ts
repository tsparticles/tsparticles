import type { IStroke } from "../../Interfaces/Particles/IStroke";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { AnimatableColor } from "./AnimatableColor";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";

export class Stroke implements IStroke, IOptionLoader<IStroke> {
    public color?: AnimatableColor;
    public width: number;
    public opacity?: number;

    constructor() {
        this.width = 0;
    }

    public load(data?: RecursivePartial<IStroke>): void {
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
