import type { IClickEvent } from "./IClickEvent";
import type { IHoverEvent } from "./IHoverEvent";
import type { IDivEvent } from "./IDivEvent";
import type { SingleOrMultiple } from "../../../../Types";

/**
 * [[include:Options/Interactivity/Events.md]]
 * @category Options
 */
export interface IEvents {
    /**
     * @deprecated use the new onClick instead
     */
    onclick: IClickEvent;

    /**
     * @deprecated use the new onDiv instead
     */
    ondiv: SingleOrMultiple<IDivEvent>;

    /**
     * @deprecated use the new onHover instead
     */
    onhover: IHoverEvent;

    onClick: IClickEvent;
    onDiv: SingleOrMultiple<IDivEvent>;
    onHover: IHoverEvent;
    resize: boolean;
}
