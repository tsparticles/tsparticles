import {IPolygonMaskDrawStroke} from "../../../Interfaces/Options/PolygonMask/IPolygonMaskDrawStroke";
import {RecursivePartial} from "../../../Types/RecursivePartial";

export class PolygonMaskDrawStroke implements IPolygonMaskDrawStroke {
    public color: string;
    public width: number;

    constructor() {
        this.color = "#ffffff";
        this.width = 0.5;
    }

    public load(data?: RecursivePartial<IPolygonMaskDrawStroke>): void {
        if (data !== undefined) {
            if (data.color !== undefined) {
                this.color = data.color;
            }

            if (data.width !== undefined) {
                this.width = data.width;
            }
        }
    }
}
