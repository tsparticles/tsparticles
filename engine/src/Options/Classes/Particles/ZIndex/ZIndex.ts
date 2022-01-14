import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IZIndex } from "../../../Interfaces/Particles/ZIndex/IZIndex";
import type { RecursivePartial } from "../../../../Types";
import { ValueWithRandom } from "../../ValueWithRandom";

/**
 * @category Options
 */
export class ZIndex extends ValueWithRandom implements IZIndex, IOptionLoader<IZIndex> {
    opacityRate;
    sizeRate;
    velocityRate;

    constructor() {
        super();
        this.opacityRate = 1;
        this.sizeRate = 1;
        this.velocityRate = 1;
    }

    load(data?: RecursivePartial<IZIndex>): void {
        super.load(data);

        if (!data) {
            return;
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
