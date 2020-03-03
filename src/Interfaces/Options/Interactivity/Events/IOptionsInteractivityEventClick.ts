import {ClickMode} from "../../../../Enums/ClickMode";

export interface IOptionsInteractivityEventClick {
    enable: boolean;
    mode: ClickMode | ClickMode[];
}
