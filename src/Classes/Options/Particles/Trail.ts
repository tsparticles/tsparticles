import type { ITrail } from "../../../Interfaces/Options/Particles/ITrail";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import type { IColor } from "../../../Interfaces/Options/Particles/IColor";
import { Color } from "./Color";

export class Trail implements ITrail {
    public enable: boolean;
    public length: number;
    public fillColor: string | IColor;

    constructor() {
        this.enable = false;
        this.length = 10;
        this.fillColor = new Color();

        this.fillColor.value = "#000000";
    }

    public load(data?: RecursivePartial<ITrail>): void {
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            if (data.fillColor !== undefined) {
                if (typeof this.fillColor === "string") {
                    this.fillColor = data.fillColor;
                } else {
                    this.fillColor.load(data.fillColor as IColor);
                }
            }

            if (data.length !== undefined) {
                this.length = data.length;
            }
        }
    }
}
