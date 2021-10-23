import type { RecursivePartial } from "../../Types";
import { ResponsiveMode } from "../../Types/ResponsiveMode";
import type { IOptions } from "./IOptions";

export interface IResponsive {
    maxWidth: number;
    options: RecursivePartial<IOptions>;
    mode: ResponsiveMode;
}
