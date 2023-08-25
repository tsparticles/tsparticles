import type { IOptions } from "./IOptions.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import type { ResponsiveMode } from "../../Enums/Modes/ResponsiveMode.js";

export interface IResponsive {
    maxWidth: number;
    mode: ResponsiveMode | keyof typeof ResponsiveMode;
    options: RecursivePartial<IOptions>;
}
