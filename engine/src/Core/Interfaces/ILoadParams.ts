import type { ISourceOptions } from "../../Types/ISourceOptions";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple";

/**
 * Loader params for options local object
 */
export interface ILoadParams {
    /**
     * The container HTML element, could be a canvas or any other element that will contain the canvas
     */
    element?: HTMLElement;

    /**
     * The id assigned to the container
     */
    id?: string;

    /**
     * The index of the chosen element of the options array, if an array is given. If not specified, a random index will be used
     */
    index?: number;

    /**
     * The options object or the options array to laod
     */
    options?: SingleOrMultiple<ISourceOptions>;

    /**
     * The url or the url array used to get options
     */
    url?: SingleOrMultiple<string>;
}
