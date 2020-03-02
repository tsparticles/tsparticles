import {InteractivityDetect} from "../../../Enums/InteractivityDetect";
import {IOptionsInteractivityEvents} from "./IOptionsInteractivityEvents";
import {IOptionsInteractivityModes} from "./Modes/IOptionsInteractivityModes";

export interface IOptionsInteractivity {
    detect_on: InteractivityDetect;
    events: IOptionsInteractivityEvents;
    modes: IOptionsInteractivityModes;
}
