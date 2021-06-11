import type { IStroke } from "../../Options/Interfaces/Particles/IStroke";
import type { ICoordinates } from "./ICoordinates";
import type { IParticleValueAnimation } from "./IParticleValueAnimation";
import type { IShapeValues } from "./IShapeValues";
import type { IBubbleParticleData } from "./IBubbleParticleData";
import type { IParticles } from "../../Options/Interfaces/Particles/IParticles";
import type { IHsl, IRgb } from "./Colors";
import type { IParticleLoops } from "./IParticleLoops";
import type { IParticleHslAnimation } from "./IParticleHslAnimation";
import type { Vector } from "../Particle/Vector";
import type { Vector3d } from "../Particle/Vector3d";

/**
 * @category Interfaces
 */
export interface IParticle {
    misplaced: boolean;
    randomIndexData?: number;

    readonly attractDistance?: number;
    readonly bubble: IBubbleParticleData;
    readonly close: boolean;
    readonly destroyed: boolean;
    readonly direction: number;
    readonly fill: boolean;
    readonly id: number;
    readonly initialVelocity: Vector;
    readonly loops: IParticleLoops;
    readonly offset: Vector;
    readonly color?: IParticleHslAnimation;
    readonly opacity: IParticleValueAnimation<number>;
    readonly rotate: IParticleValueAnimation<number>;
    readonly size: IParticleValueAnimation<number>;
    readonly strokeColor?: IParticleHslAnimation;
    readonly options: IParticles;
    readonly position: Vector3d;
    readonly shadowColor: IRgb | undefined;
    readonly shape?: string;
    readonly shapeData?: IShapeValues;
    readonly sides: number;
    readonly stroke: IStroke;
    readonly strokeWidth: number;
    readonly velocity: Vector;
    readonly linksDistance?: number;
    readonly linksWidth?: number;
    readonly moveSpeed?: number;
    readonly sizeAnimationSpeed?: number;
    readonly orbitRadius?: number;
    readonly orbitRotation?: number;
    readonly orbitColor?: IHsl;

    getPosition(): ICoordinates;

    getRadius(): number;

    getMass(): number;

    getFillColor(): IHsl | undefined;

    getStrokeColor(): IHsl | undefined;
}
