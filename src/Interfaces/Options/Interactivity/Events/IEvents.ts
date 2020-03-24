import type { IClickEvent } from "./IClickEvent";
import type { IHoverEvent } from "./IHoverEvent";
import type { IDivEvent } from "./IDivEvent";
import type { IOptionLoader } from "../../IOptionLoader";

export interface IEvents extends IOptionLoader<IEvents> {
    /**
     * @deprecated use the new onClick instead
     */
    onclick: IClickEvent;

    /**
     * @deprecated use the new onHover instead
     */
    onhover: IHoverEvent;

    /**
     * @deprecated use the new onDiv instead
     */
    ondiv: IDivEvent;

    onClick: IClickEvent;
    onHover: IHoverEvent;
    onDiv: IDivEvent;
    resize: boolean;
}
