import type { DivMode } from "../../../../Enums/Modes/DivMode";
import type { DivType } from "../../../../Enums/Types/DivType";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

/**
 * [[include:Options/Interactivity/Div.md]]
 */
export interface IDivEvent {
    enable: boolean;
    mode: SingleOrMultiple<DivMode | keyof typeof DivMode | string>;
    selectors: SingleOrMultiple<string>;
    type: DivType | keyof typeof DivType;
}
