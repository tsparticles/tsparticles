import type { RecursivePartial } from "../../../Types";
import type { IOptions } from "../../../Interfaces/Options/IOptions";

export interface ITheme{
    name: string;
    default: boolean;
    options?: RecursivePartial<IOptions>;
}