import type { RotateDirection } from "../Enums/RotateDirection";
import type { IStroke } from "./Options/Particles/IStroke";
import type { ICoordinates } from "./ICoordinates";
import type { IRgb } from "./IRgb";
import type { IVelocity } from "./IVelocity";
import type { ShapeType } from "../Enums/ShapeType";
import type { IParticleImage } from "./IParticleImage";
import type { ISize } from "./ISize";
import type { IOpacity } from "./IOpacity";
import type { IShapeValues } from "./Options/Particles/Shape/IShapeValues";
import type { IBubbleParticleData } from "./IBubbleParticleData";

export interface IParticle {
	randomIndexData?: number;

	readonly angle: number;
	readonly rotateDirection: RotateDirection;
	readonly fill: boolean;
	readonly close: boolean;
	readonly stroke: IStroke;
	readonly size: ISize;
	readonly initialPosition?: ICoordinates;
	readonly position: ICoordinates;
	readonly offset: ICoordinates;
	readonly color: IRgb | undefined;
	readonly strokeColor: IRgb | undefined;
	readonly shadowColor: IRgb | undefined;
	readonly opacity: IOpacity;
	readonly velocity: IVelocity;
	readonly shape?: ShapeType | string;
	readonly image?: IParticleImage;
	readonly initialVelocity: IVelocity;
	readonly shapeData?: IShapeValues;
	readonly bubble: IBubbleParticleData;
}
