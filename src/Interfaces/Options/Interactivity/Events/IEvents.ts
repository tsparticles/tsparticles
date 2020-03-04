import {IClickEvent} from "./IClickEvent";
import {IHoverEvent} from "./IHoverEvent";
import {IDivEvent} from "./IDivEvent";

export interface IEvents {
    onclick: IClickEvent;
    onhover: IHoverEvent;
    ondiv: IDivEvent;
    resize: boolean;
}
