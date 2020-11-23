import type { DestroyMode } from "../../../../Enums";
import type { ISplit } from "./ISplit";

/**
 * @category Options
 * [[include:Destroy.md]]
 */
export interface IDestroy {
    mode: DestroyMode;
    split: ISplit;
}
