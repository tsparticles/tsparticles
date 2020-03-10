"use strict";

import {ShapeType} from "../../../Enums/ShapeType";
import {IImageShape} from "./IImageShape";
import {ICharacterShape} from "./ICharacterShape";
import {IPolygonShape} from "./IPolygonShape";
import {IStroke} from "./IStroke";

export interface IShape {
    type: ShapeType | ShapeType[];
    stroke: IStroke;
    polygon: IPolygonShape;
    character: ICharacterShape;
    image: IImageShape | IImageShape[];
}
