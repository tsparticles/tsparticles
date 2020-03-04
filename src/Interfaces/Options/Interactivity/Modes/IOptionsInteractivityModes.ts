import {IBubble} from "./IBubble";
import {IConnect} from "./IConnect";
import {IGrab} from "./IGrab";
import {IPush} from "./IPush";
import {IRemove} from "./IRemove";
import {IRepulse} from "./IRepulse";

export interface IOptionsInteractivityModes {
    bubble: IBubble;
    connect: IConnect;
    grab: IGrab;
    push: IPush;
    remove: IRemove;
    repulse: IRepulse;
}

