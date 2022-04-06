/**
 * @category Interfaces
 */
import type { IHsl, IRgb } from "./Colors";
import type { IParticleTiltValueAnimation, IParticleValueAnimation } from "./IParticleValueAnimation";
import type { IBubbleParticleData } from "./IBubbleParticleData";
import type { ICoordinates3d } from "./ICoordinates";
import type { IParticleHslAnimation } from "./IParticleHslAnimation";
import type { IParticleRetinaProps } from "./IParticleRetinaProps";
import type { IParticleRoll } from "./IParticleRoll";
import type { IParticleWobble } from "./IParticleWobble";
import type { IParticlesOptions } from "../../Options/Interfaces/Particles/IParticlesOptions";
import type { IShapeValues } from "./IShapeValues";
import type { IStroke } from "../../Options/Interfaces/Particles/IStroke";
import type { Vector } from "../Utils/Vector";

export interface IParticle {
    misplaced: boolean;
    randomIndexData?: number;

    readonly roll?: IParticleRoll;
    readonly wobble?: IParticleWobble;
    readonly bubble: IBubbleParticleData;
    readonly close: boolean;
    readonly destroyed: boolean;
    readonly direction: number;
    readonly fill: boolean;
    readonly id: number;
    readonly initialVelocity: Vector;
    readonly offset: Vector;
    readonly color?: IParticleHslAnimation;
    readonly backColor?: IHsl;
    readonly opacity?: IParticleValueAnimation<number>;
    readonly rotate?: IParticleValueAnimation<number>;
    readonly size: IParticleValueAnimation<number>;
    readonly tilt?: IParticleTiltValueAnimation;
    readonly strokeColor?: IParticleHslAnimation;
    readonly options: IParticlesOptions;
    readonly position: Vector;
    readonly shadowColor: IRgb | undefined;
    readonly shape?: string;
    readonly shapeData?: IShapeValues;
    readonly sides: number;
    readonly stroke?: IStroke;
    readonly strokeWidth?: number;
    readonly velocity: Vector;
    readonly retina: IParticleRetinaProps;

    getPosition(): ICoordinates3d;

    getRadius(): number;

    getMass(): number;

    getFillColor(): IHsl | undefined;

    getStrokeColor(): IHsl | undefined;

    isVisible(): boolean;

    isInsideCanvas(): boolean;
}
