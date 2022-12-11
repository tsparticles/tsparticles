import type { IClickEvent } from "./IClickEvent";
import type { IDivEvent } from "./IDivEvent";
import type { IHoverEvent } from "./IHoverEvent";
import type { IResizeEvent } from "./IResizeEvent";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

/**
 * [[include:Options/Interactivity/Events.md]]
 * @category Options
 */
export interface IEvents {
    onClick: IClickEvent;
    onDiv: SingleOrMultiple<IDivEvent>;
    onHover: IHoverEvent;

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

    resize: boolean | IResizeEvent;
}
