import type {ILineLinkedShadow} from "../../../Interfaces/Options/Particles/ILineLinkedShadow";
import type {RecursivePartial} from "../../../Types/RecursivePartial";
import type {IColor} from "../../../Interfaces/Options/Particles/IColor";
import {Color} from "./Color";

export class LineLinkedShadow implements ILineLinkedShadow {
    public blur: number;
    public color: IColor;
    public enable: boolean;

    constructor() {
        this.blur = 5;
        this.color = new Color();
        this.enable = false;

        this.color.value = "lime";
    }

    public load(data?: RecursivePartial<ILineLinkedShadow>): void {
        if (data !== undefined) {
            if (data.blur !== undefined) {
                this.blur = data.blur;
            }

            if (data.color !== undefined) {
                if (typeof data.color === "string") {
                    this.color.value = data.color;
                } else {
                    this.color.load(data.color);
                }
            }

            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
        }
    }
}
