import type { RecursivePartial } from "../../Types/RecursivePartial";

/**
 * This interface is used by the {@link Options} class to have a {@link IOptionLoader<T>.load} method to set all needed properties from source
 * @typeParam T the options interface to load
 * @category Options
 */
export interface IOptionLoader<T> {
    /**
     * This load method is used to load data in the classes used as generic
     * @param data the input options
     */
    load(data?: RecursivePartial<T>): void;
}
