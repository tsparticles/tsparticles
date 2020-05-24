import type { IDraw } from "../Interfaces/IDraw";
import { DrawStroke } from "./DrawStroke";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { OptionsColor } from "../../../../Options/Classes/OptionsColor";

export class Draw implements IDraw {
    /**
     * @deprecated the property lineWidth is deprecated, please use the new stroke.width
     */
    get lineWidth(): number {
        return this.stroke.width;
    }

    /**
     * @deprecated the property lineWidth is deprecated, please use the new stroke.width
     */
    set lineWidth(value: number) {
        this.stroke.width = value;
    }

    /**
     * @deprecated the property lineColor is deprecated, please use the new stroke.color
     */
    get lineColor(): string | OptionsColor {
        return this.stroke.color;
    }

    /**
     * @deprecated the property lineColor is deprecated, please use the new stroke.color
     */
    set lineColor(value: string | OptionsColor) {
        this.stroke.color = OptionsColor.create(this.stroke.color, value);
    }

    public enable: boolean;
    public stroke: DrawStroke;

    constructor() {
        this.enable = false;
        this.stroke = new DrawStroke();
    }

    public load(data?: RecursivePartial<IDraw>): void {
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            const stroke = data.stroke ?? {
                color: data.lineColor,
                width: data.lineWidth,
            };

            this.stroke.load(stroke);
        }
    }
}
