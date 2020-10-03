import type { RecursivePartial } from "../../Types";

/**
 * This interface is used by the [[Options]] class to have a [[load]] method to set all needed properties from source
 * @typeParam T the options interface to load
 * @category Options
 */
export interface IOptionLoader<T> {
    /**
     * This load method is used to load [[data]] in the classes used as generic
     * @param data the input options
     */
    load(data?: RecursivePartial<T>): void;
}
