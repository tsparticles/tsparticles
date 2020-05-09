import type { IShape } from "../../../Interfaces/Particles/Shape/IShape";
import { ShapeType } from "../../../../Enums/ShapeType";
import { ImageShape } from "./ImageShape";
import { PolygonShape } from "./PolygonShape";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import { ShapeData } from "../../../../Types/ShapeData";
import { CharacterShape } from "./CharacterShape";
import { Stroke } from "../Stroke";
import { Utils } from "../../../../Utils/Utils";

export class Shape implements IShape {
    /**
     * @deprecated this property was integrated in custom shape management
     */
    get image(): SingleOrMultiple<ImageShape> {
        return (this.options[ShapeType.image] ?? this.options[ShapeType.images]) as SingleOrMultiple<ImageShape>;
    }

    /**
     * @deprecated this property was integrated in custom shape management
     * @param value
     */
    set image(value: SingleOrMultiple<ImageShape>) {
        this.options[ShapeType.image] = value;
        this.options[ShapeType.images] = value;
    }

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
    get images(): ImageShape[] {
        return this.image instanceof Array ? this.image : [ this.image ];
    }

    /**
     * @deprecated the property images is deprecated, please use the image property, it works with one and many
     */
    set images(value: ImageShape[]) {
        this.image = value;
    }

    /**
     * @deprecated this property was moved to particles section
     */
    get stroke(): SingleOrMultiple<Stroke> {
        return [];
    }

    /**
     * @deprecated this property was moved to particles section
     */
    set stroke(_value: SingleOrMultiple<Stroke>) {
    }

    /**
     * @deprecated this property was integrated in custom shape management
     */
    get character(): SingleOrMultiple<CharacterShape> {
        return (this.options[ShapeType.character] ?? this.options[ShapeType.char]) as SingleOrMultiple<CharacterShape>;
    }

    /**
     * @deprecated this property was integrated in custom shape management
     */
    set character(value: SingleOrMultiple<CharacterShape>) {
        this.options[ShapeType.character] = value;
        this.options[ShapeType.char] = value;
    }

    /**
     * @deprecated this property was integrated in custom shape management
     */
    get polygon(): SingleOrMultiple<PolygonShape> {
        return (this.options[ShapeType.polygon] ?? this.options[ShapeType.star]) as SingleOrMultiple<PolygonShape>;
    }

    /**
     * @deprecated this property was integrated in custom shape management
     */
    set polygon(value: SingleOrMultiple<PolygonShape>) {
        this.options[ShapeType.polygon] = value;
        this.options[ShapeType.star] = value;
    }

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
                        this.options[shape] = Utils.deepExtend(this.options[shape] ?? {}, item);
                    }
                }
            }

            if (data.character !== undefined) {
                const item = data.character;

                if (item !== undefined) {
                    if (item instanceof Array) {
                        if (this.options[ShapeType.character] instanceof Array) {
                            this.options[ShapeType.character] = Utils.deepExtend(
                                this.options[ShapeType.character] ?? [],
                                item);

                            this.options[ShapeType.char] = Utils.deepExtend(this.options[ShapeType.char] ?? [], item);
                        } else {
                            this.options[ShapeType.character] = Utils.deepExtend([],
                                item);

                            this.options[ShapeType.char] = Utils.deepExtend([], item);
                        }
                    } else {
                        if (this.options[ShapeType.character] instanceof Array) {
                            this.options[ShapeType.character] = Utils.deepExtend({},
                                item);

                            this.options[ShapeType.char] = Utils.deepExtend({}, item);
                        } else {
                            this.options[ShapeType.character] = Utils.deepExtend(
                                this.options[ShapeType.character] ?? [],
                                item);

                            this.options[ShapeType.char] = Utils.deepExtend(this.options[ShapeType.char] ?? [], item);
                        }
                    }
                }
            }

            if (data.polygon !== undefined) {
                const item = data.polygon;
                if (item !== undefined) {
                    if (item instanceof Array) {
                        if (this.options[ShapeType.polygon] instanceof Array) {
                            this.options[ShapeType.polygon] = Utils.deepExtend(
                                this.options[ShapeType.polygon] ?? [],
                                item);

                            this.options[ShapeType.star] = Utils.deepExtend(this.options[ShapeType.star] ?? [], item);
                        } else {
                            this.options[ShapeType.polygon] = Utils.deepExtend([],
                                item);

                            this.options[ShapeType.star] = Utils.deepExtend([], item);
                        }
                    } else {
                        if (this.options[ShapeType.polygon] instanceof Array) {
                            this.options[ShapeType.polygon] = Utils.deepExtend({},
                                item);

                            this.options[ShapeType.star] = Utils.deepExtend({}, item);
                        } else {
                            this.options[ShapeType.polygon] = Utils.deepExtend(
                                this.options[ShapeType.polygon] ?? [],
                                item);

                            this.options[ShapeType.star] = Utils.deepExtend(this.options[ShapeType.star] ?? [], item);
                        }
                    }
                }
            }

            if (data.image !== undefined) {
                const item = data.image;

                if (item !== undefined) {
                    if (item instanceof Array) {
                        if (this.options[ShapeType.image] instanceof Array) {
                            this.options[ShapeType.image] = Utils.deepExtend(
                                this.options[ShapeType.image] ?? [],
                                item);

                            this.options[ShapeType.images] = Utils.deepExtend(this.options[ShapeType.images] ?? [], item);
                        } else {
                            this.options[ShapeType.image] = Utils.deepExtend([],
                                item);

                            this.options[ShapeType.images] = Utils.deepExtend([], item);
                        }
                    } else {
                        if (this.options[ShapeType.image] instanceof Array) {
                            this.options[ShapeType.image] = Utils.deepExtend({},
                                item);

                            this.options[ShapeType.images] = Utils.deepExtend({}, item);
                        } else {
                            this.options[ShapeType.image] = Utils.deepExtend(
                                this.options[ShapeType.image] ?? [],
                                item);

                            this.options[ShapeType.images] = Utils.deepExtend(this.options[ShapeType.images] ?? [], item);
                        }
                    }
                }
            }

            if (data.type !== undefined) {
                this.type = data.type;
            }
        }
    }
}
