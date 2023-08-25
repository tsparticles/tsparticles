import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates.js";
import type { IMoveAttract } from "../../../Interfaces/Particles/Move/IMoveAttract.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { setRangeValue } from "../../../../Utils/NumberUtils.js";

/**
 */
export class MoveAttract implements IMoveAttract, IOptionLoader<IMoveAttract> {
    distance: RangeValue;
    enable;
    rotate: ICoordinates;

    constructor() {
        this.distance = 200;
        this.enable = false;
        this.rotate = {
            x: 3000,
            y: 3000,
        };
    }

    load(data?: RecursivePartial<IMoveAttract>): void {
        if (!data) {
            return;
        }

        if (data.distance !== undefined) {
            this.distance = setRangeValue(data.distance);
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.rotate) {
            const rotateX = data.rotate.x;

            if (rotateX !== undefined) {
                this.rotate.x = rotateX;
            }

            const rotateY = data.rotate.y;

            if (rotateY !== undefined) {
                this.rotate.y = rotateY;
            }
        }
    }
}
