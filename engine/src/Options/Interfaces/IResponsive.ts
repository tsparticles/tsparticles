import type { IOptions } from "./IOptions";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import { ResponsiveMode } from "../../Enums/Modes/ResponsiveMode";

export interface IResponsive {
    maxWidth: number;
    options: RecursivePartial<IOptions>;
    mode: ResponsiveMode;
}
