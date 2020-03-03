"use strict";

import {ShapeType} from "../../../Enums/ShapeType";
import {IOptionsShapeImage} from "./IOptionsShapeImage";
import {IOptionsShapeCharacter} from "./IOptionsShapeCharacter";
import {IOptionsShapePolygon} from "./IOptionsShapePolygon";
import {IOptionsShapeStroke} from "./IOptionsShapeStroke";

export interface IOptionsShape {
    type: ShapeType | ShapeType[];
    stroke: IOptionsShapeStroke;
    polygon: IOptionsShapePolygon;
    character: IOptionsShapeCharacter;
    image: IOptionsShapeImage | IOptionsShapeImage[];
}
