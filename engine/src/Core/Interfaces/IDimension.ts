import type { SizeMode } from "../../Enums/Modes/SizeMode";

/**
 * @category Interfaces
 */
export interface IDimension {
    height: number;
    width: number;
}

export interface IDimensionWithMode extends IDimension {
    mode: SizeMode;
}
