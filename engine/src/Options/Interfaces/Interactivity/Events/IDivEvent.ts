import type { DivType } from "../../../../Enums/Types/DivType.js";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";

/**
 * [[include:Options/Interactivity/Div.md]]
 */
export interface IDivEvent {
    enable: boolean;
    mode: SingleOrMultiple<string>;
    selectors: SingleOrMultiple<string>;
    type: DivType | keyof typeof DivType;
}
