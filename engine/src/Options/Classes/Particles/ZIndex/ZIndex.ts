import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { IZIndex } from "../../../Interfaces/Particles/ZIndex/IZIndex.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { ValueWithRandom } from "../../ValueWithRandom.js";
import { isNull } from "../../../../Utils/TypeUtils.js";

/**
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

    override load(data?: RecursivePartial<IZIndex>): void {
        super.load(data);

        if (isNull(data)) {
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
