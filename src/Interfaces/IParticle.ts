import type { RotateDirection } from "../Enums/RotateDirection";
import type { IStroke } from "./Options/Particles/IStroke";
import type { IPolygonShape } from "./Options/Particles/Shape/IPolygonShape";
import type { ICoordinates } from "./ICoordinates";
import type { IRgb } from "./IRgb";
import type { IVelocity } from "./IVelocity";
import type { ShapeType } from "../Enums/ShapeType";
import type { IParticleImage } from "./IParticleImage";
import type { ICharacterShape } from "./Options/Particles/Shape/ICharacterShape";
import type { ISize } from "./ISize";
import type { IOpacity } from "./IOpacity";
import type { IShapeValues } from "./Options/Particles/Shape/IShapeValues";

export interface IParticle {
    readonly angle: number;
    readonly rotateDirection: RotateDirection;
    readonly radius: number;
    readonly stroke: IStroke;
    readonly polygon?: IPolygonShape;
    readonly text?: string;
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
    readonly character?: ICharacterShape;
    readonly initialVelocity: IVelocity;
    readonly customShape?: IShapeValues;
}
