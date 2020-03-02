import {IOptionsInteractivityModeBubble} from "./IOptionsInteractivityModeBubble";
import {IOptionsInteractivityModeConnect} from "./IOptionsInteractivityModeConnect";
import {IOptionsInteractivityModeGrab} from "./IOptionsInteractivityModeGrab";
import {IOptionsInteractivityModePush} from "./IOptionsInteractivityModePush";
import {IOptionsInteractivityModeRemove} from "./IOptionsInteractivityModeRemove";
import {IOptionsInteractivityModeRepulse} from "./IOptionsInteractivityModeRepulse";

export interface IOptionsInteractivityModes {
    bubble: IOptionsInteractivityModeBubble;
    connect: IOptionsInteractivityModeConnect;
    grab: IOptionsInteractivityModeGrab;
    push: IOptionsInteractivityModePush;
    remove: IOptionsInteractivityModeRemove;
    repulse: IOptionsInteractivityModeRepulse;
}

