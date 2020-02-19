"use strict";

import {ShapeType} from "../Enums/ShapeType";

export interface IShape {
    type: ShapeType | ShapeType[];
    stroke: {
        width: number;
        color: string;
    };
    polygon: {
        nb_sides: number;
    };
    character: {
        value: string | string[];
        font: string;
        style: string;
        weight: string;
        fill: boolean;
    };
    image: {
        src: string;
        width: number;
        height: number;
        replace_color: boolean;
    };
}
