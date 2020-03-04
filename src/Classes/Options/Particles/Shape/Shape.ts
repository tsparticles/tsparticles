import {IShape} from "../../../../Interfaces/Options/Shape/IShape";
import {ShapeType} from "../../../../Enums/ShapeType";
import {CharacterShape} from "./CharacterShape";
import {ImageShape} from "./ImageShape";
import {PolygonShape} from "./PolygonShape";
import {Stroke} from "./Stroke";

export class Shape implements IShape {
    public character: CharacterShape;
    public image: ImageShape | ImageShape[];
    public polygon: PolygonShape;
    public stroke: Stroke;
    public type: ShapeType | ShapeType[];

    constructor() {
        this.character = new CharacterShape();
        this.image = new ImageShape();
        this.polygon = new PolygonShape();
        this.stroke = new Stroke();
        this.type = ShapeType.circle;
    }
}

