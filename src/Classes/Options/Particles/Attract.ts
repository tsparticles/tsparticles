import type { IAttract } from "../../../Interfaces/Options/Particles/IAttract";
import type { ICoordinates } from "../../../Interfaces/ICoordinates";
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
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            if (data.rotate?.x !== undefined) {
                this.rotate.x = data.rotate.x;
            } else if (data.rotateX !== undefined) {
                this.rotateX = data.rotateX;
            }

            if (data.rotate?.y !== undefined) {
                this.rotate.y = data.rotate.y;
            } else if (data.rotateY !== undefined) {
                this.rotateY = data.rotateY;
            }
        }
    }
}
