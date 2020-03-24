import type { ClickMode } from "../../../../Enums/Modes/ClickMode";
import type { IOptionLoader } from "../../IOptionLoader";

export interface IClickEvent extends IOptionLoader<IClickEvent> {
    enable: boolean;
    mode: ClickMode | ClickMode[];
}
