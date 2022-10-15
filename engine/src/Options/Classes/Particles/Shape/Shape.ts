import type { ICharacterShape } from "../../../Interfaces/Particles/Shape/ICharacterShape";
import type { IImageShape } from "../../../Interfaces/Particles/Shape/IImageShape";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IPolygonShape } from "../../../Interfaces/Particles/Shape/IPolygonShape";
import type { IShape } from "../../../Interfaces/Particles/Shape/IShape";
import type { IShapeValues } from "../../../../Core/Interfaces/IShapeValues";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { ShapeData } from "../../../../Types/ShapeData";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import type { Stroke } from "../Stroke";
import { deepExtend } from "../../../../Utils/Utils";

const charKey = "character",
    charAltKey = "char",
    imageKey = "image",
    imageAltKey = "images",
    polygonKey = "polygon",
    polygonAltKey = "star";

/**
 * [[include:Options/Particles/Shape.md]]
 * @category Options
 */
export class Shape implements IShape, IOptionLoader<IShape> {
    options: ShapeData;
    type: SingleOrMultiple<string>;

    constructor() {
        this.options = {};
        this.type = "circle";
    }

    /**
     * @deprecated this property was integrated in custom shape management
     */
    get character(): SingleOrMultiple<ICharacterShape> {
        return (this.options[charKey] ?? this.options[charAltKey]) as SingleOrMultiple<ICharacterShape>;
    }

    /**
     * @deprecated this property was integrated in custom shape management
     */
    set character(value: SingleOrMultiple<ICharacterShape>) {
        this.options[charAltKey] = this.options[charKey] = value;
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
     * @deprecated this property was integrated in custom shape management
     */
    get image(): SingleOrMultiple<IImageShape> {
        return (this.options[imageKey] ?? this.options[imageAltKey]) as SingleOrMultiple<IImageShape>;
    }

    /**
     * @deprecated this property was integrated in custom shape management
     * @param value
     */
    set image(value: SingleOrMultiple<IImageShape>) {
        this.options[imageAltKey] = this.options[imageKey] = value;
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
     * @deprecated this property was integrated in custom shape management
     */
    get polygon(): SingleOrMultiple<IPolygonShape> {
        return (this.options[polygonKey] ?? this.options[polygonAltKey]) as SingleOrMultiple<IPolygonShape>;
    }

    /**
     * @deprecated this property was integrated in custom shape management
     */
    set polygon(value: SingleOrMultiple<IPolygonShape>) {
        this.options[polygonAltKey] = this.options[polygonKey] = value;
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

        this.loadShape(data.character, charKey, charAltKey, true);
        this.loadShape(data.polygon, polygonKey, polygonAltKey, false);
        this.loadShape(data.image ?? data.images, imageKey, imageAltKey, true);

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
        if (!item) {
            return;
        }

        const isArray = item instanceof Array;
        const emptyValue = isArray ? [] : {},
            mainDifferentValues = isArray !== this.options[mainKey] instanceof Array,
            altDifferentValues = isArray !== this.options[altKey] instanceof Array;

        if (mainDifferentValues) {
            this.options[mainKey] = emptyValue;
        }

        if (altDifferentValues && altOverride) {
            this.options[altKey] = emptyValue;
        }

        this.options[mainKey] = deepExtend(this.options[mainKey] ?? emptyValue, item) as IShapeValues[];

        if (!this.options[altKey] || altOverride) {
            this.options[altKey] = deepExtend(this.options[altKey] ?? emptyValue, item) as IShapeValues[];
        }
    }
}
