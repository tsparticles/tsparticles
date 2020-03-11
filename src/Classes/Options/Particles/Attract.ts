import {IAttract} from "../../../Interfaces/Options/Particles/IAttract";
import {ICoordinates} from "../../../Interfaces/ICoordinates";
import {Messages} from "../../Utils/Messages";
import {Utils} from "../../Utils/Utils";

export class Attract implements IAttract {
    /**
     *
     * @deprecated this property is obsolete, please use the new rotate.x
     */
    public get rotateX(): number {
        Messages.deprecated("particles.move.attract.rotateX", "particles.move.attract.rotate.x");

        return this.rotate.x;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new rotate.x
     * @param value
     */
    public set rotateX(value: number) {
        Messages.deprecated("particles.move.attract.rotateX", "particles.move.attract.rotate.x");

        this.rotate.x = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new rotate.y
     */
    public get rotateY(): number {
        Messages.deprecated("particles.move.attract.rotateY", "particles.move.attract.rotate.y");

        return this.rotate.y;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new rotate.y
     * @param value
     */
    public set rotateY(value: number) {
        Messages.deprecated("particles.move.attract.rotateY", "particles.move.attract.rotate.y");

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

    public load(data: IAttract): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.enable)) {
                this.enable = data.enable;
            }

            if (Utils.hasData(data.rotate?.x)) {
                this.rotate.x = data.rotate.x;
            }

            if (Utils.hasData(data.rotate?.y)) {
                this.rotate.y = data.rotate.y;
            }

            if (Utils.hasData(data.rotateX)) {
                this.rotateX = data.rotateX;
            }

            if (Utils.hasData(data.rotateY)) {
                this.rotateY = data.rotateY;
            }
        }
    }
}
