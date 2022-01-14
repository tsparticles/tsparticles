import type { IAttract } from "./IAttract";
import type { IBounce } from "./IBounce";
import type { IBubble } from "./IBubble";
import type { IConnect } from "./IConnect";
import type { IGrab } from "./IGrab";
import type { ILight } from "./ILight";
import type { IPush } from "./IPush";
import type { IRemove } from "./IRemove";
import type { IRepulse } from "./IRepulse";
import type { ISlow } from "./ISlow";
import type { ITrail } from "./ITrail";

/**
 * [[include:Options/Interactivity/Modes.md]]
 * @category Options
 */
export interface IModes {
    attract: IAttract;
    bounce: IBounce;
    bubble: IBubble;
    connect: IConnect;
    grab: IGrab;
    light: ILight;
    push: IPush;
    remove: IRemove;
    repulse: IRepulse;
    slow: ISlow;
    trail: ITrail;
}
