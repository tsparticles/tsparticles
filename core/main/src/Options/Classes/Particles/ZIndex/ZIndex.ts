import type { IZIndex } from "../../../Interfaces/Particles/ZIndex/IZIndex";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class ZIndex implements IZIndex, IOptionLoader<IZIndex> {
    value;
    opacity_rate;
    size_rate;
    velocity_rate;

    constructor() {
        this.value = 0;
        this.opacity_rate = 0;
        this.size_rate = 0;
        this.velocity_rate = 0;
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

        if (data.opacity_rate !== undefined) {
            this.opacity_rate = data.opacity_rate;
        }

        if (data.size_rate !== undefined) {
            this.size_rate = data.size_rate;
        }

        if (data.velocity_rate !== undefined) {
            this.velocity_rate = data.velocity_rate;
        }
    }
}
