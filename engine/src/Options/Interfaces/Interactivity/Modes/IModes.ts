import type { IAttract } from "./IAttract";
import type { IBounce } from "./IBounce";
import type { IBubble } from "./IBubble";
import type { IConnect } from "./IConnect";
import type { IGrab } from "./IGrab";
import type { IPush } from "./IPush";
import type { ISlow } from "./ISlow";

/**
 * [[include:Options/Interactivity/Modes.md]]
 * @category Options
 */
export interface IModes {
    [name: string]: unknown;

    attract: IAttract;
    bounce: IBounce;
    bubble: IBubble;
    connect: IConnect;
    grab: IGrab;
    push: IPush;
    slow: ISlow;
}
