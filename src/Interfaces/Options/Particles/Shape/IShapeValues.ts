import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import type { IColor } from "../IColor";
import type { IOpacity } from "../Opacity/IOpacity";
import type { IRotate } from "../Rotate/IRotate";
import type { ISize } from "../Size/ISize";
import type { IShadow } from "../IShadow";
import type { IStroke } from "../IStroke";

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
