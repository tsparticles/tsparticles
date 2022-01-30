import type { IClickEvent } from "./IClickEvent";
import type { IDivEvent } from "./IDivEvent";
import type { IHoverEvent } from "./IHoverEvent";
import type { SingleOrMultiple } from "../../../../Types";

/**
 * [[include:Options/Interactivity/Events.md]]
 * @category Options
 */
export interface IEvents {
    onClick: IClickEvent;
    onHover: IHoverEvent;
    onDiv: SingleOrMultiple<IDivEvent>;
    resize: boolean;
}
