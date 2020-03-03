import {DivMode} from "../../../../Enums/DivMode";

export interface IOptionsInteractivityEventDiv {
    enable: boolean;
    mode: DivMode | DivMode[];
    el: string;
}
