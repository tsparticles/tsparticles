/**
 */
import type { IHsl, IRgb } from "./Colors.js";
import type { IBubbleParticleData } from "./IBubbleParticleData.js";
import type { ICoordinates3d } from "./ICoordinates.js";
import type { IParticleHslAnimation } from "./IParticleHslAnimation.js";
import type { IParticleNumericValueAnimation } from "./IParticleValueAnimation.js";
import type { IParticleRetinaProps } from "./IParticleRetinaProps.js";
import type { IParticleRoll } from "./IParticleRoll.js";
import type { IParticlesOptions } from "../../Options/Interfaces/Particles/IParticlesOptions.js";
import type { IShapeValues } from "./IShapeValues.js";
import type { Interactivity } from "../../Options/Classes/Interactivity/Interactivity.js";
import type { Vector } from "../Utils/Vector.js";

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
