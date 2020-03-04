import {ClickMode} from "../../../../Enums/Modes/ClickMode";

export interface IOptionsInteractivityEventClick {
    enable: boolean;
    mode: ClickMode | ClickMode[];
}
