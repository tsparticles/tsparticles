import type { ICharacterShape } from "../../../Interfaces/Particles/Shape/ICharacterShape";
import type { IImageShape } from "../../../Interfaces/Particles/Shape/IImageShape";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IPolygonShape } from "../../../Interfaces/Particles/Shape/IPolygonShape";
import type { IShape } from "../../../Interfaces/Particles/Shape/IShape";
import type { IShapeValues } from "../../../../Core/Interfaces/IShapeValues";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { ShapeData } from "../../../../Types/ShapeData";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import { Stroke } from "../Stroke";
import { deepExtend } from "../../../../Utils/Utils";

/**
 * [[include:Options/Particles/Shape.md]]
 * @category Options
 */
export class Shape implements IShape, IOptionLoader<IShape> {
    /**
     * @deprecated this property was integrated in custom shape management
     */
    get image(): SingleOrMultiple<IImageShape> {
        return (this.options["image"] ?? this.options["images"]) as SingleOrMultiple<IImageShape>;
    }

    /**
     * @deprecated this property was integrated in custom shape management
     * @param value
     */
    set image(value: SingleOrMultiple<IImageShape>) {
        this.options["image"] = value;
        this.options["images"] = value;
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
    get images(): SingleOrMultiple<IImageShape> {
        return this.image;
    }

    /**
     * @deprecated the property images is deprecated, please use the image property, it works with one and many
     */
    set images(value: SingleOrMultiple<IImageShape>) {
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
        return (this.options["character"] ?? this.options["char"]) as SingleOrMultiple<ICharacterShape>;
    }

    /**
     * @deprecated this property was integrated in custom shape management
     */
    set character(value: SingleOrMultiple<ICharacterShape>) {
        this.options["character"] = value;
        this.options["char"] = value;
    }

    /**
     * @deprecated this property was integrated in custom shape management
     */
    get polygon(): SingleOrMultiple<IPolygonShape> {
        return (this.options["polygon"] ?? this.options["star"]) as SingleOrMultiple<IPolygonShape>;
    }

    /**
     * @deprecated this property was integrated in custom shape management
     */
    set polygon(value: SingleOrMultiple<IPolygonShape>) {
        this.options["polygon"] = value;
        this.options["star"] = value;
    }

    type: SingleOrMultiple<string>;
    options: ShapeData;

    constructor() {
        this.options = {};
        this.type = "circle";
    }

    load(data?: RecursivePartial<IShape>): void {
        if (!data) {
            return;
        }

        const options = data.options ?? data.custom;

        if (options !== undefined) {
            for (const shape in options) {
                const item = options[shape];

                if (item) {
                    this.options[shape] = deepExtend(this.options[shape] ?? {}, item) as IShapeValues[];
                }
            }
        }

        this.loadShape(data.character, "character", "char", true);
        this.loadShape(data.polygon, "polygon", "star", false);
        this.loadShape(data.image ?? data.images, "image", "images", true);

        if (data.type !== undefined) {
            this.type = data.type;
        }
    }

    private loadShape<T extends IShapeValues>(
        item: RecursivePartial<SingleOrMultiple<T>> | undefined,
        mainKey: string,
        altKey: string,
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

            this.options[mainKey] = deepExtend(this.options[mainKey] ?? [], item) as IShapeValues[];

            if (!this.options[altKey] || altOverride) {
                this.options[altKey] = deepExtend(this.options[altKey] ?? [], item) as IShapeValues[];
            }
        } else {
            if (this.options[mainKey] instanceof Array) {
                this.options[mainKey] = {};

                if (!this.options[altKey] || altOverride) {
                    this.options[altKey] = {};
                }
            }

            this.options[mainKey] = deepExtend(this.options[mainKey] ?? {}, item) as IShapeValues[];

            if (!this.options[altKey] || altOverride) {
                this.options[altKey] = deepExtend(this.options[altKey] ?? {}, item) as IShapeValues[];
            }
        }
    }
}
