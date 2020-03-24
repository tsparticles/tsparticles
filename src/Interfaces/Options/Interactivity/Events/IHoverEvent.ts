import type { HoverMode } from "../../../../Enums/Modes/HoverMode";
import type { IParallax } from "./IParallax";
import type { IOptionLoader } from "../../IOptionLoader";

export interface IHoverEvent extends IOptionLoader<IHoverEvent> {
    enable: boolean;
    mode: HoverMode | HoverMode[];
    parallax: IParallax;
}
