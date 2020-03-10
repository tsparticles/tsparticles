import {InteractivityDetect} from "../../../Enums/InteractivityDetect";
import {IEvents} from "./Events/IEvents";
import {IModes} from "./Modes/IModes";

export interface IInteractivity {
    /**
     * @deprecated use the new detectsOn instead
     */
    detect_on: InteractivityDetect;

    detectsOn: InteractivityDetect
    events: IEvents;
    modes: IModes;
}
