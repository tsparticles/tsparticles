import type {IShape} from "../../../../Interfaces/Options/Particles/Shape/IShape";
import {ShapeType} from "../../../../Enums/ShapeType";
import {ImageShape} from "./ImageShape";
import {PolygonShape} from "./PolygonShape";
import type {IImageShape} from "../../../../Interfaces/Options/Particles/Shape/IImageShape";
import type {ICharacterShape} from "../../../../Interfaces/Options/Particles/Shape/ICharacterShape";
import type {IPolygonShape} from "../../../../Interfaces/Options/Particles/Shape/IPolygonShape";
import type {IStroke} from "../../../../Interfaces/Options/Particles/IStroke";
import type {RecursivePartial} from "../../../../Types/RecursivePartial";
import type {SingleOrMultiple} from "../../../../Types/SingleOrMultiple";
import {ShapeData} from "../../../../Types/ShapeData";

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

    /**
     * @deprecated this property was integrated in custom shape management
     */
    get character(): SingleOrMultiple<ICharacterShape> {
        return [];
    }

    /**
     * @deprecated this property was integrated in custom shape management
     */
    set character(value: SingleOrMultiple<ICharacterShape>) {
    }

    /**
     * @deprecated this property was integrated in custom shape management
     */
    get polygon(): SingleOrMultiple<IPolygonShape> {
        return [];
    }

    /**
     * @deprecated this property was integrated in custom shape management
     */
    set polygon(value: SingleOrMultiple<IPolygonShape>) {
    }

    public image: SingleOrMultiple<IImageShape>;
    public type: SingleOrMultiple<ShapeType | string>;
    public custom: ShapeData;

    constructor() {
        this.image = new ImageShape();
        this.polygon = new PolygonShape();
        this.type = ShapeType.circle;
        this.custom = {};
    }

    public load(data?: RecursivePartial<IShape>): void {
        if (data !== undefined) {
            if (data.custom !== undefined) {
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
            }

            if (data.character !== undefined) {
                const item = data.character;
                if (item !== undefined) {
                    if (item instanceof Array) {
                        this.custom[ShapeType.character] = item.filter(t => t !== undefined).map((s) => {
                            return s!;
                        });

                        this.custom[ShapeType.char] = item.filter(t => t !== undefined).map((s) => {
                            return s!;
                        });
                    } else {
                        this.custom[ShapeType.character] = item;
                        this.custom[ShapeType.char] = item;
                    }
                }
            }

            if (data.polygon !== undefined) {
                const item = data.polygon;
                if (item !== undefined) {
                    if (item instanceof Array) {
                        this.custom[ShapeType.polygon] = item.filter(t => t !== undefined).map((s) => {
                            return s!;
                        });

                        this.custom[ShapeType.star] = item.filter(t => t !== undefined).map((s) => {
                            return s!;
                        });
                    } else {
                        this.custom[ShapeType.polygon] = item;
                        this.custom[ShapeType.star] = item;
                    }
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
                    if (this.image instanceof Array) {
                        this.image = new ImageShape();
                    }

                    this.image.load(data.image);
                }
            }

            if (data.type !== undefined) {
                this.type = data.type;
            }
        }
    }
}

