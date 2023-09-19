import type { Container } from "../Container.js";
import type { IDelta } from "./IDelta.js";
import type { Particle } from "../Particle.js";

export type IShapeDrawData<TParticle extends Particle = Particle> = {
    /**
     * the canvas context for drawing
     */
    context: CanvasRenderingContext2D;

    /**
     * this variable contains the delta between the current frame and the previous frame
     */
    delta: IDelta;

    /**
     * the particle opacity
     */
    opacity: number;

    /**
     * the particle to be drawn using the shape
     */
    particle: TParticle;

    /**
     * the device pixel ratio, used for retina displays
     */
    pixelRatio: number;

    /**
     * the particle radius
     */
    radius: number;
};

/**
 */
export interface IShapeDrawer<TParticle extends Particle = Particle> {
    /**
     * Shape after draw effect function
     * @param data - the data used for drawing
     */
    afterEffect?: (data: IShapeDrawData<TParticle>) => void;

    /**
     * Shape destroy function
     * @param container - the container initializing the shape
     */
    destroy?: (container: Container) => void;

    /**
     * Shape draw function
     * @param data - the data used for drawing
     */
    draw: (data: IShapeDrawData<TParticle>) => void;

    /**
     * Shape sides count function
     * @param particle - the particle using the shape
     * @returns the number of sides for the used shape
     */
    getSidesCount?: (particle: TParticle) => number;

    /**
     * Shape init function
     * @param container - the container initializing the shape
     */
    init?: (container: Container) => Promise<void>;

    /**
     * Shape load function
     * @param particle - the particle using the shape
     */
    loadShape?: (particle: TParticle) => void;

    /**
     * Shape particle init function
     * @param container - the container containing the shape
     * @param particle - the particle using the shape
     */
    particleInit?: (container: Container, particle: TParticle) => void;
}
