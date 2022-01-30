import type { IMoveAttract, IOptionLoader } from "../../../Interfaces";
import type { ICoordinates } from "../../../../Core";
import type { RecursivePartial } from "../../../../Types";
import { deepExtend } from "../../../../Utils";

/**
 * @category Options
 */
export class MoveAttract implements IMoveAttract, IOptionLoader<IMoveAttract> {
    distance: number;
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
            this.distance = data.distance;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        this.rotate = deepExtend(this.rotate, data.rotate) as ICoordinates;
    }
}
