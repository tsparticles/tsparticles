import {IPolygonMaskDraw} from "../../../Interfaces/Options/PolygonMask/IPolygonMaskDraw";

export class Draw implements IPolygonMaskDraw {
    public enable: boolean;
    public lineColor: string;
    public lineWidth: number;

    constructor() {
        this.enable = false;
        this.lineColor = "#ffffff";
        this.lineWidth = 0.5;
    }
}
