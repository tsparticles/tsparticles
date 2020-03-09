import {IShape} from "../../../../Interfaces/Options/Shape/IShape";
import {ShapeType} from "../../../../Enums/ShapeType";
import {CharacterShape} from "./CharacterShape";
import {ImageShape} from "./ImageShape";
import {PolygonShape} from "./PolygonShape";
import {Stroke} from "./Stroke";
import {IImageShape} from "../../../../Interfaces/Options/Shape/IImageShape";
import {ICharacterShape} from "../../../../Interfaces/Options/Shape/ICharacterShape";
import {IPolygonShape} from "../../../../Interfaces/Options/Shape/IPolygonShape";
import {IStroke} from "../../../../Interfaces/Options/Shape/IStroke";

export class Shape implements IShape {
    public character: ICharacterShape;
    public image: IImageShape | IImageShape[];
    public polygon: IPolygonShape;
    public stroke: IStroke;
    public type: ShapeType | ShapeType[];

    constructor() {
        this.character = new CharacterShape();
        this.image = new ImageShape();
        this.polygon = new PolygonShape();
        this.stroke = new Stroke();
        this.type = ShapeType.circle;
    }

    public load(data: IShape): void {
        this.character.load(data.character);

        if (data.image instanceof Array) {
            this.image = data.image.map((s) => {
                const tmp = new ImageShape();

                tmp.load(s);

                return tmp;
            });
        } else {
            this.image = new ImageShape();
            this.image.load(data.image);
        }

        this.stroke.load(data.stroke);
        this.type = data.type;
    }
}

