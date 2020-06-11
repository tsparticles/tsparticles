import type { IAttract } from "../../Interfaces/Particles/IAttract";
import type { ICoordinates } from "../../../Core/Interfaces/ICoordinates";
import type { RecursivePartial } from "../../../Types/RecursivePartial";

export class Attract implements IAttract {
    /**
     *
     * @deprecated this property is obsolete, please use the new rotate.x
     */
    public get rotateX(): number {
        return this.rotate.x;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new rotate.x
     * @param value
     */
    public set rotateX(value: number) {
        this.rotate.x = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new rotate.y
     */
    public get rotateY(): number {
        return this.rotate.y;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new rotate.y
     * @param value
     */
    public set rotateY(value: number) {
        this.rotate.y = value;
    }

    public enable: boolean;
    public rotate: ICoordinates;

    constructor() {
        this.enable = false;
        this.rotate = {
            x: 3000,
            y: 3000,
        };
    }

    public load(data?: RecursivePartial<IAttract>): void {
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
