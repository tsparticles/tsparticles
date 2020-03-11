import {IShadow} from "../../../Interfaces/Options/Particles/IShadow";
import {ICoordinates} from "../../../Interfaces/ICoordinates";
import {Utils} from "../../Utils/Utils";

export class Shadow implements IShadow {
    public blur: number;
    public color: string;
    public enable: boolean;
    public offset: ICoordinates;

    constructor() {
        this.blur = 0;
        this.color = "#000000";
        this.enable = false;
        this.offset = {
            x: 0,
            y: 0,
        };
    }

    public load(data: IShadow): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.blur)) {
                this.blur = data.blur;
            }

            if (Utils.hasData(data.color)) {
                this.color = data.color;
            }

            if (Utils.hasData(data.enable)) {
                this.enable = data.enable;
            }

            if (Utils.hasData(data.offset)) {
                if (Utils.hasData(data.offset.x)) {
                    this.offset.x = data.offset.x;
                }

                if (Utils.hasData(data.offset.y)) {
                    this.offset.y = data.offset.y;
                }
            }
        }
    }
}
