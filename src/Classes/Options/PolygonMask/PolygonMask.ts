import type {IPolygonMask} from "../../../Interfaces/Options/PolygonMask/IPolygonMask";
import {PolygonMaskType} from "../../../Enums/PolygonMaskType";
import {Draw} from "./Draw";
import {Move} from "./Move";
import type {IPolygonMaskDraw} from "../../../Interfaces/Options/PolygonMask/IPolygonMaskDraw";
import type {IPolygonMaskMove} from "../../../Interfaces/Options/PolygonMask/IPolygonMaskMove";
import {PolygonMaskInlineArrangement} from "../../../Enums/PolygonMaskInlineArrangement";
import type {IPolygonInline} from "../../../Interfaces/Options/PolygonMask/IPolygonInline";
import {PolygonInline} from "./PolygonInline";
import type {RecursivePartial} from "../../../Types/RecursivePartial";

export class PolygonMask implements IPolygonMask {
    /**
     * @deprecated the property inlineArrangement is deprecated, please use the new inline.arrangement
     */
    get inlineArrangement(): PolygonMaskInlineArrangement {
        return this.inline.arrangement;
    }

    /**
     * @deprecated the property inlineArrangement is deprecated, please use the new inline.arrangement
     */
    set inlineArrangement(value: PolygonMaskInlineArrangement) {
        this.inline.arrangement = value;
    }

    public draw: IPolygonMaskDraw;
    public enable: boolean;
    public inline: IPolygonInline;
    public move: IPolygonMaskMove;
    public scale: number;
    public type: PolygonMaskType;
    public url: string;

    constructor() {
        this.draw = new Draw();
        this.enable = false;
        this.inline = new PolygonInline();
        this.move = new Move();
        this.scale = 1;
        this.type = PolygonMaskType.none;
        this.url = "";
    }

    public load(data?: RecursivePartial<IPolygonMask>): void {
        if (data !== undefined) {
            this.draw.load(data.draw);

            const inline = data.inline ?? {
                arrangement: data.inlineArrangement,
            };

            if (inline !== undefined) {
                this.inline.load(inline);
            }

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
        }
    }
}
