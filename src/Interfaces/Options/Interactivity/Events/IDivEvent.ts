import {DivMode} from "../../../../Enums/Modes/DivMode";

export interface IDivEvent {
    enable: boolean;
    mode: DivMode | DivMode[];
    el: string;
}
