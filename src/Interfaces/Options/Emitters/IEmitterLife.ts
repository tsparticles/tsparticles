import type { IOptionLoader } from "../IOptionLoader";

/**
 * The particles emitter life options
 */
export interface IEmitterLife extends IOptionLoader<IEmitterLife> {
    /**
     * The count of lives the particles emitter has.
     * If <= 0 or not specified infinity will be the value.
     * If the count is > 0 it will spawn only that number of times then it'll be destroyed and removed
     */
    count?: number;

    /**
     * The duration of any emitter life.
     * If <= 0 or  not specified infinity will be the value.
     */
    duration?: number;

    /**
     * The delay between any spawn, except first.
     */
    delay?: number;
}
