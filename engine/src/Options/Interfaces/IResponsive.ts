import type { ResponsiveMode } from "../../Enums";
import type { RecursivePartial } from "../../Types";
import type { IOptions } from "./IOptions";

export interface IResponsive {
    maxWidth: number;
    options: RecursivePartial<IOptions>;
    mode: ResponsiveMode;
}
