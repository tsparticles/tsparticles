import {IPolygonMask} from "../../../Interfaces/Options/PolygonMask/IPolygonMask";
import {PolygonMaskType} from "../../../Enums/PolygonMaskType";
import {Draw} from "./Draw";
import {Move} from "./Move";
import {IPolygonMaskDraw} from "../../../Interfaces/Options/PolygonMask/IPolygonMaskDraw";
import {IPolygonMaskMove} from "../../../Interfaces/Options/PolygonMask/IPolygonMaskMove";
import {PolygonMaskInlineArrangement} from "../../../Enums/PolygonMaskInlineArrangement";
import {Utils} from "../../Utils/Utils";

export class PolygonMask implements IPolygonMask {
    public draw: IPolygonMaskDraw;
    public inlineArrangement: PolygonMaskInlineArrangement;
    public move: IPolygonMaskMove;
    public scale: number;
    public type: PolygonMaskType;
    public url: string;

    constructor() {
        this.draw = new Draw();
        this.inlineArrangement = PolygonMaskInlineArrangement.onePerPoint;
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
