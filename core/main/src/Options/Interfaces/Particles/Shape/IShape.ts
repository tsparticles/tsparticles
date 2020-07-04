import type { ShapeType } from "../../../../Enums";
import type { IImageShape } from "./IImageShape";
import type { ICharacterShape } from "./ICharacterShape";
import type { IPolygonShape } from "./IPolygonShape";
import type { IStroke } from "../IStroke";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import type { ShapeData } from "../../../../Types/ShapeData";

export interface IShape {
    type: SingleOrMultiple<ShapeType | keyof typeof ShapeType | string>;

    /**
     * @deprecated this property was moved to particles section
     */
    stroke: SingleOrMultiple<IStroke>;

    /**
     * @deprecated this property is now integrated in custom shape management
     */
    polygon: SingleOrMultiple<IPolygonShape>;

    /**
     * @deprecated this property is now integrated in custom shape management
     */
    character: SingleOrMultiple<ICharacterShape>;

    /**
     * @deprecated this property was integrated in custom shape management
     */
    image: SingleOrMultiple<IImageShape>;

    /**
     * @deprecated this property was integrated in custom shape management
     */
    images: SingleOrMultiple<IImageShape>;

    /**
     * @deprecated this property has been renamed to options
     */
    custom: ShapeData;

    options: ShapeData;
}
