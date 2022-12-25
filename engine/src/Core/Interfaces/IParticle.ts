/**
 * @category Interfaces
 */
import type { IHsl, IRgb } from "./Colors";
import type { IBubbleParticleData } from "./IBubbleParticleData";
import type { ICoordinates3d } from "./ICoordinates";
import type { IParticleHslAnimation } from "./IParticleHslAnimation";
import type { IParticleNumericValueAnimation } from "./IParticleValueAnimation";
import type { IParticleRetinaProps } from "./IParticleRetinaProps";
import type { IParticleRoll } from "./IParticleRoll";
import type { IParticlesOptions } from "../../Options/Interfaces/Particles/IParticlesOptions";
import type { IShapeValues } from "./IShapeValues";
import type { Interactivity } from "../../Options/Classes/Interactivity/Interactivity";
import type { Vector } from "../Utils/Vector";

export interface IParticle {
    readonly backColor?: IHsl;
    readonly bubble: IBubbleParticleData;
    readonly close: boolean;
    readonly color?: IParticleHslAnimation;
    readonly destroyed: boolean;
    readonly direction: number;
    readonly fill: boolean;
    readonly id: number;
    readonly initialVelocity: Vector;
    readonly interactivity: Interactivity;
    misplaced: boolean;
    readonly offset: Vector;
    readonly opacity?: IParticleNumericValueAnimation;
    readonly options: IParticlesOptions;
    readonly position: Vector;
    randomIndexData?: number;
    readonly retina: IParticleRetinaProps;
    readonly roll?: IParticleRoll;
    readonly rotation: number;
    readonly shadowColor?: IRgb;
    readonly shape?: string;
    readonly shapeData?: IShapeValues;
    readonly sides: number;
    readonly size: IParticleNumericValueAnimation;
    readonly strokeColor?: IParticleHslAnimation;
    readonly strokeOpacity?: number;
    readonly strokeWidth?: number;
    readonly velocity: Vector;

    getFillColor(): IHsl | undefined;

    getMass(): number;

    getPosition(): ICoordinates3d;

    getRadius(): number;

    getStrokeColor(): IHsl | undefined;

    isInsideCanvas(): boolean;

    isVisible(): boolean;
}
