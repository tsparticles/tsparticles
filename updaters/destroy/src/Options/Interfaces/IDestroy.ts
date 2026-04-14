import type { DestroyMode } from "../../Enums/DestroyMode.js";
import type { IDestroyBounds } from "./IDestroyBounds.js";
import type { IExplode } from "./IExplode.js";
import type { ISplit } from "./ISplit.js";

/**
 
 * [[include:Destroy.md]]
 */
export interface IDestroy {
  bounds: IDestroyBounds;
  explode: IExplode;
  mode: DestroyMode | keyof typeof DestroyMode;
  split: ISplit;
}
