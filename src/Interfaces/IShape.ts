"use strict";

import {ShapeType} from "../Enums/ShapeType";
import {IShapeImage} from "./IShapeImage";
import {IShapeCharacter} from "./IShapeCharacter";
import {IShapePolygon} from "./IShapePolygon";

export interface IShape {
    type: ShapeType | ShapeType[];
    stroke: {
        width: number;
        color: string;
    };
    polygon: IShapePolygon;
    character: IShapeCharacter;
    image: IShapeImage | Array<IShapeImage>;
}

