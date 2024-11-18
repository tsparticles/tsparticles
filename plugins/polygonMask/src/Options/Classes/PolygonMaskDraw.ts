import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IPolygonMaskDraw } from "../Interfaces/IPolygonMaskDraw.js";
import { PolygonMaskDrawStroke } from "./PolygonMaskDrawStroke.js";

/**
 */
export class PolygonMaskDraw implements IPolygonMaskDraw, IOptionLoader<IPolygonMaskDraw> {
    enable;
    stroke;

    constructor() {
        this.enable = false;
        this.stroke = new PolygonMaskDrawStroke();
    }

    load(data?: RecursivePartial<IPolygonMaskDraw>): void {
        if (isNull(data)) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        const stroke = data.stroke;

        this.stroke.load(stroke);
    }
}
