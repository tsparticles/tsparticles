import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import type { MoveDirection, MoveDirectionAlt } from "../../../../Enums";
import type { IParticles } from "../../../../Options/Interfaces/Particles/IParticles";
import type { IEmitterRate } from "./IEmitterRate";
import type { IEmitterLife } from "./IEmitterLife";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { IEmitterSize } from "./IEmitterSize";

/**
 * Particles emitter object options
 */
export interface IEmitter {
    /**
     * The size of the particles emitter area
     */
    size?: IEmitterSize;

    /**
     * The direction of the emitted particles, [[MoveDirection]] is the enum used for values
     */
    direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt;

    /**
     * The emitter life options
     */
    life: IEmitterLife;

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
    position?: ICoordinates;

    /**
     * The particles emitting rate options
     */
    rate: IEmitterRate;
}
