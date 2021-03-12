import type { ICoordinates } from "tsparticles-engine/Core/Interfaces/ICoordinates";
import type { MoveDirection, MoveDirectionAlt } from "tsparticles-engine/Enums";
import type { IParticles } from "tsparticles-engine/Options/Interfaces/Particles/IParticles";
import type { IEmitterRate } from "./IEmitterRate";
import type { IEmitterLife } from "./IEmitterLife";
import type { RecursivePartial } from "tsparticles-engine/Types";
import type { IEmitterSize } from "./IEmitterSize";
import type { IEmitterSpin } from "./IEmitterSpin";
import type { IAnimatableColor } from "tsparticles-engine/Options/Interfaces/IAnimatableColor";

/**
 * Particles emitter object options
 * [[include:Options/Plugins/Emitters.md]]
 * @category Emitters Plugin
 */
export interface IEmitter {
    /**
     * The direction of the emitted particles, [[MoveDirection]] is the enum used for values
     */
    direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt;

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
     * The size of the particles emitter area
     */
    size?: IEmitterSize;

    /**
     * If `true`, particles will spin around the emitter
     */
    spin: IEmitterSpin;

    /**
     * The particle spawn color
     */
    spawnColor?: IAnimatableColor;
}
