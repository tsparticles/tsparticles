import type { ICoordinates, IOptionLoader, RecursivePartial } from "tsparticles-engine";
import {
    PolygonMaskInlineArrangement,
    PolygonMaskInlineArrangementAlt,
} from "../../Enums/PolygonMaskInlineArrangement";
import type { IPolygonMask } from "../Interfaces/IPolygonMask";
import { PolygonMaskDraw } from "./PolygonMaskDraw";
import { PolygonMaskInline } from "./PolygonMaskInline";
import { PolygonMaskLocalSvg } from "./PolygonMaskLocalSvg";
import { PolygonMaskMove } from "./PolygonMaskMove";
import { PolygonMaskType } from "../../Enums/PolygonMaskType";
import { deepExtend } from "tsparticles-engine";

/**
 * [[include:Options/Plugins/PolygonMask.md]]
 * @category Polygon Mask Plugin
 */
export class PolygonMask implements IPolygonMask, IOptionLoader<IPolygonMask> {
    /**
     * @deprecated the property inlineArrangement is deprecated, please use the new inline.arrangement
     */
    get inlineArrangement():
        | PolygonMaskInlineArrangement
        | keyof typeof PolygonMaskInlineArrangement
        | PolygonMaskInlineArrangementAlt {
        return this.inline.arrangement;
    }

    /**
     * @deprecated the property inlineArrangement is deprecated, please use the new inline.arrangement
     */
    set inlineArrangement(
        value:
            | PolygonMaskInlineArrangement
            | keyof typeof PolygonMaskInlineArrangement
            | PolygonMaskInlineArrangementAlt
    ) {
        this.inline.arrangement = value;
    }

    draw;
    enable;
    inline;
    move;
    position?: ICoordinates;
    scale;
    type;
    url?: string;
    data?: string | PolygonMaskLocalSvg;

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
            if (typeof data.data === "string") {
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
