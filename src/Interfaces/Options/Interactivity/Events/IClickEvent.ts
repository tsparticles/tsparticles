import {ClickMode} from "../../../../Enums/Modes/ClickMode";

export interface IClickEvent {
    enable: boolean;
    mode: ClickMode | ClickMode[];
}
