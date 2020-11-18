import type { DestroyMode } from "../../../../Enums/Modes/DestroyMode";
import { ISplit } from "./ISplit";

export interface IDestroy {
    mode: DestroyMode;
    split: ISplit;
}
