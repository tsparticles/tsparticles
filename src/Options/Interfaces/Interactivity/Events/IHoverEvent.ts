import type { HoverMode } from "../../../../Enums/Modes/HoverMode";
import type { IParallax } from "./IParallax";
import type { IOptionLoader } from "../../IOptionLoader";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

export interface IHoverEvent extends IOptionLoader<IHoverEvent> {
    enable: boolean;
    mode: SingleOrMultiple<HoverMode | string>;
    parallax: IParallax;
}
