import type { IOptionLoader } from "../IOptionLoader";
import type { ICoordinates } from "../../ICoordinates";
import type { MoveDirection } from "../../../Enums/MoveDirection";
import type { IParticles } from "../Particles/IParticles";
import type { IEmitterRate } from "./IEmitterRate";
import type { IEmitterLife } from "./IEmitterLife";
import type { IDimension } from "../../IDimension";
import type { RecursivePartial } from "../../../Types/RecursivePartial";

/**
 * Particles emitter object options
 */
export interface IEmitter extends IOptionLoader<IEmitter> {
    /**
     * The size of the particles emitter area
     */
    size?: IDimension;

    /**
     * The direction of the emitted particles, [[MoveDirection]] is the enum used for values
     */
    direction: MoveDirection;

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
