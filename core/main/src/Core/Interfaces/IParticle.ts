import type { IStroke } from "../../Options/Interfaces/Particles/IStroke";
import type { ICoordinates } from "./ICoordinates";
import type { ShapeType } from "../../Enums";
import type { IParticleImage } from "./IParticleImage";
import type { IParticleValueAnimation } from "./IParticleValueAnimation";
import type { IShapeValues } from "./IShapeValues";
import type { IBubbleParticleData } from "./IBubbleParticleData";
import type { IParticles } from "../../Options/Interfaces/Particles/IParticles";
import type { IHsl, IRgb } from "./Colors";
import type { ILink } from "./ILink";
import type { IParticleHslAnimation } from "./IParticleHslAnimation";
import type { Vector } from "../Particle/Vector";

/**
 * @category Interfaces
 */
export interface IParticle {
    misplaced: boolean;
    randomIndexData?: number;

    readonly wobbleAngle: number;
    readonly wobbleSpeed: number;
    readonly attractDistance?: number;
    readonly bubble: IBubbleParticleData;
    readonly close: boolean;
    readonly destroyed: boolean;
    readonly direction: number;
    readonly fill: boolean;
    readonly id: number;
    readonly image?: IParticleImage;
    readonly initialVelocity: Vector;
    readonly links: ILink[];
    readonly offset: Vector;
    readonly color?: IParticleHslAnimation;
    readonly opacity: IParticleValueAnimation<number>;
    readonly rotate: IParticleValueAnimation<number>;
    readonly size: IParticleValueAnimation<number>;
    readonly strokeColor?: IParticleHslAnimation;
    readonly options: IParticles;
    readonly position: Vector;
    readonly shadowColor: IRgb | undefined;
    readonly shape?: ShapeType | string;
    readonly shapeData?: IShapeValues;
    readonly sides: number;
    readonly stroke: IStroke;
    readonly strokeWidth: number;
    readonly velocity: Vector;
    readonly linksDistance?: number;
    readonly linksWidth?: number;
    readonly moveSpeed?: number;
    readonly sizeValue?: number;
    readonly sizeAnimationSpeed?: number;

    getPosition(): ICoordinates;

    getRadius(): number;

    getMass(): number;

    getFillColor(): IHsl | undefined;

    getStrokeColor(): IHsl | undefined;
}
