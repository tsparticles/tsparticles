import type { IZIndex } from "../../../Interfaces/Particles/ZIndex/IZIndex";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class ZIndex implements IZIndex, IOptionLoader<IZIndex> {
    public value;
    public opacityRate;
    public sizeRate;
    public velocityRate;

    constructor() {
        this.value = 0;
        this.opacityRate = 0;
        this.sizeRate = 0;
        this.velocityRate = 0;
    }

    public load(data?: RecursivePartial<IZIndex>): void {
        if (data === undefined) {
            return;
        }

        if (data.value !== undefined) {
            this.value = data.value;
            // Cap z-index it between -10000 and 10000.
            this.value = Math.max(-10000, Math.min(10000, this.value));
        }

        if (data.opacityRate !== undefined) {
            this.opacityRate = data.opacityRate;
        }

        if (data.sizeRate !== undefined) {
            this.sizeRate = data.sizeRate;
        }

        if (data.velocityRate !== undefined) {
            this.velocityRate = data.velocityRate;
        }
    }
}
