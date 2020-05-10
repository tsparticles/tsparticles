import type { ShapeType } from "../../../../Enums/ShapeType";
import type { IImageShape } from "./IImageShape";
import type { ICharacterShape } from "./ICharacterShape";
import type { IPolygonShape } from "./IPolygonShape";
import type { IStroke } from "../IStroke";
import type { IOptionLoader } from "../../IOptionLoader";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import { ShapeData } from "../../../../Types/ShapeData";

export interface IShape extends IOptionLoader<IShape> {
    type: SingleOrMultiple<ShapeType | string>;

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
     * @deprecated this property has been renamed to options
     */
    custom: ShapeData;

    options: ShapeData;
}


