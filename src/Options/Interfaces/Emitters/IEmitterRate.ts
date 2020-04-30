import type { IOptionLoader } from "../IOptionLoader";

/**
 * The particles emitter rate options
 */
export interface IEmitterRate extends IOptionLoader<IEmitterRate> {
    /**
     * The emitting velocity, how many seconds will pass between the next particles creation
     * Decimal values allowed
     */
    delay: number;

    /**
     * The emitting quantity, how many particles will be created at every creation event
     */
    quantity: number;
}
