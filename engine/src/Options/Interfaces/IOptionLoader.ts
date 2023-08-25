import type { RecursivePartial } from "../../Types/RecursivePartial.js";

/**
 * This interface is used by the options classes to have a {@link IOptionLoader.load} method to set all needed properties from source
 */
export interface IOptionLoader<T> {
    /**
     * This load method is used to load data in the classes used as generic
     * @param data - the input options
     */
    load(data?: RecursivePartial<T>): void;
}
