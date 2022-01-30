import type { DivMode, DivType } from "../../../../Enums";
import type { SingleOrMultiple } from "../../../../Types";

/**
 * [[include:Options/Interactivity/Div.md]]
 * @category Options
 */
export interface IDivEvent {
    enable: boolean;
    mode: SingleOrMultiple<DivMode | keyof typeof DivMode | string>;
    selectors: SingleOrMultiple<string>;
    type: DivType;
}
