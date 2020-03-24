import type { ShapeType } from "../../../../Enums/ShapeType";
import type { IImageShape } from "./IImageShape";
import type { ICharacterShape } from "./ICharacterShape";
import type { IPolygonShape } from "./IPolygonShape";
import type { IStroke } from "./IStroke";
import type { IOptionLoader } from "../../IOptionLoader";

export interface IShape extends IOptionLoader<IShape> {
    type: ShapeType | ShapeType[];
    stroke: IStroke | IStroke[];
    polygon: IPolygonShape | IPolygonShape[];
    character: ICharacterShape | ICharacterShape[];
    image: IImageShape | IImageShape[];
}
