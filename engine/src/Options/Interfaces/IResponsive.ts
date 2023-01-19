import type { ISourceOptions } from "../../Types/ISourceOptions";
import type { ResponsiveMode } from "../../Enums/Modes/ResponsiveMode";

export interface IResponsive {
    maxWidth: number;
    mode: ResponsiveMode;
    options: ISourceOptions;
}
