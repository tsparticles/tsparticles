import {IPolygonMaskDraw} from "../../../Interfaces/Options/PolygonMask/IPolygonMaskDraw";
import {Utils} from "../../Utils/Utils";

export class Draw implements IPolygonMaskDraw {
    public enable: boolean;
    public lineColor: string;
    public lineWidth: number;

    constructor() {
        this.enable = false;
        this.lineColor = "#ffffff";
        this.lineWidth = 0.5;
    }

    public load(data: IPolygonMaskDraw): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.enable)) {
                this.enable = data.enable;
            }

            if (Utils.hasData(data.lineColor)) {
                this.lineColor = data.lineColor;
            }

            if (Utils.hasData(data.lineWidth)) {
                this.lineWidth = data.lineWidth;
            }
        }
    }
}
