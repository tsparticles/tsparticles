import {IPolygonMask} from "../../../Interfaces/Options/PolygonMask/IPolygonMask";
import {PolygonMaskType} from "../../../Enums/PolygonMaskType";
import {Draw} from "./Draw";
import {Move} from "./Move";
import {IPolygonMaskDraw} from "../../../Interfaces/Options/PolygonMask/IPolygonMaskDraw";
import {IPolygonMaskMove} from "../../../Interfaces/Options/PolygonMask/IPolygonMaskMove";

export class PolygonMask implements IPolygonMask {
    public draw: IPolygonMaskDraw;
    public move: IPolygonMaskMove;
    public scale: number;
    public type: PolygonMaskType;
    public url: string;

    constructor() {
        this.draw = new Draw();
        this.move = new Move();
        this.scale = 1;
        this.type = PolygonMaskType.none;
        this.url = "";
    }
}
