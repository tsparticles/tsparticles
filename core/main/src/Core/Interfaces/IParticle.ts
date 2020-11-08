import type { IStroke } from "../../Options/Interfaces/Particles/IStroke";
import type { ICoordinates, ICoordinates3d } from "./ICoordinates";
import type { IVelocity } from "./IVelocity";
import type { MoveDirection, MoveDirectionAlt, ShapeType } from "../../Enums";
import type { IParticleImage } from "./IParticleImage";
import type { IParticleValueAnimation } from "./IParticleValueAnimation";
import type { IShapeValues } from "../../Options/Interfaces/Particles/Shape/IShapeValues";
import type { IBubbleParticleData } from "./IBubbleParticleData";
import type { IParticles } from "../../Options/Interfaces/Particles/IParticles";
import type { IHsl, IRgb } from "./Colors";
import type { ILink } from "./ILink";
import { IParticleLoops } from "./IParticleLoops";

/**
 * @category Interfaces
 */
export interface IParticle {
    misplaced: boolean;
    randomIndexData?: number;

    readonly pathAngle: number;
    readonly bubble: IBubbleParticleData;
    readonly close: boolean;
    readonly destroyed: boolean;
    readonly direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt;
    readonly fill: boolean;
    readonly id: number;
    readonly image?: IParticleImage;
    readonly initialVelocity: IVelocity;
    readonly links: ILink[];
    readonly loops: IParticleLoops;
    readonly offset: ICoordinates;
    readonly color: IParticleValueAnimation<IHsl | undefined>;
    readonly opacity: IParticleValueAnimation<number>;
    readonly rotate: IParticleValueAnimation<number>;
    readonly size: IParticleValueAnimation<number>;
    readonly strokeColor: IParticleValueAnimation<IHsl | undefined>;
    readonly particlesOptions: IParticles;
    readonly position: ICoordinates3d;
    readonly shadowColor: IRgb | undefined;
    readonly shape?: ShapeType | string;
    readonly shapeData?: IShapeValues;
    readonly sides: number;
    readonly stroke: IStroke;
    readonly strokeWidth: number;
    readonly velocity: IVelocity;
    readonly attractDistance?: number;
    readonly linksDistance?: number;
    readonly linksWidth?: number;
    readonly moveSpeed?: number;
    readonly sizeValue?: number;
    readonly sizeAnimationSpeed?: number;

    getPosition(): ICoordinates;

    getRadius(): number;

    getFillColor(): IHsl | undefined;

    getStrokeColor(): IHsl | undefined;
}
