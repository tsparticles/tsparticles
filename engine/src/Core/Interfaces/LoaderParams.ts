import type { IOptions } from "../../Options/Interfaces/IOptions";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple";

/**
 * Loader params for options local object
 */
export interface LoaderParams {
    /**
     * The container HTML element, could be a canvas or any other element that will contain the canvas
     */
    element?: HTMLElement;

    /**
     * The index of the chosen element of the options array, if an array is given. If not specified, a random index will be used
     */
    index?: number;

    /**
     * The options object or the options array to laod
     */
    options?: SingleOrMultiple<RecursivePartial<IOptions>>;

    /**
     * Used for loading options locally or remotely
     */
    remote: boolean;

    /**
     * The id assigned to the container
     */
    tagId?: string;

    /**
     * The url or the url array used to get options
     */
    url?: SingleOrMultiple<string>;
}
