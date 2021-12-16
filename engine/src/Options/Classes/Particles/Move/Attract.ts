import type { IAttract } from "../../../Interfaces/Particles/Move/IAttract";
import type { ICoordinates } from "../../../../Core/Interfaces";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class Attract implements IAttract, IOptionLoader<IAttract> {
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

    load(data?: RecursivePartial<IAttract>): void {
        if (!data) {
            return;
        }

        if (data.distance !== undefined) {
            this.distance = data.distance;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        const rotateX = data.rotate?.x;

        if (rotateX !== undefined) {
            this.rotate.x = rotateX;
        }

        const rotateY = data.rotate?.y;

        if (rotateY !== undefined) {
            this.rotate.y = rotateY;
        }
    }
}
