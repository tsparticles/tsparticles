import {HoverMode} from "../../../../Enums/HoverMode";
import {IOptionsInteractivityEventHoverParallax} from "./IOptionsInteractivityEventHoverParallax";

export interface IOptionsInteractivityEventHover {
    enable: boolean;
    mode: HoverMode | HoverMode[];
    parallax: IOptionsInteractivityEventHoverParallax;
}
