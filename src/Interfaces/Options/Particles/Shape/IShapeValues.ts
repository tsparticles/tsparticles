import type {SingleOrMultiple} from "../../../../Types/SingleOrMultiple";
import type {IColor} from "../IColor";
import type {IOpacity} from "../IOpacity";
import type {IRotate} from "../IRotate";
import type {ISize} from "../ISize";
import type {IShadow} from "../IShadow";
import type {IStroke} from "../IStroke";

export interface IShapeValues {
    close?: boolean;
    fill?: boolean;
    color?: SingleOrMultiple<IColor>;
    opacity?: IOpacity;
    rotate?: IRotate;
    size?: ISize;
    shadow?: IShadow;
    stroke?: SingleOrMultiple<IStroke>;
}
