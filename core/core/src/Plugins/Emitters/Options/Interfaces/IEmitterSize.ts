import type { SizeMode } from "../../../../Enums";
import type { IDimension } from "../../../../Core/Interfaces/IDimension";

/**
 * @category Emitters Plugin
 */
export interface IEmitterSize extends IDimension {
    mode: SizeMode | keyof typeof SizeMode;
}
