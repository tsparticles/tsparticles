import type { IShape } from "../../../../Interfaces/Options/Particles/Shape/IShape";
import { ShapeType } from "../../../../Enums/ShapeType";
import { ImageShape } from "./ImageShape";
import { PolygonShape } from "./PolygonShape";
import type { IImageShape } from "../../../../Interfaces/Options/Particles/Shape/IImageShape";
import type { ICharacterShape } from "../../../../Interfaces/Options/Particles/Shape/ICharacterShape";
import type { IPolygonShape } from "../../../../Interfaces/Options/Particles/Shape/IPolygonShape";
import type { IStroke } from "../../../../Interfaces/Options/Particles/IStroke";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import { ShapeData } from "../../../../Types/ShapeData";
import { CharacterShape } from "./CharacterShape";

export class Shape implements IShape {
    /**
     * @deprecated This options has been renamed options
     */
    get custom(): ShapeData {
        return this.options;
    }

    /**
     * @deprecated This options has been renamed options
     * @param value
     */
    set custom(value: ShapeData) {
        this.options = value;
    }

    /**
     * @deprecated the property images is deprecated, please use the image property, it works with one and many
     */
    get images(): IImageShape[] {
        return this.image instanceof Array ? this.image : [ this.image ];
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
        return (this.options[ShapeType.character] ?? this.options[ShapeType.char]) as SingleOrMultiple<ICharacterShape>;
    }

    /**
     * @deprecated this property was integrated in custom shape management
     */
    set character(value: SingleOrMultiple<ICharacterShape>) {
        this.options[ShapeType.character] = value;
        this.options[ShapeType.char] = value;
    }

    /**
     * @deprecated this property was integrated in custom shape management
     */
    get polygon(): SingleOrMultiple<IPolygonShape> {
        return (this.options[ShapeType.polygon] ?? this.options[ShapeType.star]) as SingleOrMultiple<IPolygonShape>;
    }

    /**
     * @deprecated this property was integrated in custom shape management
     */
    set polygon(value: SingleOrMultiple<IPolygonShape>) {
        this.options[ShapeType.polygon] = value;
        this.options[ShapeType.star] = value;
    }

    public image: SingleOrMultiple<IImageShape>;
    public type: SingleOrMultiple<ShapeType | string>;
    public options: ShapeData;

    constructor() {
        this.options = {};
        this.character = new CharacterShape();
        this.image = new ImageShape();
        this.polygon = new PolygonShape();
        this.type = ShapeType.circle;
    }

    public load(data?: RecursivePartial<IShape>): void {
        if (data !== undefined) {
            const options = data.options ?? data.custom;
            if (options !== undefined) {
                for (const shape in options) {
                    const item = options[shape];
                    if (item !== undefined) {
                        if (item instanceof Array) {
                            this.options[shape] = item.filter((t) => t !== undefined).map((t) => {
                                return t!;
                            });
                        } else {
                            this.options[shape] = item;
                        }
                    }
                }
            }

            if (data.character !== undefined) {
                const item = data.character;
                if (item !== undefined) {
                    if (item instanceof Array) {
                        this.options[ShapeType.character] = item.filter(t => t !== undefined).map((s) => {
                            return s!;
                        });

                        this.options[ShapeType.char] = item.filter(t => t !== undefined).map((s) => {
                            return s!;
                        });
                    } else {
                        this.options[ShapeType.character] = item;
                        this.options[ShapeType.char] = item;
                    }
                }
            }

            if (data.polygon !== undefined) {
                const item = data.polygon;
                if (item !== undefined) {
                    if (item instanceof Array) {
                        this.options[ShapeType.polygon] = item.filter(t => t !== undefined).map((s) => {
                            return s!;
                        });

                        this.options[ShapeType.star] = item.filter(t => t !== undefined).map((s) => {
                            return s!;
                        });
                    } else {
                        this.options[ShapeType.polygon] = item;
                        this.options[ShapeType.star] = item;
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
