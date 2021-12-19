import type { IPolygonMaskDraw } from "../Interfaces/IPolygonMaskDraw";
import { PolygonMaskDrawStroke } from "./PolygonMaskDrawStroke";
import type { RecursivePartial } from "tsparticles-engine";
import type { IOptionLoader } from "tsparticles-engine/Options/Interfaces/IOptionLoader";

/**
 * @category Polygon Mask Plugin
 */
export class PolygonMaskDraw implements IPolygonMaskDraw, IOptionLoader<IPolygonMaskDraw> {
    enable;
    stroke;

    constructor() {
        this.enable = false;
        this.stroke = new PolygonMaskDrawStroke();
    }

    load(data?: RecursivePartial<IPolygonMaskDraw>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        this.stroke.load(data.stroke);
    }
}
