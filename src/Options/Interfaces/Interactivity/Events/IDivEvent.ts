import type { DivMode } from "../../../../Enums/Modes/DivMode";
import type { IOptionLoader } from "../../IOptionLoader";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

export interface IDivEvent extends IOptionLoader<IDivEvent> {
    enable: boolean;
    mode: SingleOrMultiple<DivMode | string>;

    /**
     * @deprecated use the new elementId instead
     */
    el: string;

    elementId: string;
}
