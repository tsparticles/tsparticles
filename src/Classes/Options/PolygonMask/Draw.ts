import {IPolygonMaskDraw} from "../../../Interfaces/Options/PolygonMask/IPolygonMaskDraw";
import {Utils} from "../../Utils/Utils";
import {IPolygonMaskDrawStroke} from "../../../Interfaces/Options/PolygonMask/IPolygonMaskDrawStroke";
import {Messages} from "../../Utils/Messages";
import {PolygonMaskDrawStroke} from "./PolygonMaskDrawStroke";

export class Draw implements IPolygonMaskDraw {
    /**
     * @deprecated the property lineWidth is deprecated, please use the new stroke.width
     */
    get lineWidth(): number {
        Messages.deprecated("polygon.draw.lineWidth", "polygon.draw.stroke.width");

        return this.stroke.width;
    }

    /**
     * @deprecated the property lineWidth is deprecated, please use the new stroke.width
     */
    set lineWidth(value: number) {
        Messages.deprecated("polygon.draw.lineWidth", "polygon.draw.stroke.width");

        this.stroke.width = value;
    }

    /**
     * @deprecated the property lineColor is deprecated, please use the new stroke.color
     */
    get lineColor(): string {
        Messages.deprecated("polygon.draw.lineColor", "polygon.draw.stroke.color");

        return this.stroke.color;
    }

    /**
     * @deprecated the property lineColor is deprecated, please use the new stroke.color
     */
    set lineColor(value: string) {
        Messages.deprecated("polygon.draw.lineColor", "polygon.draw.stroke.color");

        this.stroke.color = value;
    }

    public enable: boolean;
    public stroke: IPolygonMaskDrawStroke;

    constructor() {
        this.enable = false;
        this.stroke = new PolygonMaskDrawStroke();
    }

    public load(data: IPolygonMaskDraw): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.enable)) {
                this.enable = data.enable;
            }

            this.stroke.load(data.stroke);

            if (Utils.hasData(data.lineColor)) {
                this.lineColor = data.lineColor;
            }

            if (Utils.hasData(data.lineWidth)) {
                this.lineWidth = data.lineWidth;
            }
        }
    }
}
