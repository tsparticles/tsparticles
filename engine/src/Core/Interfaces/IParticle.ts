import type {
    IParticleRoll,
    IParticleWobble,
    IBubbleParticleData,
    Vector,
    IParticleHslAnimation,
    IParticleGradientAnimation,
    IHsl,
    IParticleValueAnimation,
    IParticleTiltValueAnimation,
    IRgb,
    IShapeValues,
    IParticleRetinaProps,
    ICoordinates3d,
} from "..";
import type { IParticlesOptions, IStroke } from "../..";

/**
 * @category Interfaces
 */
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
    readonly gradient?: IParticleGradientAnimation;
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
    readonly orbitRotation?: number;
    readonly orbitColor?: IHsl;
    readonly retina: IParticleRetinaProps;

    getPosition(): ICoordinates3d;

    getRadius(): number;

    getMass(): number;

    getFillColor(): IHsl | undefined;

    getStrokeColor(): IHsl | undefined;

    isVisible(): boolean;

    isInsideCanvas(): boolean;
}
