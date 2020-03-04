import {DivMode} from "../../../../Enums/Modes/DivMode";

export interface IOptionsInteractivityEventDiv {
    enable: boolean;
    mode: DivMode | DivMode[];
    el: string;
}
