import type { IAttract } from "../../../Interfaces/Particles/Move/IAttract";
import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class Attract implements IAttract, IOptionLoader<IAttract> {
    /**
     *
     * @deprecated this property is obsolete, please use the new rotate.x
     */
    get rotateX(): number {
        return this.rotate.x;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new rotate.x
     * @param value
     */
    set rotateX(value: number) {
        this.rotate.x = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new rotate.y
     */
    get rotateY(): number {
        return this.rotate.y;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new rotate.y
     * @param value
     */
    set rotateY(value: number) {
        this.rotate.y = value;
    }

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
        if (data === undefined) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        const rotateX = data.rotate?.x ?? data.rotateX;

        if (rotateX !== undefined) {
            this.rotate.x = rotateX;
        }

        const rotateY = data.rotate?.y ?? data.rotateY;

        if (rotateY !== undefined) {
            this.rotate.y = rotateY;
        }
    }
}
