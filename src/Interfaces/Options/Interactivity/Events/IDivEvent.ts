import {DivMode} from "../../../../Enums/Modes/DivMode";

export interface IDivEvent {
    enable: boolean;
    mode: DivMode | DivMode[];

    /**
     * @deprecated use the new elementId instead
     */
    el: string;

    elementId: string;
}
