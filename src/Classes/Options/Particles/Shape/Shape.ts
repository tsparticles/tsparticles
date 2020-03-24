import type { IShape } from "../../../../Interfaces/Options/Particles/Shape/IShape";
import { ShapeType } from "../../../../Enums/ShapeType";
import { CharacterShape } from "./CharacterShape";
import { ImageShape } from "./ImageShape";
import { PolygonShape } from "./PolygonShape";
import { Stroke } from "./Stroke";
import type { IImageShape } from "../../../../Interfaces/Options/Particles/Shape/IImageShape";
import type { ICharacterShape } from "../../../../Interfaces/Options/Particles/Shape/ICharacterShape";
import type { IPolygonShape } from "../../../../Interfaces/Options/Particles/Shape/IPolygonShape";
import type { IStroke } from "../../../../Interfaces/Options/Particles/Shape/IStroke";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class Shape implements IShape {
    /**
     * @deprecated the property images is deprecated, please use the image property, it works with one and many
     */
    get images(): IImageShape[] {
        if (this.image instanceof Array) {
            return this.image;
        }

        return [];
    }

    /**
     * @deprecated the property images is deprecated, please use the image property, it works with one and many
     */
    set images(value: IImageShape[]) {
        this.image = value;
    }

    public character: ICharacterShape | ICharacterShape[];
    public image: IImageShape | IImageShape[];
    public polygon: IPolygonShape | IPolygonShape[];
    public stroke: IStroke | IStroke[];
    public type: ShapeType | ShapeType[];

    constructor() {
        this.character = new CharacterShape();
        this.image = new ImageShape();
        this.polygon = new PolygonShape();
        this.stroke = new Stroke();
        this.type = ShapeType.circle;
    }

    public load(data?: RecursivePartial<IShape>): void {
        if (data !== undefined) {
            if (data.character !== undefined) {
                if (data.character instanceof Array) {
                    this.character = data.character.map((s) => {
                        const tmp = new CharacterShape();

                        tmp.load(s);

                        return tmp;
                    });
                } else {
                    this.character = new CharacterShape();
                    this.character.load(data.character);
                }
            }

            if (data.image !== undefined) {
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
            }

            if (data.stroke !== undefined) {
                if (data.stroke instanceof Array) {
                    this.stroke = data.stroke.map((s) => {
                        const tmp = new Stroke();

                        tmp.load(s);

                        return tmp;
                    });
                } else {
                    this.stroke = new Stroke();
                    this.stroke.load(data.stroke);
                }
            }

            if (data.polygon !== undefined) {
                if (data.polygon instanceof Array) {
                    this.polygon = data.polygon.map((s) => {
                        const tmp = new PolygonShape();

                        tmp.load(s);

                        return tmp;
                    });
                } else {
                    this.polygon = new PolygonShape();
                    this.polygon.load(data.polygon);
                }
            }

            if (data.type !== undefined) {
                this.type = data.type;
            }
        }
    }
}

