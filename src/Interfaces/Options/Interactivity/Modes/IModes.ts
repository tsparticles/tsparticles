import type { IBubble } from "./IBubble";
import type { IConnect } from "./IConnect";
import type { IGrab } from "./IGrab";
import type { IPush } from "./IPush";
import type { IRemove } from "./IRemove";
import type { IRepulse } from "./IRepulse";
import type { ISlow } from "./ISlow";
import type { IOptionLoader } from "../../IOptionLoader";
import type { IEmitter } from "../../Emitters/IEmitter";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import type { IAbsorber } from "../../Absorbers/IAbsorber";

export interface IModes extends IOptionLoader<IModes> {
    absorbers: SingleOrMultiple<IAbsorber>;
    bubble: IBubble;
    connect: IConnect;
    emitters: SingleOrMultiple<IEmitter>;
    grab: IGrab;
    push: IPush;
    remove: IRemove;
    repulse: IRepulse;
    slow: ISlow;
}
