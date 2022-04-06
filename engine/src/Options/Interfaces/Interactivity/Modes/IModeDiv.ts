import { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

/**
 * @category Options
 */
export interface IModeDiv {
    /**
     * @deprecated This property is deprecated, please use selectors instead
     */
    ids: SingleOrMultiple<string>;

    selectors: SingleOrMultiple<string>;
}
