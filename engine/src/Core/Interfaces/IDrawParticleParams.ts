import type { Container } from "../Container";
import type { IDelta } from "./IDelta";
import type { IParticleColorStyle } from "./IParticleColorStyle";
import type { IParticleTransformValues } from "./IParticleTransformValues";
import type { IShadow } from "../../Options/Interfaces/Particles/IShadow";
import type { Particle } from "../Particle";

export interface IDrawParticleParams {
    /**
     * If enabled, the composite value will be used for blending the particle in the canvas
     */
    backgroundMask: boolean;
    /**
     * The color styles value
     */
    colorStyles: IParticleColorStyle;
    /**
     * The composite value to use for blending the particle in the canvas
     */
    composite: GlobalCompositeOperation;
    /**
     * The container of the particle
     */
    container: Container;
    /**
     * The canvas context to draw on
     */
    context: CanvasRenderingContext2D;
    /**
     * This variable contains the delta between the current frame and the previous frame
     */
    delta: IDelta;
    /**
     * The opacity of the particle
     */
    opacity: number;
    /**
     * The particle to draw
     */
    particle: Particle;
    /**
     * The radius of the particle
     */
    radius: number;
    /**
     * The shadow of the particle
     */
    shadow: IShadow;
    /**
     * The particle transform values
     */
    transform: IParticleTransformValues;
}
