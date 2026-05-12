import type { DestroyMode } from "../../Enums/DestroyMode.js";
import type { IDestroyBounds } from "./IDestroyBounds.js";
import type { IExplode } from "./IExplode.js";
import type { ISplit } from "./ISplit.js";

/**
 * The destroy updater options
 * [[include:Destroy.md]]
 */
export interface IDestroy {
  /** The destroy bounds options */
  bounds: IDestroyBounds;
  /** The destroy explode options */
  explode: IExplode;
  /** The destroy mode */
  mode: DestroyMode | keyof typeof DestroyMode;
  /** The destroy split options */
  split: ISplit;
}
