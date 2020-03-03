import {IOptionsInteractivityEventClick} from "./IOptionsInteractivityEventClick";
import {IOptionsInteractivityEventHover} from "./IOptionsInteractivityEventHover";
import {IOptionsInteractivityEventDiv} from "./IOptionsInteractivityEventDiv";

export interface IOptionsInteractivityEvents {
    onclick: IOptionsInteractivityEventClick;
    onhover: IOptionsInteractivityEventHover;
    ondiv: IOptionsInteractivityEventDiv;
    resize: boolean;
}
