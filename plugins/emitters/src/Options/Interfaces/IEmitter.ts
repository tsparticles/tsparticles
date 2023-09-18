import type {
    IAnimatableColor,
    IParticlesOptions,
    IRangedCoordinates,
    MoveDirection,
    MoveDirectionAlt,
    RecursivePartial,
    SingleOrMultiple,
} from "tsparticles-engine";
import type { EmitterShapeType } from "../../Enums/EmitterShapeType";
import type { IEmitterLife } from "./IEmitterLife";
import type { IEmitterRate } from "./IEmitterRate";
import type { IEmitterSize } from "./IEmitterSize";

/**
 * Particles emitter object options
 * [[include:Options/Plugins/Emitters.md]]
 */
export interface IEmitter {
    /**
     * Starts the emitter automatically
     */
    autoPlay: boolean;

    /**
     * The direction of the emitted particles, {@link MoveDirection} is the enum used for values
     */
    direction?: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt | number;

    /**
     * Using this id to link the emitter to an HTML element
     */
    domId?: string;

    /**
     * Sets if the particles will spawn at the emitter perimeter or inside the area
     */
    fill: boolean;

    /**
     * The emitter life options
     */
    life: IEmitterLife;

    /**
     * The emitter name
     */
    name?: string;

    /**
     * Particles emitted customization.
     * These settings will overrides other particles settings for the particles emitted by this emitter
     * Particles number options won't override anything, they will be ignored completely
     */
    particles?: SingleOrMultiple<RecursivePartial<IParticlesOptions>>;

    /**
     * The relative position (in percent) of the emitter, where particles spawns.
     * If size is specified the position will be the center of the size options
     */
    position?: RecursivePartial<IRangedCoordinates>;

    /**
     * The particles emitting rate options
     */
    rate: IEmitterRate;

    /**
     * The emitter shape type (circle or square)
     */
    shape: EmitterShapeType | keyof typeof EmitterShapeType;

    /**
     * The size of the particles emitter area
     */
    export interface IEmitterRate {
        delay: number;
        quantity: number;
        easing?: string;
    }