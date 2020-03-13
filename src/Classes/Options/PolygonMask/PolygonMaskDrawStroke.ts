import {IPolygonMaskDrawStroke} from "../../../Interfaces/Options/PolygonMask/IPolygonMaskDrawStroke";

export class PolygonMaskDrawStroke implements IPolygonMaskDrawStroke {
    public color: string;
    public width: number;

    constructor() {
        this.color = "#ffffff";
        this.width = 0.5;
    }

    public load(data: IPolygonMaskDrawStroke): void {
    }
}
