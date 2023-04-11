import type { DestroyMode } from "../../Enums/DestroyMode";
import type { IDestroyBounds } from "./IDestroyBounds";
import type { ISplit } from "./ISplit";

/**
 
 * [[include:Destroy.md]]
 */
export interface IDestroy {
    bounds: IDestroyBounds;
    mode: DestroyMode | keyof typeof DestroyMode;
    split: ISplit;
}
