import {HoverMode} from "../../../../Enums/Modes/HoverMode";
import {IParallax} from "./IParallax";

export interface IHoverEvent {
    enable: boolean;
    mode: HoverMode | HoverMode[];
    parallax: IParallax;
}
