import {IPolygonMaskDrawStroke} from "../../../Interfaces/Options/PolygonMask/IPolygonMaskDrawStroke";
import {RecursivePartial} from "../../../Types/RecursivePartial";
import {IColor} from "../../../Interfaces/Options/Particles/IColor";
import {Color} from "../Particles/Color";

export class PolygonMaskDrawStroke implements IPolygonMaskDrawStroke {
    public color: string | IColor;
    public width: number;

    constructor() {
        this.color = new Color();
        this.width = 0.5;
    }

    public load(data?: RecursivePartial<IPolygonMaskDrawStroke>): void {
        if (data !== undefined) {
            if (data.color !== undefined) {
                if (typeof this.color === "string") {
                    this.color = data.color;
                } else {
                    this.color.load(data.color as IColor);
                }
            }

            if (data.width !== undefined) {
                this.width = data.width;
            }
        }
    }
}
