import type { IShape } from "../../../../Interfaces/Options/Particles/Shape/IShape";
import { ShapeType } from "../../../../Enums/ShapeType";
import { CharacterShape } from "./CharacterShape";
import { ImageShape } from "./ImageShape";
import { PolygonShape } from "./PolygonShape";
import type { IImageShape } from "../../../../Interfaces/Options/Particles/Shape/IImageShape";
import type { ICharacterShape } from "../../../../Interfaces/Options/Particles/Shape/ICharacterShape";
import type { IPolygonShape } from "../../../../Interfaces/Options/Particles/Shape/IPolygonShape";
import type { IStroke } from "../../../../Interfaces/Options/Particles/IStroke";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import { ShapeData } from "../../../../Types/ShapeData";

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

    /**
     * @deprecated this property was moved to particles section
     */
    get stroke(): SingleOrMultiple<IStroke> {
        return [];
    }

    /**
     * @deprecated this property was moved to particles section
     */
    set stroke(value: SingleOrMultiple<IStroke>) {
    }

    public character: SingleOrMultiple<ICharacterShape>;
    public image: SingleOrMultiple<IImageShape>;
    public polygon: SingleOrMultiple<IPolygonShape>;
    public type: SingleOrMultiple<ShapeType | string>;
    public custom: ShapeData;

    constructor() {
        this.character = new CharacterShape();
        this.image = new ImageShape();
        this.polygon = new PolygonShape();
        this.type = ShapeType.circle;
        this.custom = {};
    }

    public load(data?: RecursivePartial<IShape>): void {
        if (data !== undefined) {
            if (data.custom !== undefined)
                for (const customShape in data.custom) {
                    const item = data.custom[customShape];
                    if (item !== undefined) {
                        if (item instanceof Array) {
                            this.custom[customShape] = item.filter(t => t !== undefined).map((s) => {
                                return s!;
                            });
                        } else {
                            this.custom[customShape] = item;
                        }
                    }
                }

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

