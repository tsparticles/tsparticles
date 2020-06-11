import type { IShape } from "../../../Interfaces/Particles/Shape/IShape";
import { ShapeType } from "../../../../Enums";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import { ShapeData } from "../../../../Types/ShapeData";
import { Stroke } from "../Stroke";
import { Utils } from "../../../../Utils";
import { IShapeValues } from "../../../Interfaces/Particles/Shape/IShapeValues";
import { IPolygonShape } from "../../../Interfaces/Particles/Shape/IPolygonShape";
import { IImageShape } from "../../../Interfaces/Particles/Shape/IImageShape";
import { ICharacterShape } from "../../../Interfaces/Particles/Shape/ICharacterShape";

export class Shape implements IShape {
    /**
     * @deprecated this property was integrated in custom shape management
     */
    get image(): SingleOrMultiple<IImageShape> {
        return (this.options[ShapeType.image] ?? this.options[ShapeType.images]) as SingleOrMultiple<IImageShape>;
    }

    /**
     * @deprecated this property was integrated in custom shape management
     * @param value
     */
    set image(value: SingleOrMultiple<IImageShape>) {
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
    get images(): IImageShape[] {
        return this.image instanceof Array ? this.image : [this.image];
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
    get stroke(): SingleOrMultiple<Stroke> {
        return [];
    }

    /**
     * @deprecated this property was moved to particles section
     */
    set stroke(_value: SingleOrMultiple<Stroke>) {
        // deprecated
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

    public type: SingleOrMultiple<ShapeType | string>;
    public options: ShapeData;

    constructor() {
        this.options = {};
        this.type = ShapeType.circle;
    }

    public load(data?: RecursivePartial<IShape>): void {
        if (data === undefined) {
            return;
        }

        const options = data.options ?? data.custom;

        if (options !== undefined) {
            for (const shape in options) {
                const item = options[shape];

                if (item !== undefined) {
                    this.options[shape] = Utils.deepExtend(this.options[shape] ?? {}, item);
                }
            }
        }

        this.loadShape(data.character, ShapeType.character, ShapeType.char, true);
        this.loadShape(data.polygon, ShapeType.polygon, ShapeType.star, false);
        this.loadShape(data.image ?? data.images, ShapeType.image, ShapeType.images, true);

        if (data.type !== undefined) {
            this.type = data.type;
        }
    }

    private loadShape<T extends IShapeValues>(
        item: RecursivePartial<SingleOrMultiple<T>> | undefined,
        mainKey: ShapeType,
        altKey: ShapeType,
        altOverride: boolean
    ): void {
        if (item === undefined) {
            return;
        }

        if (item instanceof Array) {
            if (!(this.options[mainKey] instanceof Array)) {
                this.options[mainKey] = [];

                if (!this.options[altKey] || altOverride) {
                    this.options[altKey] = [];
                }
            }

            this.options[mainKey] = Utils.deepExtend(this.options[mainKey] ?? [], item);

            if (!this.options[altKey] || altOverride) {
                this.options[altKey] = Utils.deepExtend(this.options[altKey] ?? [], item);
            }
        } else {
            if (this.options[mainKey] instanceof Array) {
                this.options[mainKey] = {};

                if (!this.options[altKey] || altOverride) {
                    this.options[altKey] = {};
                }
            }

            this.options[mainKey] = Utils.deepExtend(this.options[mainKey] ?? {}, item);

            if (!this.options[altKey] || altOverride) {
                this.options[altKey] = Utils.deepExtend(this.options[altKey] ?? {}, item);
            }
        }
    }
}
