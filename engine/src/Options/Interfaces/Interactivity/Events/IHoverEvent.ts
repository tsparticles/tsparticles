import type { HoverMode } from "../../../../Enums/Modes/HoverMode";
import type { IParallax } from "./IParallax";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

/**
 * [[include:Options/Interactivity/Hover.md]]
 * @category Options
 */
export interface IHoverEvent {
    enable: boolean;
    mode: SingleOrMultiple<HoverMode | keyof typeof HoverMode | string>;
    parallax: IParallax;
}
