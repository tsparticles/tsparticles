import type { HoverMode } from "../../../../Enums";
import type { IParallax } from "./IParallax";
import type { SingleOrMultiple } from "../../../../Types";

/**
 * @category Options
 */
export interface IHoverEvent {
    enable: boolean;
    mode: SingleOrMultiple<HoverMode | keyof typeof HoverMode | string>;
    parallax: IParallax;
}
