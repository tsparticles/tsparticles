import type { SizeMode } from "../../Enums/Modes/SizeMode";

/**
 */
export interface IDimension {
    height: number;
    width: number;
}

export interface IDimensionWithMode extends IDimension {
    mode: SizeMode;
}
