import { type IOptionLoader, type RecursivePartial } from "@tsparticles/engine";
import type { IPolygonMaskDraw } from "../Interfaces/IPolygonMaskDraw";
import { PolygonMaskDrawStroke } from "./PolygonMaskDrawStroke";

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
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        const stroke = data.stroke;

        this.stroke.load(stroke);
    }
}
