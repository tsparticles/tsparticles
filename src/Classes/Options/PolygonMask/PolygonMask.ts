import {IPolygonMask} from "../../../Interfaces/Options/PolygonMask/IPolygonMask";
import {PolygonMaskType} from "../../../Enums/PolygonMaskType";
import {Draw} from "./Draw";
import {Move} from "./Move";
import {IPolygonMaskDraw} from "../../../Interfaces/Options/PolygonMask/IPolygonMaskDraw";
import {IPolygonMaskMove} from "../../../Interfaces/Options/PolygonMask/IPolygonMaskMove";
import {PolygonMaskInlineArrangement} from "../../../Enums/PolygonMaskInlineArrangement";
import {Utils} from "../../Utils/Utils";
import {IPolygonInline} from "../../../Interfaces/Options/PolygonMask/IPolygonInline";
import {Messages} from "../../Utils/Messages";
import {PolygonInline} from "./PolygonInline";

export class PolygonMask implements IPolygonMask {
    /**
     * @deprecated the property inlineArrangement is deprecated, please use the new inline.arrangement
     */
    get inlineArrangement(): PolygonMaskInlineArrangement {
        Messages.deprecated("polygon.inlineArrangement", "polygon.inline.arrangement");

        return this.inline.arrangement;
    }

    /**
     * @deprecated the property inlineArrangement is deprecated, please use the new inline.arrangement
     */
    set inlineArrangement(value: PolygonMaskInlineArrangement) {
        Messages.deprecated("polygon.inlineArrangement", "polygon.inline.arrangement");

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

    public load(data: IPolygonMask): void {
        if (Utils.hasData(data)) {
            this.draw.load(data.draw);

            if (Utils.hasData(data.inlineArrangement)) {
                this.inlineArrangement = data.inlineArrangement;
            }

            this.inline.load(data.inline);

            this.move.load(data.move);

            if (Utils.hasData(data.scale)) {
                this.scale = data.scale;
            }

            if (Utils.hasData(data.type)) {
                this.type = data.type;
            }

            if (Utils.hasData(data.url)) {
                this.url = data.url;
            }
        }
    }
}
