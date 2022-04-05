import type { IDimension } from "../../../../Core/Interfaces/IDimension";
import type { SizeMode } from "../../../../Enums/Modes/SizeMode";

/**
 * @category Emitters Plugin
 */
export interface IEmitterSize extends IDimension {
    mode: SizeMode | keyof typeof SizeMode;
}
