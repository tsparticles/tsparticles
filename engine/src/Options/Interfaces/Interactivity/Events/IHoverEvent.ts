import type { IParallax } from "./IParallax.js";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";

/**
 * [[include:Options/Interactivity/Hover.md]]
 */
export interface IHoverEvent {
    enable: boolean;
    mode: SingleOrMultiple<string>;
    parallax: IParallax;
}
