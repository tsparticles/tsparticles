import type { DivMode, DivType } from "../../../../Enums";
import type { SingleOrMultiple } from "../../../../Types";

/**
 * [[include:Options/Interactivity/Div.md]]
 * @category Options
 */
export interface IDivEvent {
    /**
     * @deprecated This property is deprecated, use the new selectors property instead
     */
    el: SingleOrMultiple<string>;

    /**
     * @deprecated This property is deprecated, use the new selectors property instead
     */
    elementId: SingleOrMultiple<string>;

    /**
     * @deprecated This property is deprecated, use the new selectors property instead
     */
    ids: SingleOrMultiple<string>;

    enable: boolean;

    mode: SingleOrMultiple<DivMode | keyof typeof DivMode | string>;

    selectors: SingleOrMultiple<string>;

    type: DivType;
}
