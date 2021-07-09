/**
 * The particles emitter rate options
 * @category Emitters Plugin
 */
import type { RangeValue } from "../../../../Types";

export interface IEmitterRate {
    /**
     * The emitting velocity, how many seconds will pass between the next particles creation
     * Decimal values allowed
     */
    delay: RangeValue;

    /**
     * The emitting quantity, how many particles will be created at every creation event
     */
    quantity: RangeValue;
}
