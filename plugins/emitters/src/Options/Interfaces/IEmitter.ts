import type { ICoordinates } from "tsparticles-engine";
import type { MoveDirection, MoveDirectionAlt } from "tsparticles-engine";
import type { IParticles } from "tsparticles-engine/Options/Interfaces/Particles/IParticles";
import type { IEmitterRate } from "./IEmitterRate";
import type { IEmitterLife } from "./IEmitterLife";
import type { RecursivePartial } from "tsparticles-engine";
import type { IEmitterSize } from "./IEmitterSize";
import type { IAnimatableColor } from "tsparticles-engine/Options/Interfaces/IAnimatableColor";
import type { EmitterShapeType } from "../../Enums";

/**
 * Particles emitter object options
 * [[include:Options/Plugins/Emitters.md]]
 * @category Emitters Plugin
 */
export interface IEmitter {
    /**
     * Starts the emitter automatically
     */
    autoPlay: boolean;

    /**
     * The size of the particles emitter area
     */
    size?: IEmitterSize;

    /**
     * The direction of the emitted particles, [[MoveDirection]] is the enum used for values
     */
    direction?: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt | number;

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
    particles?: RecursivePartial<IParticles>;

    /**
     * The relative position (in percent) of the emitter, where particles spawns.
     * If size is specified the position will be the center of the size options
     */
    position?: RecursivePartial<ICoordinates>;

    /**
     * The particles emitting rate options
     */
    rate: IEmitterRate;

    /**
     * The emitter shape type (circle or square)
     */
    shape: EmitterShapeType | keyof typeof EmitterShapeType;

    /**
     * The particle spawn color
     */
    spawnColor?: IAnimatableColor;

    /**
     * The number of starting particles of the emitter
     */
    startCount: number;
}
