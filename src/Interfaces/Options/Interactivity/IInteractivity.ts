import {InteractivityDetect} from "../../../Enums/InteractivityDetect";
import {IEvents} from "./Events/IEvents";
import {IOptionsInteractivityModes} from "./Modes/IOptionsInteractivityModes";

export interface IInteractivity {
    detect_on: InteractivityDetect;
    events: IEvents;
    modes: IOptionsInteractivityModes;
}
