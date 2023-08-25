import {
    type ICoordinates,
    type IOptionLoader,
    type RecursivePartial,
    deepExtend,
    isString,
} from "@tsparticles/engine";
import type { IPolygonMask } from "../Interfaces/IPolygonMask.js";
import { PolygonMaskDraw } from "./PolygonMaskDraw.js";
import { PolygonMaskInline } from "./PolygonMaskInline.js";
import { PolygonMaskLocalSvg } from "./PolygonMaskLocalSvg.js";
import { PolygonMaskMove } from "./PolygonMaskMove.js";
import { PolygonMaskType } from "../../Enums/PolygonMaskType.js";

/**
 * [[include:Options/Plugins/PolygonMask.md]]
 */
export class PolygonMask implements IPolygonMask, IOptionLoader<IPolygonMask> {
    data?: string | PolygonMaskLocalSvg;
    draw;
    enable;
    inline;
    move;
    position?: ICoordinates;
    scale;
    type;
    url?: string;

    constructor() {
        this.draw = new PolygonMaskDraw();
        this.enable = false;
        this.inline = new PolygonMaskInline();
        this.move = new PolygonMaskMove();
        this.scale = 1;
        this.type = PolygonMaskType.none;
    }

    load(data?: RecursivePartial<IPolygonMask>): void {
        if (!data) {
            return;
        }

        this.draw.load(data.draw);
        this.inline.load(data.inline);
        this.move.load(data.move);

        if (data.scale !== undefined) {
            this.scale = data.scale;
        }

        if (data.type !== undefined) {
            this.type = data.type;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        } else {
            this.enable = this.type !== PolygonMaskType.none;
        }

        if (data.url !== undefined) {
            this.url = data.url;
        }

        if (data.data !== undefined) {
            if (isString(data.data)) {
                this.data = data.data;
            } else {
                this.data = new PolygonMaskLocalSvg();

                this.data.load(data.data);
            }
        }

        if (data.position !== undefined) {
            this.position = deepExtend({}, data.position) as ICoordinates;
        }
    }
}
