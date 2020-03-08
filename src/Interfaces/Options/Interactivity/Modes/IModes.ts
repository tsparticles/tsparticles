import {IBubble} from "./IBubble";
import {IConnect} from "./IConnect";
import {IGrab} from "./IGrab";
import {IPush} from "./IPush";
import {IRemove} from "./IRemove";
import {IRepulse} from "./IRepulse";
import {ISlow} from "./ISlow";

export interface IModes {
    bubble: IBubble;
    connect: IConnect;
    grab: IGrab;
    push: IPush;
    remove: IRemove;
    repulse: IRepulse;
    slow: ISlow;
}

