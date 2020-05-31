import type { IStroke } from "../../Options/Interfaces/Particles/IStroke";
import type { ICoordinates } from "./ICoordinates";
import type { IRgb } from "./IRgb";
import type { IVelocity } from "./IVelocity";
import type { MoveDirection, RotateDirection, ShapeType } from "../../Enums";
import type { IParticleImage } from "./IParticleImage";
import type { IParticleSizeAnimation } from "./IParticleSizeAnimation";
import type { IParticleOpacityAnimation } from "./IParticleOpacityAnimation";
import type { IShapeValues } from "../../Options/Interfaces/Particles/Shape/IShapeValues";
import type { IBubbleParticleData } from "./IBubbleParticleData";
import type { IParticles } from "../../Options/Interfaces/Particles/IParticles";
import type { ILink } from "./ILink";
import type { IHsl } from "./IHsl";

export interface IParticle {
    randomIndexData?: number;
    destroyed: boolean;

    readonly angle: number;
    readonly bubble: IBubbleParticleData;
    readonly color: IHsl | undefined;
    readonly close: boolean;
    readonly direction: MoveDirection;
    readonly fill: boolean;
    readonly image?: IParticleImage;
    readonly infectionStage?: number;
    readonly infectionTime?: number;
    readonly infectionDelay?: number;
    readonly infectionDelayStage?: number;
    readonly initialVelocity: IVelocity;
    readonly links: ILink[];
    readonly offset: ICoordinates;
    readonly opacity: IParticleOpacityAnimation;
    readonly particlesOptions: IParticles;
    readonly position: ICoordinates;
    readonly rotateDirection: RotateDirection;
    readonly shadowColor: IRgb | undefined;
    readonly shape?: ShapeType | string;
    readonly shapeData?: IShapeValues;
    readonly size: IParticleSizeAnimation;
    readonly stroke: IStroke;
    readonly strokeColor: IRgb | undefined;
    readonly velocity: IVelocity;
    readonly linksDistance?: number;
    readonly linksWidth?: number;
    readonly moveSpeed?: number;
    readonly sizeValue?: number;
    readonly randomMinimumSize?: number;
    readonly sizeAnimationSpeed?: number;

    getPosition(): ICoordinates;

    getColor(): IHsl | undefined;
}
