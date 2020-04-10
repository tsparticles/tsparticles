import type {IShadow} from "../../../Interfaces/Options/Particles/IShadow";
import type {ICoordinates} from "../../../Interfaces/ICoordinates";
import type {RecursivePartial} from "../../../Types/RecursivePartial";
import type {IColor} from "../../../Interfaces/Options/Particles/IColor";
import {Color} from "./Color";

export class Shadow implements IShadow {
    public blur: number;
    public color: IColor;
    public enable: boolean;
    public offset: ICoordinates;

    constructor() {
        this.blur = 0;
        this.color = new Color();
        this.enable = false;
        this.offset = {
            x: 0,
            y: 0,
        };

        this.color.value = "#000000";
    }

    public load(data?: RecursivePartial<IShadow>): void {
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

            if (data.offset !== undefined) {
                if (data.offset.x !== undefined) {
                    this.offset.x = data.offset.x;
                }

                if (data.offset.y !== undefined) {
                    this.offset.y = data.offset.y;
                }
            }
        }
    }
}
