import type { DestroyMode } from "../../Enums/DestroyMode.js";
import type { IDestroyBounds } from "./IDestroyBounds.js";
import type { ISplit } from "./ISplit.js";

/**
 
 * [[include:Destroy.md]]
 */
export interface IDestroy {
    bounds: IDestroyBounds;
    mode: DestroyMode | keyof typeof DestroyMode;
    split: ISplit;
}
