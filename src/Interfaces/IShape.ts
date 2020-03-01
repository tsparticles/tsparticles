"use strict";

import {ShapeType} from "../Enums/ShapeType";
import {IShapeImage} from "./IShapeImage";
import {IShapeCharacter} from "./IShapeCharacter";
import {IShapePolygon} from "./IShapePolygon";
import {IShapeStroke} from "./IShapeStroke";

export interface IShape {
    type: ShapeType | ShapeType[];
    stroke: IShapeStroke;
    polygon: IShapePolygon;
    character: IShapeCharacter;
    image: IShapeImage | Array<IShapeImage>;
}
