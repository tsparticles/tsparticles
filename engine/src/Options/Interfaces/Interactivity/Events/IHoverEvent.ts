import type { HoverMode } from "../../../../Enums/Modes/HoverMode.js";
import type { IParallax } from "./IParallax.js";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";

/**
 * [[include:Options/Interactivity/Hover.md]]
 */
export interface IHoverEvent {
    enable: boolean;
    mode: SingleOrMultiple<HoverMode | keyof typeof HoverMode | string>;
    parallax: IParallax;
}
