import type { HoverMode } from "../../../../Enums";
import type { IParallax } from "./IParallax";
import type { SingleOrMultiple } from "../../../../Types";

/**
 * [[include:Options/Interactivity/Hover.md]]
 * @category Options
 */
export interface IHoverEvent {
    enable: boolean;
    mode: SingleOrMultiple<HoverMode | keyof typeof HoverMode | string>;
    parallax: IParallax;
}
