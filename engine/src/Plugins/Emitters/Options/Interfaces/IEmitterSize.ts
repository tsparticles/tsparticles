import type { IDimension } from "../../../../Core/Interfaces/IDimension";
import type { SizeMode } from "../../../../Enums";

/**
 * @category Emitters Plugin
 */
export interface IEmitterSize extends IDimension {
    mode: SizeMode | keyof typeof SizeMode;
}
